/** Aviso curto e acessível (leitores de tela anunciam o texto). */
export default function Toast({ message }) {
  return (
    <div className="toast-region" role="status" aria-live="polite">
      {message && <p className="toast">{message}</p>}
    </div>
  );
}
