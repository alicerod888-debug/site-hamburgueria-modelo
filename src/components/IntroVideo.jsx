import { useEffect, useRef, useState } from "react";
import store from "../config/store.js";
import useDialog from "../hooks/useDialog.js";
import useReducedMotion from "../hooks/useReducedMotion.js";
import { PlayIcon } from "./Icons.jsx";

const LEAVE_MS = 600;

/**
 * Abertura do site. O vídeo é exibido por inteiro (sem recorte e sem texto por cima);
 * o nome da loja fica ao lado/abaixo. Se o navegador bloquear o autoplay ou o arquivo
 * falhar, a imagem de capa (poster) é mostrada com um botão para tocar.
 */
export default function IntroVideo({ onEnter }) {
  const { intro, name, slogan } = store;
  const reduced = useReducedMotion();
  const videoRef = useRef(null);
  const [status, setStatus] = useState("loading"); // loading | playing | blocked | error | ended
  const [ratio, setRatio] = useState(9 / 16);
  const [leaving, setLeaving] = useState(false);

  const enter = () => {
    if (leaving) return;
    setLeaving(true);
    window.setTimeout(onEnter, reduced ? 0 : LEAVE_MS);
  };
  const panelRef = useDialog(true, enter);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (reduced) {
      video.pause();
      setStatus("blocked");
      return;
    }
    const attempt = video.play();
    if (attempt && typeof attempt.catch === "function") {
      attempt.catch(() => setStatus((s) => (s === "playing" ? s : "blocked")));
    }
  }, [reduced]);

  const play = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    video.play().catch(() => setStatus("blocked"));
  };

  const handleEnded = () => {
    setStatus("ended");
    if (intro.enterOnEnd) enter();
  };

  const showPlay = status === "blocked" || status === "ended";

  return (
    <div
      ref={panelRef}
      className={`intro ${leaving ? "intro--leaving" : ""}`}
      role="dialog"
      aria-modal="true"
      aria-label={`Abertura: ${name}`}
      style={{ "--intro-poster": intro.poster ? `url(${intro.poster})` : "none" }}
    >
      <div className="intro__backdrop" aria-hidden="true" />

      <div className="intro__layout">
        <div className="intro__copy">
          <h1 className="intro__name">{name}</h1>
          {slogan && <p className="intro__slogan">{slogan}</p>}
          <button type="button" className="btn btn--solid intro__enter" onClick={enter} data-autofocus>
            Entrar no site
          </button>
        </div>

        <div className="intro__frame" style={{ aspectRatio: ratio }}>
          {status === "error" ? (
            intro.poster && <img className="intro__media" src={intro.poster} alt="" />
          ) : (
            <video
              ref={videoRef}
              className="intro__media"
              src={intro.video}
              poster={intro.poster || undefined}
              muted
              playsInline
              autoPlay
              preload="metadata"
              disablePictureInPicture
              aria-label={`Vídeo de abertura de ${name}`}
              onLoadedMetadata={(e) => {
                const { videoWidth: w, videoHeight: h } = e.currentTarget;
                if (w && h) setRatio(w / h);
              }}
              onPlaying={() => setStatus("playing")}
              onEnded={handleEnded}
              onError={() => setStatus("error")}
            />
          )}

          {showPlay && status !== "error" && (
            <button type="button" className="intro__play" onClick={play} aria-label="Reproduzir vídeo de abertura">
              <PlayIcon width={28} height={28} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
