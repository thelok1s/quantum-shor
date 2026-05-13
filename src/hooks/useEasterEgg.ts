import { useState, useEffect, useRef } from "react";
import useSound from "use-sound";
import pipe from "@/assets/metalpipe.mp3";

// ── Easter egg configuration ─────────────────────────────────────────────────
const EASTER_EGG_ENABLED = true;
const STREAK_TEXT_THRESHOLD = 3; // consecutive failures before floating text appears
const STREAK_SOUND_THRESHOLD = 5; // consecutive failures before metal pipe plays
// ─────────────────────────────────────────────────────────────────────────────

interface EasterEggState {
  failStreak: number;
  burstKey: number;
  burstStreakValue: number;
  shouldPlaySound: boolean;
  play: () => void;
  handleFailure: (failed: boolean) => void;
}

export function useEasterEgg(): EasterEggState {
  const failStreakRef = useRef(0);
  const [failStreak, setFailStreak] = useState(0);
  const [burstKey, setBurstKey] = useState(0);
  const [burstStreakValue, setBurstStreakValue] = useState(0);
  const [shouldPlaySound, setShouldPlaySound] = useState(false);

  const [play] = useSound(pipe, { volume: 0.1 });
  useEffect(() => {
    if (shouldPlaySound) {
      play();
      setShouldPlaySound(false);
    }
  }, [shouldPlaySound, play]);

  const handleFailure = (failed: boolean) => {
    if (failed) {
      failStreakRef.current += 1;
    } else {
      failStreakRef.current = 0;
    }

    const streak = failStreakRef.current;
    setFailStreak(streak);

    if (EASTER_EGG_ENABLED && streak >= STREAK_TEXT_THRESHOLD) {
      setBurstStreakValue(streak);
      setBurstKey((k) => k + 1);

      if (streak >= STREAK_SOUND_THRESHOLD) {
        setShouldPlaySound(true);
      }
    }
  };

  return {
    failStreak,
    burstKey,
    burstStreakValue,
    shouldPlaySound,
    play,
    handleFailure,
  };
}

export { EASTER_EGG_ENABLED, STREAK_TEXT_THRESHOLD, STREAK_SOUND_THRESHOLD };
