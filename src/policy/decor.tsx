import { useCallback, useRef, useState, type CSSProperties } from "react";

/* ---------- Dot-matrix icons (heart / star / plus), just like the game logo ---------- */

const HEART = [
  ".XX.XX.",
  "XXXXXXX",
  "XXXXXXX",
  "XXXXXXX",
  ".XXXXX.",
  "..XXX..",
  "...X...",
];
const STAR = [
  "...X...",
  "..XXX..",
  "XXXXXXX",
  ".XXXXX.",
  "..XXX..",
  ".XX.XX.",
];
const PLUS = [
  "...X...",
  "..XXX..",
  "XXXXXXX",
  "..XXX..",
  "...X...",
];

export function DotMatrix({
  map,
  className = "",
  dotClass = "fill-ink",
  beat = false,
}: {
  map: string[];
  className?: string;
  dotClass?: string;
  beat?: boolean;
}) {
  const rows = map.length;
  const cols = map[0].length;
  return (
    <svg
      viewBox={`0 0 ${cols * 10} ${rows * 10}`}
      className={`${className} ${beat ? "heart-beat" : ""}`}
      aria-hidden="true"
    >
      {map.flatMap((row, y) =>
        row.split("").map((c, x) =>
          c === "X" ? (
            <circle
              key={`${x}-${y}`}
              cx={x * 10 + 5}
              cy={y * 10 + 5}
              r={3.9}
              className={dotClass}
            />
          ) : null
        )
      )}
    </svg>
  );
}

export const HEART_MAP = HEART;
export const STAR_MAP = STAR;
export const PLUS_MAP = PLUS;

/* ---------- Thick rounded arrow, the game's puzzle piece ---------- */

export function ArrowGlyph({
  dir,
  className = "",
}: {
  dir: "left" | "right" | "up" | "down";
  className?: string;
}) {
  const rot =
    dir === "right" ? 0 : dir === "down" ? 90 : dir === "left" ? 180 : 270;
  return (
    <svg
      viewBox="0 0 32 32"
      className={className}
      style={{ transform: `rotate(${rot}deg)` }}
      aria-hidden="true"
    >
      <path
        d="M7 16h14"
        stroke="currentColor"
        strokeWidth="6"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M20 7.5 30 16l-10 8.5Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ---------- Ambient floating arrows for the page background ---------- */

const FLOATERS: Array<{
  dir: "left" | "right" | "up" | "down";
  top: string;
  left: string;
  size: number;
  rot: string;
  delay: string;
}> = [
  { dir: "right", top: "12%", left: "4%", size: 54, rot: "-8deg", delay: "0s" },
  { dir: "left", top: "30%", left: "90%", size: 44, rot: "10deg", delay: "1.4s" },
  { dir: "up", top: "58%", left: "2%", size: 40, rot: "6deg", delay: "2.2s" },
  { dir: "down", top: "74%", left: "93%", size: 50, rot: "-12deg", delay: "0.8s" },
  { dir: "left", top: "88%", left: "12%", size: 36, rot: "4deg", delay: "3s" },
  { dir: "right", top: "44%", left: "96%", size: 34, rot: "-6deg", delay: "1.9s" },
];

export function FloatingArrows() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden="true">
      {FLOATERS.map((f, i) => (
        <div
          key={i}
          className="drift absolute text-ink/[0.07]"
          style={
            {
              top: f.top,
              left: f.left,
              width: f.size,
              height: f.size,
              "--rot": f.rot,
              animationDelay: f.delay,
            } as CSSProperties
          }
        >
          <ArrowGlyph dir={f.dir} className="h-full w-full" />
        </div>
      ))}
    </div>
  );
}

/* ---------- The header toy: a one-row Tap Away board ---------- */

type Dir = "left" | "right" | "up" | "down";
interface Cell {
  id: number;
  dir: Dir | null;
  state: "idle" | "exit" | "empty";
}

const START: Dir[] = ["left", "up", "right", "down", "left", "up", "right"];
const DIRS: Dir[] = ["left", "right", "up", "down"];
const EXIT_CLASS: Record<Dir, string> = {
  left: "go-left",
  right: "go-right",
  up: "go-up",
  down: "go-down",
};

export function ArrowToy() {
  const [cells, setCells] = useState<Cell[]>(() =>
    START.map((dir, i) => ({ id: i, dir, state: "idle" as const }))
  );
  const [cleared, setCleared] = useState(0);
  const [nudgeId, setNudgeId] = useState<number | null>(null);
  const idRef = useRef(100);

  const isClear = useCallback(
    (idx: number, dir: Dir) => {
      if (dir === "up" || dir === "down") return true;
      if (dir === "left")
        return cells.slice(0, idx).every((c) => c.state === "empty" || c.dir === null);
      return cells
        .slice(idx + 1)
        .every((c) => c.state === "empty" || c.dir === null);
    },
    [cells]
  );

  const tap = (idx: number) => {
    const cell = cells[idx];
    if (!cell.dir || cell.state !== "idle") return;
    if (!isClear(idx, cell.dir)) {
      setNudgeId(cell.id);
      window.setTimeout(() => setNudgeId(null), 320);
      return;
    }
    setCells((prev) =>
      prev.map((c, i) => (i === idx ? { ...c, state: "exit" } : c))
    );
    setCleared((n) => n + 1);
    window.setTimeout(() => {
      setCells((prev) =>
        prev.map((c, i) => (i === idx ? { ...c, dir: null, state: "empty" } : c))
      );
    }, 480);
    window.setTimeout(() => {
      setCells((prev) => {
        const empties = prev
          .map((c, i) => ({ c, i }))
          .filter(({ c }) => c.state === "empty" || c.dir === null);
        if (empties.length === 0) return prev;
        const pick = empties[Math.floor(Math.random() * empties.length)];
        const dir = DIRS[Math.floor(Math.random() * DIRS.length)];
        return prev.map((c, i) =>
          i === pick.i ? { id: ++idRef.current, dir, state: "idle" } : c
        );
      });
    }, 1500);
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="dot-grid rounded-2xl bg-panel-soft/70 p-3 shadow-[0_2px_0_rgba(67,53,44,0.06)] ring-1 ring-line">
        <div className="flex gap-1.5">
          {cells.map((cell, i) => (
            <button
              key={cell.id}
              onClick={() => tap(i)}
              disabled={!cell.dir || cell.state !== "idle"}
              aria-label={
                cell.dir ? `Arrow pointing ${cell.dir}` : "Empty cell"
              }
              className={`relative grid h-11 w-11 place-items-center rounded-xl transition-colors sm:h-12 sm:w-12 ${
                cell.dir && cell.state === "idle"
                  ? "cursor-pointer hover:bg-cream-deep/70 active:scale-95"
                  : ""
              }`}
            >
              {cell.dir && cell.state !== "empty" && (
                <span
                  className={`${cell.state === "exit" ? EXIT_CLASS[cell.dir] : "pop-in"} ${
                    nudgeId === cell.id ? "nudge" : ""
                  } block`}
                >
                  <ArrowGlyph
                    dir={cell.dir}
                    className="h-8 w-8 text-ink transition-colors hover:text-ink-deep sm:h-9 sm:w-9"
                  />
                </span>
              )}
              {!cell.dir && (
                <span className="h-1.5 w-1.5 rounded-full bg-ink/15" />
              )}
            </button>
          ))}
        </div>
      </div>
      <p className="text-xs font-semibold tracking-wide text-taupe">
        Tap an arrow whose path is clear — it slides off the board.{" "}
        <span className="text-sky-deep">{cleared} cleared</span>
      </p>
    </div>
  );
}
