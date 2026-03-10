import { useEffect } from "react";
import { usePreferencesStore, useAuthStore } from "@repo/stores";
import { useSidebar } from "../components/ui/sidebar";

export function PreferencesProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = usePreferencesStore((s) => s.settings);
  const user = useAuthStore((s) => s.user);
  const hydrate = usePreferencesStore((s) => s.hydrate);
  const { toggleSidebar, open } = useSidebar();

  useEffect(() => {
    if (user && !settings) {
      hydrate(user.uid);
    }
  }, [user, hydrate, settings]);

  useEffect(() => {
    const html = document.documentElement;
    const isDark = settings?.theme === "dark";
    const isHC = settings?.highContrast === true;
    const animations = settings?.animations === true;
    const focusMode = settings?.focusMode;

    const fontScaleMap = {
      small: 0.9,
      medium: 1,
      large: 1.15,
    };

    const spacingScaleMap = {
      small: 0.9,
      medium: 1,
      large: 1.2,
    };

    const fontScale = fontScaleMap[settings?.fontSize ?? "medium"];
    const spaceScale = spacingScaleMap[settings?.spacing ?? "medium"];

    if (focusMode) toggleSidebar();

    html.style.setProperty("--font-scale", String(fontScale));
    html.style.setProperty("--space-scale", String(spaceScale));

    html.classList.remove("dark", "high-contrast");
    if (isDark) {
      html.classList.add("dark");
    }
    if (isHC) {
      html.classList.add("high-contrast");
    }
    if (animations) {
      html.classList.remove("no-motion");
    } else {
      html.classList.add("no-motion");
    }
  }, [
    settings?.theme,
    settings?.highContrast,
    settings?.fontSize,
    settings?.animations,
    settings?.focusMode,
    settings?.spacing,
  ]);

  return <>{children}</>;
}
