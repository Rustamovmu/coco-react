import React, { useEffect, useRef, useState } from "react";
import { ImageAsset } from "../../../lib/media";
import useMediaQuery from "../../hooks/useMediaQuery";
import LocalImage from "./LocalImage";
import "../../../css/media.css";

interface BackgroundVideoProps {
  src: string;
  mobileSrc: string;
  poster: ImageAsset;
  className?: string;
  label: string;
  lazy?: boolean;
}

export default function BackgroundVideo({ src, mobileSrc, poster, className = "", label, lazy = false }: BackgroundVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const mobile = useMediaQuery("(max-width: 600px)");
  const [inView, setInView] = useState(!lazy);
  const [visible, setVisible] = useState(!document.hidden);
  const [loaded, setLoaded] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [posterSource, setPosterSource] = useState<string>();
  const [pausedByUser, setPausedByUser] = useState(false);
  const [requestedPlay, setRequestedPlay] = useState(false);
  const saveData = Boolean((navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData);
  const motionAllowed = requestedPlay || (!reducedMotion && !saveData);
  const active = inView && visible && motionAllowed && !pausedByUser;
  const chosenSource = mobile ? mobileSrc : src;

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (!("IntersectionObserver" in window)) {
      setInView(true);
      return;
    }
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.05 });
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const update = () => setVisible(!document.hidden);
    document.addEventListener("visibilitychange", update);
    return () => document.removeEventListener("visibilitychange", update);
  }, []);

  useEffect(() => {
    if (active) setLoaded(true);
  }, [active]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    setPlaying(false);
    if (active && loaded) {
      // Autoplay denial leaves the local poster and an explicit play control.
      const play = video.play();
      if (play) play.catch(() => setPlaying(false));
    } else {
      video.pause();
    }
  }, [active, loaded, chosenSource]);

  return <>
    <LocalImage asset={poster} alt="" aria-hidden="true" className={`${className} coco-background-poster`} sizes="100vw" loading={lazy ? "lazy" : "eager"} onLoad={(event) => {
      // Reuse the browser's responsive image selection instead of fetching a second poster variant.
      setPosterSource(event.currentTarget.currentSrc || event.currentTarget.src);
    }} />
    <video
      ref={videoRef}
      className={`${className} coco-background-video`}
      style={{ opacity: playing ? 1 : 0 }}
      src={loaded && motionAllowed ? chosenSource : undefined}
      poster={posterSource}
      autoPlay={active}
      muted
      loop
      playsInline
      preload={lazy ? "none" : "metadata"}
      aria-hidden="true"
      onPlaying={() => setPlaying(true)}
      onPause={() => setPlaying(false)}
      onError={() => setPlaying(false)}
    />
    <button className="coco-background-toggle" type="button" aria-label={`${playing ? "Pause" : "Play"} ${label}`} onClick={() => {
      if (playing) setPausedByUser(true);
      else {
        setRequestedPlay(true);
        setPausedByUser(false);
        if (loaded && motionAllowed) {
          const attempt = videoRef.current?.play();
          attempt?.catch(() => setPlaying(false));
        }
      }
    }}>{playing ? "Pause film" : "Play film"}</button>
  </>;
}
