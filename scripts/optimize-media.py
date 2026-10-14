"""Rebuild approved editorial assets from downloaded originals (Pillow + FFmpeg).

Usage: python3 scripts/optimize-media.py --originals /path/to/originals --ffmpeg /path/to/ffmpeg
Source filenames and licensing are recorded in docs/media/source-manifest.json.
Originals are intentionally not shipped in the production public directory.
"""
import argparse
import hashlib
import json
import re
import subprocess
from pathlib import Path

from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parents[1]
parser = argparse.ArgumentParser()
parser.add_argument("--originals", type=Path, required=True)
parser.add_argument("--ffmpeg", required=True)
args = parser.parse_args()

photos = [
    ("soft-tailoring", "campaigns/soft-tailoring", 1884584, "https://www.pexels.com/photo/1884584/", None, "Advertisement slide 01", [640, 1200]),
    ("neutral-edit", "campaigns/neutral-edit", 994523, "https://www.pexels.com/photo/994523/", None, "Advertisement slide 02", [640, 1200]),
    ("everyday-layers", "campaigns/everyday-layers", 6069552, "https://www.pexels.com/photo/6069552/", None, "Advertisement slide 03", [640, 1200]),
    ("boutique", "banners/neutral-boutique", 4947543, "https://www.pexels.com/photo/collection-of-female-clothes-on-rack-in-boutique-4947543/", "Maria Orlova", "OtherNavbar on products, orders, profile and help", [640, 1600]),
    ("atelier", "editorial/fashion-designer-at-work", 9849937, "https://www.pexels.com/photo/fashion-designer-working-with-fabrics-9849937/", "Ron Lach", "Events atelier editorial image", [640, 1200]),
    ("sewing-studio", "thumbnails/sewing-studio", 8769327, "https://www.pexels.com/photo/woman-working-at-a-desk-in-a-sewing-studio-8769327/", "Gustavo Fring", "Events sewing detail", [320]),
]
entries = []


