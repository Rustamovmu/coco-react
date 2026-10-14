# COCO media migration report

Validation date: 15 October 2026 (Asia/Seoul). Frontend source downloads began on 14 October; the backend photograph was downloaded on 15 October.

The bundled editorial media now uses actual local files in both repositories. Seven licensed photographs and two video originals produced sixteen WebP images (including posters), four H.264 MP4 variants, and two original project SVG status icons. No stock photograph was assigned to a merchant product. The media files are included in successful production builds.

Full production sign-off is still pending real-device playback, the complete authenticated/device matrix, slow-network testing, and measured LCP/CLS. The visual checks below describe exactly what was observed; page-zoom checks are not physical-device tests.

**1. Complete media audit**

The actual source differs from the historical food-ordering AGENTS.md: this is a fashion storefront. Every source file under both `src/` trees and the frontend public shell/manifest was searched for remote URLs, image/video elements, CSS backgrounds, media arrays, schemas, uploads and fixtures. Exact file lists and original references are in [audit.json](audit.json). Existing file formats, dimensions, byte sizes and hashes are in [existing-assets.json](existing-assets.json).

| Route / area inspected | Components / templates | Media assessment and action |
| --- | --- | --- |
| `/` hero and navigation | HomeNavbar, StoreNavigation | External 4096×2160 hero film and unrelated still poster replaced with local desktop/mobile MP4 and same-film WebP posters. Existing text, links, overlays and layout retained. |
| `/` store highlights | Statistics | Typography and bundled MUI icons; no image acquisition needed. |
| `/` featured and new arrivals | FeaturedProducts, NewArrivals, home slice/selectors | Merchant API photographs preserved; lazy ProductImage handles unavailable photos honestly. |
| `/` campaign | Advertisement / Swiper; home.css | External campaign film, preview poster, three photos and remote reduced-motion CSS fallback migrated. Loop slides intentionally reuse files rather than duplicating files. |
| `/` community | ActiveUsers | Existing member uploads preserved; missing default-avatar URL repaired with an actual local SVG. |
| `/` atelier | Events | Competitor-hosted PNG and Burst photograph replaced with two licensed, relevant Pexels photographs. Correct descriptive alt text; responsive main image and small detail image. |
| `/products`, collection filters | Products, catalog, products slice/selectors | Ten bundled demo fixtures contained thirteen unverified stock-photo references, including images that did not establish the actual product. Those references were removed. Fixtures retain their data and display a local Photography unavailable status icon when no real API image is present. Existing clothing, pants, shoes, hats and accessories categories retained. |
| `/products/:productId` | ChosenProduct, related product cards | Merchant galleries, variants and related-product photographs remain API data. Main selected image eager; gallery thumbnails and secondary/story images lazy. Gallery switching checked. |
| Cart and `/orders` | ShoppingCart, OrderList, PausedOrders, ProcessOrders, FinishedOrders | Existing product images preserved; missing-photo fallback now exists locally. No checkout, payment, stock or status logic changed. |
| `/member-page`, authentication | UserPage, Settings, AuthenticationModal | User uploads, object-URL previews and payment form retained. Auth modal contains no separate external media. |
| `/help`, footer, remaining headers | HelpPage, Footer, OtherNavbar, divider | Shared remote boutique banner replaced with a licensed local landscape crop. Footer uses text and bundled icons; social links remain external navigation links. |
| App shell / PWA | index.tsx, App.tsx, public/index.html, manifest.json | Existing favicon and installation icons retained and decoded. The user's pre-existing App.tsx edit was left unchanged. |
| Admin home | views/home.ejs, public/css/home.css | Existing 2,252,593-byte PNG had no documented provenance. Display replaced by a licensed 800×800 local WebP; width/height hints plus height:auto preserve the square frame. Former PNG retained on disk for review. |
| Admin products, orders, users and auth | All EJS views, browser JS/CSS, controllers and upload handlers | Product/member uploads and order snapshots preserved. Auth backgrounds are code-rendered effects. Existing framework JS and font imports are outside this image/video migration. |
| Backend / database | Product, Member and Order schemas/types/services; routers; uploader; configuration | Read-only audit found 8 products, 30 unique referenced upload paths, no remote media paths and no missing files. No category, collection, banner or video media schema exists. No seed files were present. No media migration or record rewrite was needed. |

