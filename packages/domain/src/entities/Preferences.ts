export type ThemeMode = "light" | "dark";
export type ScaleOption = "small" | "medium" | "large";

export interface PomodoroSettings {
  focusMinutes?: number;
  breakMinutes?: number;
}

export interface PreferencesSettings {
  animations: boolean;
  focusMode: boolean;
  theme: ThemeMode;
  highContrast: boolean;
  pomodoro: PomodoroSettings;
  spacing: ScaleOption;
  fontSize: ScaleOption;
  version: number;
}
