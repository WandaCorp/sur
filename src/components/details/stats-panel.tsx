/**
 * Estadísticas interactivas (Recharts) a partir de datos TMDb:
 * rating radial, votos vs popularidad y presupuesto vs recaudación.
 */
import {
  Bar,
  BarChart,
  CartesianGrid,
  PolarAngleAxis,
  RadialBar,
  RadialBarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { formatCompact, formatMoney } from "@/lib/format";

interface StatsInput {
  voteAverage: number;
  voteCount: number;
  popularity: number;
  budget?: number;
  revenue?: number;
  runtime?: number | null;
  seasons?: number;
  episodes?: number;
}

export function StatsPanel(props: StatsInput) {
  const rating = Math.round((props.voteAverage || 0) * 10) / 10;
  const radial = [{ name: "Rating", value: Math.min(rating * 10, 100), fill: "#ffd700" }];
  const reception = [
    { name: "Votos", value: props.voteCount || 0 },
    { name: "Popularidad", value: Math.round(props.popularity || 0) },
  ];
  const money =
    props.budget || props.revenue
      ? [
          { name: "Presupuesto", value: props.budget || 0 },
          { name: "Ingresos", value: props.revenue || 0 },
        ]
      : null;

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      <article className="rounded-xl border border-border bg-surface p-4">
        <h3 className="text-sm font-semibold text-muted">Puntuación TMDb</h3>
        <div className="relative mx-auto h-44 w-44">
          <ResponsiveContainer>
            <RadialBarChart
              innerRadius="72%"
              outerRadius="100%"
              data={radial}
              startAngle={90}
              endAngle={-270}
            >
              <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
              <RadialBar dataKey="value" cornerRadius={8} background={{ fill: "#1a1a1a" }} />
            </RadialBarChart>
          </ResponsiveContainer>
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-display text-4xl text-gold tabular-nums">{rating.toFixed(1)}</span>
            <span className="text-xs text-muted">/ 10</span>
          </div>
        </div>
        <p className="text-center text-xs text-muted">
          {formatCompact(props.voteCount)} votos · pop. {formatCompact(props.popularity)}
        </p>
      </article>

      <article className="rounded-xl border border-border bg-surface p-4">
        <h3 className="mb-2 text-sm font-semibold text-muted">Recepción</h3>
        <div className="h-44">
          <ResponsiveContainer>
            <BarChart data={reception}>
              <CartesianGrid stroke="#2a2a2a" vertical={false} />
              <XAxis dataKey="name" stroke="#a3a3a3" fontSize={12} tickLine={false} />
              <YAxis stroke="#a3a3a3" fontSize={11} tickLine={false} axisLine={false} />
              <Tooltip
                contentStyle={{ background: "#121212", border: "1px solid #2a2a2a", borderRadius: 8 }}
                formatter={(v: number) => formatCompact(v)}
              />
              <Bar dataKey="value" fill="#00a8e1" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </article>

      {money ? (
        <article className="rounded-xl border border-border bg-surface p-4">
          <h3 className="mb-2 text-sm font-semibold text-muted">Finanzas</h3>
          <div className="h-44">
            <ResponsiveContainer>
              <BarChart data={money}>
                <CartesianGrid stroke="#2a2a2a" vertical={false} />
                <XAxis dataKey="name" stroke="#a3a3a3" fontSize={12} tickLine={false} />
                <YAxis hide />
                <Tooltip
                  contentStyle={{ background: "#121212", border: "1px solid #2a2a2a", borderRadius: 8 }}
                  formatter={(v: number) => formatMoney(v)}
                />
                <Bar dataKey="value" fill="#ffd700" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          {props.budget && props.revenue ? (
            <p className="mt-1 text-center text-xs text-muted">
              Retorno {((props.revenue / props.budget) * 100).toFixed(0)}%
            </p>
          ) : null}
        </article>
      ) : (
        <article className="rounded-xl border border-border bg-surface p-4">
          <h3 className="mb-3 text-sm font-semibold text-muted">Ficha rápida</h3>
          <dl className="space-y-2 text-sm">
            {props.runtime ? (
              <div className="flex justify-between">
                <dt className="text-muted">Duración</dt>
                <dd className="tabular-nums">{props.runtime} min</dd>
              </div>
            ) : null}
            {props.seasons != null ? (
              <div className="flex justify-between">
                <dt className="text-muted">Temporadas</dt>
                <dd className="tabular-nums">{props.seasons}</dd>
              </div>
            ) : null}
            {props.episodes != null ? (
              <div className="flex justify-between">
                <dt className="text-muted">Episodios</dt>
                <dd className="tabular-nums">{props.episodes}</dd>
              </div>
            ) : null}
            <div className="flex justify-between">
              <dt className="text-muted">Popularidad</dt>
              <dd className="tabular-nums">{formatCompact(props.popularity)}</dd>
            </div>
          </dl>
        </article>
      )}
    </div>
  );
}