Before migration the frontend public folder held only five favicon/PWA files, not the media described by the historical guide. The backend held two static images/icons and 52 upload files. All 59 existing media files were inspected; image files decoded successfully. Seven duplicate-hash groups exist among uploads. These user/merchant files were retained because deleting duplicates could invalidate persistent or historical references.

Original resolution was not verified for the unlicensed competitor/Webflow/Burst files or removed Unsplash demo photography; those files were not acquired. The original Pexels film preview poster was replaced by a decoded frame rather than downloaded. The audit explicitly records these unknowns instead of inventing dimensions.

**2–3. Actual local files and locations**

Frontend registry: `src/lib/media.ts`. Licensing/provenance: [source-manifest.json](source-manifest.json). Each downloaded asset records its official source URL, provider, licensing reference, attribution requirements, download date, intended component, input/output sizes and hashes. Photographs are bounded-size downloaded inputs, not the provider's largest masters.

All paths below are real files under `coco-react/public`; all were checked against the copies in `coco-react/build`.

| Local runtime path | Dimensions | Bytes |
| --- | --- | ---: |
| `/media/images/campaigns/soft-tailoring-640.webp` | 640×427 | 23,620 |
| `/media/images/campaigns/soft-tailoring-1200.webp` | 1200×800 | 60,524 |
| `/media/images/campaigns/neutral-edit-640.webp` | 640×427 | 17,078 |
| `/media/images/campaigns/neutral-edit-1200.webp` | 1200×800 | 36,290 |
| `/media/images/campaigns/everyday-layers-640.webp` | 640×427 | 28,186 |
| `/media/images/campaigns/everyday-layers-1200.webp` | 1200×800 | 63,640 |
| `/media/images/banners/neutral-boutique-640.webp` | 640×192 | 16,520 |
| `/media/images/banners/neutral-boutique-1600.webp` | 1600×480 | 71,182 |
| `/media/images/editorial/fashion-designer-at-work-640.webp` | 640×960 | 39,104 |
| `/media/images/editorial/fashion-designer-at-work-1200.webp` | 1200×1800 | 111,924 |
| `/media/images/thumbnails/sewing-studio-320.webp` | 320×213 | 13,398 |
| `/media/videos/hero/hero-fashion-1600.mp4` | 0×31637661 | 5,973,418 |
| `/media/videos/hero/hero-fashion-768.mp4` | 0×31637661 | 2,128,364 |
| `/media/videos/posters/hero-fashion-768.webp` | 768×405 | 25,058 |
| `/media/videos/posters/hero-fashion-1600.webp` | 1600×844 | 55,956 |
| `/media/videos/campaigns/campaign-fashion-1280.mp4` | 0×31637661 | 2,782,085 |
| `/media/videos/campaigns/campaign-fashion-768.mp4` | 0×31637661 | 1,352,740 |
| `/media/videos/posters/campaign-fashion-768.webp` | 768×406 | 28,620 |
| `/media/videos/posters/campaign-fashion-1280.webp` | 1280×676 | 48,736 |
| `/media/icons/default-user.svg` | SVG vector | 234 |
| `/media/icons/product-unavailable.svg` | SVG vector | 430 |

Backend: `src/public/media/images/banners/coco-admin-boutique.webp` (800×800, 10,674 bytes), served as `/media/images/banners/coco-admin-boutique.webp` and copied into `coco/dist/public/media/images/banners/`. Its independent source record is in `coco/docs/media/source-manifest.json`.

Downloaded JPEG/4K input files and the temporary FFmpeg installation are not production dependencies and are not shipped in public directories. The generated WebP/MP4/SVG files themselves are committed-source candidates; deployment does not regenerate or download them.

**4. Replaced references**

`HomeNavbar`, `OtherNavbar`, `Advertisement`, `Events` and the reduced-motion stylesheet contain no external stock-media references. The catalog's Unsplash helper and all thirteen fixture-image references were removed. Missing `/icons/default-user.svg` and `/img/noimage-list.svg` references now point to working project-owned SVG files under `/media/icons/`. Persisted carts are also normalized: only the ten known demo IDs with the old Unsplash host receive the unavailable-photo icon. Quantities, prices, selected variants, merchant images and local photos remain intact, and repeat reads make no further changes. Existing API origins, social URLs, member images and merchant upload URL normalization remain intact. The source and compiled runtime JS/CSS scan reports zero Pexels, Unsplash, Webflow, competitor or Burst media dependencies.

