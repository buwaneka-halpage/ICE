"use client";

import { useCallback, useEffect, useState } from "react";
import { ROSTER_KEY, SURGE_KEY, fleetAfterSurge } from "@/lib/demo";

export function useDemoDecisions() {
  const [surge, setSurge] = useState(false);
  const [roster, setRoster] = useState(false);

  useEffect(() => {
    setSurge(sessionStorage.getItem(SURGE_KEY) === "1");
    setRoster(sessionStorage.getItem(ROSTER_KEY) === "1");
  }, []);

  const approveSurge = useCallback(() => {
    sessionStorage.setItem(SURGE_KEY, "1");
    setSurge(true);
  }, []);

  const requestRoster = useCallback(() => {
    sessionStorage.setItem(ROSTER_KEY, "1");
    setRoster(true);
  }, []);

  const reset = useCallback(() => {
    sessionStorage.removeItem(SURGE_KEY);
    sessionStorage.removeItem(ROSTER_KEY);
    setSurge(false);
    setRoster(false);
  }, []);

  return {
    surge,
    roster,
    approveSurge,
    requestRoster,
    reset,
    ...fleetAfterSurge(surge),
  };
}
