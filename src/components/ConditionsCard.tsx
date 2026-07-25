import {
  degToCompass,
  metersToFeet,
  kmhToMph,
  celsiusToFahrenheit,
  type Conditions,
  type Unit,
} from "@/lib/geo";

export default function ConditionsCard({ conditions, unit }: { conditions: Conditions; unit: Unit }) {
  const waveHeight = conditions.waveHeightM;
  const windSpeed = conditions.windSpeedKmh;
  const airTemp = conditions.airTempC;

  const waveHeightDisplay =
    waveHeight === null ? "—" : unit === "metric" ? `${waveHeight.toFixed(1)} m` : `${metersToFeet(waveHeight)!.toFixed(1)} ft`;
  const windSpeedDisplay =
    windSpeed === null ? "—" : unit === "metric" ? `${Math.round(windSpeed)} km/h` : `${Math.round(kmhToMph(windSpeed)!)} mph`;
  const airTempDisplay =
    airTemp === null ? "—" : unit === "metric" ? `${Math.round(airTemp)}°C` : `${Math.round(celsiusToFahrenheit(airTemp)!)}°F`;

  return (
    <div className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/[0.03]">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="font-semibold text-slate-900 dark:text-slate-100">Forecast conditions</h3>
        {conditions.time && (
          <span className="text-xs text-slate-500 dark:text-slate-400">
            {new Date(conditions.time).toLocaleString(undefined, { weekday: "short", hour: "numeric", minute: "2-digit" })}
          </span>
        )}
      </div>
      <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div>
          <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-500">Wave height</dt>
          <dd className="mt-1 text-lg font-bold text-cyan-700 dark:text-cyan-400">{waveHeightDisplay}</dd>
        </div>
        <div>
          <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-500">Wave period</dt>
          <dd className="mt-1 text-lg font-bold text-cyan-700 dark:text-cyan-400">
            {conditions.wavePeriodS === null ? "—" : `${conditions.wavePeriodS.toFixed(0)} s`}
          </dd>
        </div>
        <div>
          <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-500">Wind</dt>
          <dd className="mt-1 text-lg font-bold text-cyan-700 dark:text-cyan-400">
            {windSpeedDisplay} {degToCompass(conditions.windDirectionDeg)}
          </dd>
        </div>
        <div>
          <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-500">Air temp</dt>
          <dd className="mt-1 text-lg font-bold text-cyan-700 dark:text-cyan-400">{airTempDisplay}</dd>
        </div>
      </div>
      <p className="mt-4 text-xs text-slate-500 dark:text-slate-500">
        This is a computer-generated forecast (Open-Meteo), not a live buoy reading. Always check a local surf
        report and use your own judgment before paddling out.
      </p>
    </div>
  );
}
