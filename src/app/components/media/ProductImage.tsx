import React, { ImgHTMLAttributes } from "react";
import { MEDIA } from "../../../lib/media";

// Keep merchant URLs intact; a failed/missing photo must never become unrelated stock photography.
export default function ProductImage({ src, alt = "", loading = "lazy", decoding = "async", onError, ...props }: ImgHTMLAttributes<HTMLImageElement>) {
  return <img alt={alt} {...props} src={src || MEDIA.icons.productUnavailable} loading={loading} decoding={decoding} onError={(event) => {
    const image = event.currentTarget;
    if (image.getAttribute("src") !== MEDIA.icons.productUnavailable) {
      image.removeAttribute("srcset");
      image.src = MEDIA.icons.productUnavailable;
    }
    onError?.(event);
  }} />;
}