def digest(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()


def output(relative):
    path = ROOT / "public/media" / relative
    path.parent.mkdir(parents=True, exist_ok=True)
    return path


def metadata(original, source_url, source_page, intended_use, creator=None):
    return {
        "originalFilename": original.name,
        "originalSourceUrl": source_url,
        "sourcePage": source_page,
        "provider": "Pexels",
        "creator": creator,
        "license": "Pexels License",
        "licenseReference": "https://www.pexels.com/license/",
        "commercialUseReference": "https://help.pexels.com/hc/en-us/articles/360042295214-Can-I-use-the-photos-and-videos-for-a-commercial-project",
        "attributionRequired": False,
        "licenseVerifiedDate": "2026-10-14",
        "downloadDate": "2026-10-14",
        "intendedUse": intended_use,
        "restrictions": "Editorial illustration only; no implied model/brand endorsement, no resale as stock or unaltered prints. Not merchant product photography.",
        "sourcePageStatus": "Verified indexed free photo page" if creator else "Short-ID detail page inaccessible (403); original file downloaded from official Pexels CDN; provider-wide license verified. Creator not verified.",
        "originalBytes": original.stat().st_size,
        "originalSha256": digest(original),
        "files": [],
    }


def record_image(entry, im, relative, width):
    variant = im.copy()
    variant.thumbnail((width, 10000), Image.Resampling.LANCZOS)
    path = output(relative)
    variant.save(path, "WEBP", quality=82, method=6)
    with Image.open(path) as check:
        check.load()
        assert check.format == "WEBP"
    entry["files"].append({"localFilename": path.name, "localPath": "/media/" + relative, "width": variant.width, "height": variant.height, "format": "WebP", "optimizedBytes": path.stat().st_size, "sha256": digest(path)})


for stem, destination, photo_id, page, creator, use, widths in photos:
    original = args.originals / f"coco-{stem}.jpg"
    with Image.open(original) as raw:
        raw.load()
        im = ImageOps.exif_transpose(raw).convert("RGB")
    entry = metadata(original, f"https://images.pexels.com/photos/{photo_id}/pexels-photo-{photo_id}.jpeg?w={im.width}", page, use, creator)
    entry.update(originalWidth=im.width, originalHeight=im.height, originalFormat="JPEG")
    if stem == "boutique":
        # The short page banner does not need a tall, full-resolution photograph.
        im = ImageOps.fit(im, (1600, 480), Image.Resampling.LANCZOS, centering=(0.5, 0.6))
        entry["optimization"] = "Landscape crop centered on the clothing rack for the short page banner"
    for width in widths:
        record_image(entry, im, f"images/{destination}-{width}.webp", width)
    entries.append(entry)

for name, video_id, desktop_width, mobile_width in [("hero", 8306453, 1600, 768), ("campaign", 7667427, 1280, 768)]:
    original = args.originals / f"coco-{name}-original.mp4"
    entry = metadata(original, f"https://videos.pexels.com/video-files/{video_id}/{video_id}-uhd_4096_2160_25fps.mp4", f"https://www.pexels.com/video/{video_id}/", f"{'HomeNavbar hero' if name == 'hero' else 'Advertisement campaign film'} and matching posters")
    entry.update(originalWidth=4096, originalHeight=2160, originalFormat="H.264 MP4")
    for width in [desktop_width, mobile_width]:
        relative = f"videos/{'hero' if name == 'hero' else 'campaigns'}/{name}-fashion-{width}.mp4"
        path = output(relative)
        subprocess.run([args.ffmpeg, "-hide_banner", "-loglevel", "error", "-y", "-i", str(original), "-map", "0:v:0", "-an", "-vf", f"scale={width}:-2", "-c:v", "libx264", "-preset", "medium", "-crf", "24", "-pix_fmt", "yuv420p", "-movflags", "+faststart", str(path)], check=True)
        subprocess.run([args.ffmpeg, "-v", "error", "-i", str(path), "-f", "null", "-"], check=True)
        info = subprocess.run([args.ffmpeg, "-hide_banner", "-i", str(path)], capture_output=True, text=True).stderr
        dimensions = re.search(r"Video: h264.*? (\d+)x(\d+)", info)
        assert dimensions, "Encoded video must be H.264 with known dimensions"
        entry["files"].append({"localFilename": path.name, "localPath": "/media/" + relative, "width": int(dimensions[1]), "height": int(dimensions[2]), "durationSeconds": 17.12 if name == "hero" else 20.52, "framesPerSecond": 25, "format": "H.264 MP4, yuv420p, faststart, no audio", "optimizedBytes": path.stat().st_size, "sha256": digest(path)})
    # A frame from the same film prevents unrelated posters and loading flashes.
    frame = args.originals / f"coco-{name}-frame.png"
    subprocess.run([args.ffmpeg, "-hide_banner", "-loglevel", "error", "-y", "-ss", "1", "-i", str(original), "-frames:v", "1", "-vf", f"scale={desktop_width}:-2", str(frame)], check=True)
    with Image.open(frame) as im:
        for width in [768, desktop_width]:
            record_image(entry, im, f"videos/posters/{name}-fashion-{width}.webp", width)
    entries.append(entry)

manifest = {"version": 1, "date": "2026-10-14", "notes": "Original means the actual downloaded input, not the provider's largest still-photo master. Image downloads are bounded to displayed size. Videos use the existing 4K originals because tested HD URLs were unavailable. No downloaded photography is assigned to a merchant product.", "assets": entries}
manifest["projectAuthoredAssets"] = [
    {"localPath": "/media/icons/" + name, "provider": "COCO project", "source": "Authored SVG vector status icon; no downloaded imagery", "license": "Original project contribution", "intendedUse": use, "bytes": (ROOT / "public/media/icons" / name).stat().st_size, "sha256": digest(ROOT / "public/media/icons" / name)}
    for name, use in [("default-user.svg", "Missing member avatar"), ("product-unavailable.svg", "Clearly disclose missing product photography")]
]
destination = ROOT / "docs/media/source-manifest.json"
destination.parent.mkdir(parents=True, exist_ok=True)
destination.write_text(json.dumps(manifest, indent=2) + "\n")
print(json.dumps({"assets": len(entries), "files": sum(len(e['files']) for e in entries), "originalBytes": sum(e['originalBytes'] for e in entries), "optimizedBytes": sum(f['optimizedBytes'] for e in entries for f in e['files'])}))
