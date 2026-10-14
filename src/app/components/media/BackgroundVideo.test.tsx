import React, { act } from "react";
import { createRoot, Root } from "react-dom/client";
import BackgroundVideo from "./BackgroundVideo";
import ProductImage from "./ProductImage";
import { MEDIA } from "../../../lib/media";

let container: HTMLDivElement;
let root: Root;
let reducedMotion = false;
let mobile = false;
let intersection: IntersectionObserverCallback;
const play = jest.fn().mockResolvedValue(undefined);
const pause = jest.fn();
const originalMatchMedia = window.matchMedia;
const originalObserver = window.IntersectionObserver;

beforeEach(() => {
  reducedMotion = false;
  mobile = false;
  play.mockReset().mockResolvedValue(undefined);
  pause.mockClear();
  window.matchMedia = jest.fn().mockImplementation((query: string) => ({
    matches: query.includes("reduced-motion") ? reducedMotion : mobile,
    addEventListener: jest.fn(), removeEventListener: jest.fn(),
  }));
  window.IntersectionObserver = jest.fn().mockImplementation((callback) => {
    intersection = callback;
    return { observe: jest.fn(), disconnect: jest.fn() };
  });
  jest.spyOn(HTMLMediaElement.prototype, "play").mockImplementation(play);
  jest.spyOn(HTMLMediaElement.prototype, "pause").mockImplementation(pause);
  container = document.createElement("div");
  document.body.appendChild(container);
  root = createRoot(container);
});

afterEach(() => {
  act(() => root.unmount());
  container.remove();
  jest.restoreAllMocks();
  window.matchMedia = originalMatchMedia;
  window.IntersectionObserver = originalObserver;
});

const renderFilm = (lazy = false) => {
  act(() => root.render(<BackgroundVideo src={MEDIA.hero.video} mobileSrc={MEDIA.hero.mobileVideo} poster={MEDIA.hero.poster} label="test film" lazy={lazy} />));
  return container.querySelector("video")!;
};

test("reduced motion shows the local poster without requesting a video; manual play remains available", () => {
  reducedMotion = true;
  const video = renderFilm();
  expect(video.hasAttribute("src")).toBe(false);
  expect(play).not.toHaveBeenCalled();
  expect(container.querySelector("img")!.getAttribute("src")).toBe(MEDIA.hero.poster.src);
  act(() => container.querySelector("button")!.click());
  expect(video.getAttribute("src")).toBe(MEDIA.hero.video);
  expect(play).toHaveBeenCalled();
});

test("below-fold film waits until visible, selects the mobile file, and pauses offscreen", () => {
  mobile = true;
  const video = renderFilm(true);
  expect(video.hasAttribute("src")).toBe(false);
  act(() => intersection([{ isIntersecting: true } as IntersectionObserverEntry], {} as IntersectionObserver));
  expect(video.getAttribute("src")).toBe(MEDIA.hero.mobileVideo);
  expect(play).toHaveBeenCalled();
  pause.mockClear();
  act(() => intersection([{ isIntersecting: false } as IntersectionObserverEntry], {} as IntersectionObserver));
  expect(pause).toHaveBeenCalled();
});

test("blocked autoplay keeps the poster and permits an explicit play retry", async () => {
  play.mockRejectedValueOnce(new Error("Autoplay blocked"));
  await act(async () => root.render(<BackgroundVideo src={MEDIA.hero.video} mobileSrc={MEDIA.hero.mobileVideo} poster={MEDIA.hero.poster} label="test film" />));
  const video = container.querySelector("video")!;
  expect(video.style.opacity).toBe("0");
  expect(container.querySelector("button")!.textContent).toBe("Play film");
  const attempts = play.mock.calls.length;
  act(() => container.querySelector("button")!.click());
  expect(play.mock.calls.length).toBeGreaterThan(attempts);
});

test("broken merchant images use the local unavailable icon without rewriting the supplied URL", () => {
  act(() => root.render(<ProductImage src="/uploads/products/missing.jpeg" alt="Merchant product" />));
  const image = container.querySelector("img")!;
  expect(image.getAttribute("src")).toBe("/uploads/products/missing.jpeg");
  act(() => image.dispatchEvent(new Event("error")));
  expect(image.getAttribute("src")).toBe(MEDIA.icons.productUnavailable);
  act(() => image.dispatchEvent(new Event("error")));
  expect(image.getAttribute("src")).toBe(MEDIA.icons.productUnavailable);
});

test("video reuses the responsive poster selected by the browser", () => {
  const video = renderFilm();
  const poster = container.querySelector("img")!;
  const selected = "http://localhost/media/videos/posters/hero-fashion-768.webp";
  Object.defineProperty(poster, "currentSrc", { value: selected });
  act(() => poster.dispatchEvent(new Event("load")));
  expect(video.getAttribute("poster")).toBe(selected);
});
