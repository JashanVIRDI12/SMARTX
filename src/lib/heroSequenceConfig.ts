export const HERO_SEQUENCE = {
  frameCount: 543,
  fps: 60,
  path: (index: number) =>
    `/hero-sequence/frame_${String(index + 1).padStart(5, '0')}.jpg`,
  segmentDurationSec: 3,
  totalDurationSec: 9,
} as const;

export function segmentIndexFromProgress(progress: number) {
  const segment = Math.floor(
    progress * (HERO_SEQUENCE.totalDurationSec / HERO_SEQUENCE.segmentDurationSec),
  );
  if (segment >= 2) return -1;
  return segment;
}
