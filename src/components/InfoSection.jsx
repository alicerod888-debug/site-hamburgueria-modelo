import store from "../config/store.js";
import { formatCurrency } from "../utils/formatCurrency.js";

function deliveryFeeText({ fee, freeAbove }) {
  if (fee === null || fee === undefined) return "Taxa informada pela loja";
  const base = fee === 0 ? "Entrega grátis" : `Taxa de entrega: ${formatCurrency(fee)}`;
  return fee > 0 && freeAbove ? `${base} (grátis a partir de ${formatCurrency(freeAbove)})` : base;
}

export default function InfoSection() {
  const { schedule, scheduleNote, ordering } = store;
  const { delivery, pickup } = ordering;
  const hasSchedule = schedule.length > 0;
  if (!hasSchedule && !delivery.enabled && !pickup.enabled) return null;

  return (
    <section id="funcionamento" className="section section--paper" aria-labelledby="info-title">
      <div className="container">
        <h2 id="info-title" className="section__title">{store.messages.infoTitle}</h2>
        <div className="info">
          {hasSchedule && (
            <div className="info__block">
              <h3>Horários</h3>
              <dl className="schedule">
                {schedule.map((row) => (
                  <div key={row.label} className="schedule__row">
                    <dt>{row.label}</dt>
                    <dd>{row.time}</dd>
                  </div>
                ))}
              </dl>
              {scheduleNote && <p className="info__note">{scheduleNote}</p>}
            </div>
          )}

          {delivery.enabled && (
            <div className="info__block">
              <h3>Entrega</h3>
              <p>{deliveryFeeText(delivery)}</p>
              {delivery.estimate && <p>Prazo estimado: {delivery.estimate}</p>}
              {delivery.area && <p>Área: {delivery.area}</p>}
            </div>
          )}

          {pickup.enabled && (
            <div className="info__block">
              <h3>Retirada</h3>
              <p>Retire seu pedido no balcão.</p>
              {pickup.estimate && <p>Prazo estimado: {pickup.estimate}</p>}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
