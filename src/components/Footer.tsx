export default function Footer() {
  return (
    <footer className="mt-16 border-t border-black/10 bg-black/[0.02] dark:border-white/10 dark:bg-white/[0.02]">
      <div className="mx-auto max-w-5xl px-4 py-8 text-sm text-slate-600 sm:px-6 dark:text-slate-400">
        <p className="font-semibold text-slate-800 dark:text-slate-200">Stay safe out there</p>
        <p className="mt-1 max-w-3xl">
          Surf conditions, currents, and hazards change day to day. Always check a live surf and
          weather report, respect lifeguard flags and posted advisories, never surf alone as a
          beginner, and when in doubt, stay on the beach. This site is educational and not a
          substitute for a lesson from a qualified instructor or local, current knowledge.
        </p>
        <p className="mt-4 text-xs text-slate-500 dark:text-slate-500">
          Surfing 101 &mdash; a free resource for new surfers.
        </p>
      </div>
    </footer>
  );
}
