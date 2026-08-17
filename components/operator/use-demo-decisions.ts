"use client";

import { useCallback, useSyncExternalStore } from "react";
import { fleetAfterSurge } from "@/lib/demo";

let surge = false;
let roster = false;
const listeners = new Set<() => void>();

function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => listeners.delete(cb);
}

function snapshot() {
  return `${Number(surge)}${Number(roster)}`;
}

function emit() {
  for (const listener of listeners) listener();
}

export function useDemoDecisions() {
  const snap = useSyncExternalStore(subscribe, snapshot, () => "00");
  const surgeOn = snap[0] === "1";
  const rosterOn = snap[1] === "1";

  const approveSurge = useCallback(() => {
    surge = true;
    emit();
  }, []);
  const requestRoster = useCallback(() => {
    roster = true;
    emit();
  }, []);
  const reset = useCallback(() => {
    surge = false;
    roster = false;
    emit();
  }, []);

  return {
    surge: surgeOn,
    roster: rosterOn,
    approveSurge,
    requestRoster,
    reset,
    ...fleetAfterSurge(surgeOn),
  };
}
