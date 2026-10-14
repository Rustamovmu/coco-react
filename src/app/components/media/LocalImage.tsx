import React, { ImgHTMLAttributes } from "react";
import { ImageAsset } from "../../../lib/media";

interface LocalImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  asset: ImageAsset;
}

export default function LocalImage({ asset, alt = "", loading = "lazy", decoding = "async", ...props }: LocalImageProps) {
  return <img alt={alt} src={asset.src} srcSet={asset.srcSet} width={asset.width} height={asset.height} loading={loading} decoding={decoding} {...props} />;
}
