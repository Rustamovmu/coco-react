"""Validate bundled media, provenance, file hashes, runtime paths and build copies.

Run after yarn build: python3 scripts/verify-media.py
Optionally add --ffmpeg /path/to/ffmpeg to decode every video in full.
"""
import argparse
import hashlib
import json
import re
import struct
import subprocess
from pathlib import Path

from PIL import Image

root = Path(__file__).resolve().parents[1]
parser = argparse.ArgumentParser()
parser.add_argument("--ffmpeg")
args = parser.parse_args()
manifest = json.loads((root / "docs/media/source-manifest.json").read_text())
checked = []
errors = []
for asset in manifest["assets"]:
    assert asset["licenseReference"] and asset["downloadDate"]
    for record in asset["files"]:
        relative = record["localPath"].lstrip("/")
        path = root / "public" / relative
        build = root / "build" / relative
        if not path.is_file():
            errors.append(f"Missing {path}")
            continue
        data = path.read_bytes()
        digest = hashlib.sha256(data).hexdigest()
        if digest != record["sha256"] or len(data) != record["optimizedBytes"]:
            errors.append(f"Manifest mismatch: {relative}")
        if not build.is_file() or build.read_bytes() != data:
            errors.append(f"Missing/stale production copy: {relative}")
        if path.suffix == ".webp":
            with Image.open(path) as image:
                image.load()
                if image.size != (record["width"], record["height"]):
                    errors.append(f"Wrong dimensions: {relative}")
        elif path.suffix == ".mp4":
            boxes = []
            offset = 0
            while offset + 8 <= len(data):
                size, kind = struct.unpack(">I4s", data[offset:offset + 8])
                if size == 1:
                    size = struct.unpack(">Q", data[offset + 8:offset + 16])[0]
                if size < 8:
                    break
                boxes.append(kind.decode("ascii"))
                offset += size
            if "moov" not in boxes or "mdat" not in boxes or boxes.index("moov") > boxes.index("mdat"):
                errors.append(f"MP4 not faststart: {relative}")
            if args.ffmpeg:
                subprocess.run([args.ffmpeg, "-v", "error", "-i", str(path), "-f", "null", "-"], check=True)
        checked.append(relative)

for name in ["default-user.svg", "product-unavailable.svg"]:
    import xml.etree.ElementTree as ET
    relative = "media/icons/" + name
    path = root / "public" / relative
    ET.parse(path)
    if not (root / "build" / relative).is_file():
        errors.append(f"Missing built icon: {relative}")
    checked.append(relative)

providers = re.compile(r"https?://[^\s\"'`)]*(?:pexels|unsplash|website-files|primadons|shopifycdn)", re.I)
for directory in [root / "src", root / "build/static"]:
    for path in directory.rglob("*"):
        if path.is_file() and path.suffix in [".ts", ".tsx", ".js", ".jsx", ".css", ".json"]:
            if providers.search(path.read_text()):
                errors.append(f"External stock-media dependency: {path.relative_to(root)}")

ignored = subprocess.run(["git", "check-ignore", *[str(root / "public" / p) for p in checked]], cwd=root, capture_output=True, text=True)
if ignored.returncode == 0:
    errors.append("Bundled assets are gitignored: " + ignored.stdout)
if errors:
    raise SystemExit("\n".join(errors))
print(json.dumps({"validBundledFiles": len(checked), "bytes": sum((root / 'public' / p).stat().st_size for p in checked), "productionCopiesMatch": True, "externalStockMediaReferences": 0, "gitignoredBundledAssets": 0}, indent=2))
