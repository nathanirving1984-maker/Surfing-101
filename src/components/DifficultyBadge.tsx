import type { Difficulty } from "@/data/spots";

const styles: Record<Difficulty, string> = {
  Beginner: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300",
  "Beginner-Intermediate": "bg-teal-100 text-teal-800 dark:bg-teal-900/40 dark:text-teal-300",
  Intermediate: "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300",
  Advanced: "bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-300",
};

export default function DifficultyBadge({ level }: { level: Difficulty }) {
  return (
    <span className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${styles[level]}`}>
      {level}
    </span>
  );
}