**5. Optimization results**

| Downloaded input | Input bytes | All generated responsive variants / posters, bytes |
| --- | ---: | ---: |
| coco-soft-tailoring.jpg | 125,497 | 84,144 |
| coco-neutral-edit.jpg | 93,198 | 53,368 |
| coco-everyday-layers.jpg | 137,787 | 91,826 |
| coco-boutique.jpg | 504,971 | 87,702 |
| coco-atelier.jpg | 194,808 | 151,028 |
| coco-sewing-studio.jpg | 68,138 | 13,398 |
| coco-hero-original.mp4 | 40,018,842 | 8,182,796 |
| coco-campaign-original.mp4 | 27,010,956 | 4,212,181 |
| Admin boutique JPEG | 42,441 | 10,674 |

Downloaded inputs: **68,196,638 bytes**. All responsive derived media: **12,887,117 bytes**, a **81.1% reduction**, even including both video sizes and all posters. The two authored SVGs add 664 bytes. This comparison measures the actual downloaded inputs and their derived files; it is not an LCP result or a measured initial-page transfer.

The hero desktop video is 5,973,418 bytes versus its 40,018,842-byte original; the mobile variant is 2,128,364 bytes. The campaign desktop/mobile files are 2,782,085 / 1,352,740 bytes versus a 27,010,956-byte original. Both complete films are retained: 17.12 and 20.52 seconds at 25 fps. They use H.264, yuv420p, no audio and MP4 faststart. Every MP4 was fully decoded after encoding. No WebM duplicate was added because H.264 satisfies the baseline here.

WebP quality 82 and Lanczos resizing preserve photographic quality. The inner-page banner is cropped to its displayed landscape role rather than shipping a tall 1600×2400 image. Noncritical editorial images are lazy, critical header/poster images eager, and explicit dimensions or existing aspect-ratio containers reserve space. Responsive image candidates use srcSet/sizes. The video reuses the image candidate already selected by the browser, avoiding a second poster-variant download.

BackgroundVideo waits until a below-fold film enters view, pauses offscreen and in hidden documents, honors reduced motion and data-saving preferences before assigning video URLs, and exposes an explicit play/pause control. Its local poster remains visible when playback is blocked. Swiper autoplay also respects reduced motion. No additional runtime dependency or video library was introduced.

**6. Licensing and source records**

