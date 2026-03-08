"use client";

import { useEffect } from "react";
import { usePreferencesStore, useAuthStore } from "@repo/stores";

export function PreferencesProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = usePreferencesStore((s) => s.settings);
  const user = useAuthStore((s) => s.user);
  const hydrate = usePreferencesStore((s) => s.hydrate);

  useEffect(() => {
    if (user && !settings) {
      hydrate(user.uid);
    }
  }, [user, hydrate, settings]);

  useEffect(() => {
    const html = document.documentElement;
    html.classList.toggle("dark", settings?.theme === "dark");
  }, [settings?.theme]);

  return <>{children}</>;
}
