export interface ImageAsset {
  src: string;
  srcSet?: string;
  width: number;
  height: number;
}

const responsiveImage = (path: string, width: number, height: number, smallWidth = 640): ImageAsset => ({
  src: `/media/${path}-${width}.webp`,
  srcSet: `/media/${path}-${smallWidth}.webp ${smallWidth}w, /media/${path}-${width}.webp ${width}w`,
  width,
  height,
});

// Bundled editorial assets only. Merchant product and member uploads stay API data.
export const MEDIA = {
  hero: {
    video: "/media/videos/hero/hero-fashion-1600.mp4",
    mobileVideo: "/media/videos/hero/hero-fashion-768.mp4",
    poster: responsiveImage("videos/posters/hero-fashion", 1600, 844, 768),
  },
  campaign: {
    video: "/media/videos/campaigns/campaign-fashion-1280.mp4",
    mobileVideo: "/media/videos/campaigns/campaign-fashion-768.mp4",
    poster: responsiveImage("videos/posters/campaign-fashion", 1280, 676, 768),
  },
  images: {
    boutique: responsiveImage("images/banners/neutral-boutique", 1600, 480),
    softTailoring: responsiveImage("images/campaigns/soft-tailoring", 1200, 800),
    neutralEdit: responsiveImage("images/campaigns/neutral-edit", 1200, 800),
    everydayLayers: responsiveImage("images/campaigns/everyday-layers", 1200, 800),
    atelier: responsiveImage("images/editorial/fashion-designer-at-work", 1200, 1800),
    sewingStudio: { src: "/media/images/thumbnails/sewing-studio-320.webp", width: 320, height: 213 },
  },
  icons: {
    productUnavailable: "/media/icons/product-unavailable.svg",
    defaultUser: "/media/icons/default-user.svg",
  },
};
