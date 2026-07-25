import type { Metadata } from "next";
import { boardTypes, boardSizingTips } from "@/data/boards";
import { wetsuitGuides, wetsuitTips } from "@/data/wetsuits";

export const metadata: Metadata = {
  title: "Gear Guide",
  description: "What surfboard and wetsuit thickness to start with, by skill level and water temperature.",
};

export default function GearPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <p className="text-sm font-semibold uppercase tracking-widest text-cyan-700 dark:text-cyan-400">
        Gear Guide
      </p>
      <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl dark:text-slate-100">
        Boards and wetsuits, matched to where you&apos;re starting
      </h1>
      <p className="mt-4 max-w-2xl text-slate-600 dark:text-slate-400">
        The right gear makes learning dramatically easier. Here&apos;s a general guide — a shop
        from the Surf Shops section can size you far more precisely in person.
      </p>

      <h2 className="mt-12 text-2xl font-bold text-slate-900 dark:text-slate-100">Choosing a board</h2>
      <div className="mt-6 space-y-4">
        {boardTypes.map((board) => (
          <div
            key={board.name}
            className="rounded-2xl border border-black/10 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-white/[0.03]"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="font-semibold text-slate-900 dark:text-slate-100">{board.name}</h3>
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400">{board.lengthRange}</span>
            </div>
            <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-cyan-700 dark:text-cyan-400">
              Best for: {board.bestFor}
            </p>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{board.description}</p>
          </div>
        ))}
      </div>

      <ul className="mt-6 list-disc space-y-2 pl-5 text-sm text-slate-700 dark:text-slate-300">
        {boardSizingTips.map((tip) => (
          <li key={tip}>{tip}</li>
        ))}
      </ul>

      <h2 className="mt-14 text-2xl font-bold text-slate-900 dark:text-slate-100">Choosing a wetsuit</h2>
      <div className="mt-6 overflow-x-auto rounded-2xl border border-black/10 dark:border-white/10">
        <table className="min-w-full divide-y divide-black/10 text-sm dark:divide-white/10">
          <thead className="bg-black/[0.03] dark:bg-white/[0.05]">
            <tr>
              <th className="px-4 py-3 text-left font-semibold text-slate-700 dark:text-slate-300">
                Water temp
              </th>
              <th className="px-4 py-3 text-left font-semibold text-slate-700 dark:text-slate-300">
                Thickness
              </th>
              <th className="px-4 py-3 text-left font-semibold text-slate-700 dark:text-slate-300">
                Extras
              </th>
              <th className="px-4 py-3 text-left font-semibold text-slate-700 dark:text-slate-300">
                When
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-black/10 dark:divide-white/10">
            {wetsuitGuides.map((row) => (
              <tr key={row.waterTemp}>
                <td className="px-4 py-3 font-medium text-slate-900 dark:text-slate-100">{row.waterTemp}</td>
                <td className="px-4 py-3 text-slate-700 dark:text-slate-300">{row.thickness}</td>
                <td className="px-4 py-3 text-slate-600 dark:text-slate-400">{row.extras}</td>
                <td className="px-4 py-3 text-slate-600 dark:text-slate-400">{row.season}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ul className="mt-6 list-disc space-y-2 pl-5 text-sm text-slate-700 dark:text-slate-300">
        {wetsuitTips.map((tip) => (
          <li key={tip}>{tip}</li>
        ))}
      </ul>
    </div>
  );
}