The downloaded editorial images and films are from official Pexels file hosts. The [Pexels License](https://www.pexels.com/license/) and its [commercial-use explanation](https://help.pexels.com/hc/en-us/articles/360042295214-Can-I-use-the-photos-and-videos-for-a-commercial-project) permit website commercial use and modification without mandatory attribution, subject to restrictions including no implied endorsement and no resale/redistribution as a stock service. Media is used as editorial illustration, not as proof that pictured people wear or endorse actual COCO products.

Verified named source pages include Maria Orlova's boutique photograph, Ron Lach's fabric-work and minimalist-rack photographs, and Gustavo Fring's sewing studio photograph. For the three existing campaign photos and both existing films, short-ID detail pages returned inaccessible/403 responses; their official CDN originals were available and the provider-wide license was verified. Their creator names remain explicitly unverified in the manifest. No competitor-hosted image was downloaded or relicensed. Existing merchant/member uploads and legacy project icon ownership are inherited, not independently certified by this migration.

**7. Backend and database changes**

Changed backend files: `src/views/home.ejs`, `src/public/css/home.css`, `src/public/media/images/banners/coco-admin-boutique.webp`, `docs/media/source-manifest.json`, `scripts/copy-static.cjs`, and the `build` script in `package.json`. TypeScript previously emitted server JS without its public directory or EJS views. The build now copies both directories into `dist`, where the compiled Express app expects them.

No API endpoint, schema, authentication behavior, upload middleware, product record, member record or order record was migrated or rewritten. Existing `uploads/products` and `uploads/members` remain persistent backend storage and remain gitignored. All 30 referenced media files returned byte-identical successful HTTP responses. Preserve this upload directory as durable deployment storage; do not expect the frontend bundle to contain merchant uploads.

**8. Validation results**

| Check | Result |
| --- | --- |
| Full frontend Jest suite | 11 tests passed, 4 suites; homepage smoke test updated for the current router and Swiper ESM dependency; no live API in tests. |
| Behavior tests | Reduced motion prevents video assignment; manual opt-in; mobile source selection; below-fold delay; offscreen pause; blocked autoplay retry; missing merchant photo fallback; responsive poster reuse; idempotent legacy demo-cart media migration without changing merchant media or cart selections. |
| Frontend production build | Passed; only three pre-existing MaterialTheme lint warnings remain. |
| Backend production build | Passed; public media and EJS views present in dist; admin EJS renders the local path. |
| Binary integrity / production copies | 21 frontend files plus the backend WebP decode/parse and match built copies; manifest hashes, dimensions, faststart and local paths checked. |
| HTTP file serving | 42 frontend media checks across development port 3000 and built-preview port 4173 passed with exact file equality and correct MIME types. |
| MP4 range requests | Four production files returned 206 responses with correct byte ranges. |
| Direct route / refresh shell | Six routes on both dev and production preview returned the SPA shell: 12 successful checks. |
| Existing uploads / admin HTTP | All 30 referenced uploads and the admin page/photo passed. |
| Repository checks | No newly bundled media is gitignored; no whitespace errors; largest new file is 5.97 MB, below ordinary large-file limits. No Git LFS required. |
| Chrome desktop | Development homepage local film visibly playing; pause button changed to Play. |
| Safari desktop | Production poster fallback and refresh; development homepage sections, merchant catalogue, gallery switching, campaign poster/carousel imagery, atelier, help, signed-out orders/profile, footer, and admin photograph inspected. Admin square frame corrected and rechecked. |
| Narrower CSS layouts | Safari temporary 200% and 300% page zoom exercised tablet/mobile CSS breakpoints on home and catalogue; local poster crops and two-column product photographs inspected. Zoom restored to 100%. Not a physical device or exact viewport-size measurement. |

**9. Remaining issues and limits**

- Real photography is unavailable for the ten bundled demo fixtures. They intentionally display the explicit unavailable-photo icon instead of false product imagery. Live merchant photos remain available from the backend.
- A complete authenticated orders/profile/admin workflow and all-page device matrix was not performed. No test orders, payments, accounts or user uploads were created.
- Physical iOS/Android playback, slow-network behavior, exact viewport emulation, measured LCP/CLS, browser memory/network profiles and dark/light variants were not verified. The current app exposes one styled storefront theme.
- Computer-control initially failed with noWindowsAvailable and screen-capture errors. Safari later allowed screenshots and keyboard navigation, but window resizing and wheel scrolling still failed; temporary page zoom provided the explicitly limited CSS checks above. A direct browser automation surface was unavailable.
- Production-preview origin 4173 is not in the existing backend CORS allowlist. Its editorial media renders locally, but API sections show unavailable states there. Integrated API checks used the permitted development origin 3000. Configure the actual deployment origin through the existing FRONTEND_ORIGINS setting; no CORS relaxation was made here.
- The original unused admin PNG and existing upload duplicates remain on disk for review. Their ownership was not re-certified, and no still-referenced asset was deleted. The old PNG is no longer displayed.
- The historical AGENTS.md asset list is stale, and three unrelated MaterialTheme lint warnings remain. They were not rewritten as part of this media task.

**10. Production readiness and repeatable verification**

All new local media exists, resolves, is included in both production builds and needs no runtime stock-provider access or temporary source files. Filenames use lowercase, case-safe paths. There are no required large-file/LFS changes. No deployment or commit was performed. Full release approval remains conditional on the pending device, authenticated-flow and performance checks above.

From coco-react:

```bash
CI=true yarn test --watchAll=false --runInBand
yarn build
python3 scripts/verify-media.py
```

Pillow is needed for image verification; optionally pass `--ffmpeg /path/to/ffmpeg` to decode all MP4s again. To regenerate assets, download the exact manifest sources into a separate originals directory using the recorded input filenames, then run `scripts/optimize-media.py --originals /path/to/originals --ffmpeg /path/to/ffmpeg`. Neither Pillow nor FFmpeg is a runtime/build requirement for deploying the already-generated files.

From coco, `npm run build` validates TypeScript and copies public files/views. Deploy the resulting application with its existing environment configuration and durable uploads directory. The media manifests are provenance records outside public directories, not runtime remote URLs.

Suggested commits (not created):

- coco-react: `feat: migrate bundled fashion media to optimized local assets`
- coco: `fix: bundle licensed admin media and static build assets`
