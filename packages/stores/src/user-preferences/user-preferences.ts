import { create } from "zustand";
import { persist } from "zustand/middleware";
import { PreferencesSettings } from "@repo/domain";
import {
  GetPreferencesSettings,
  SavePreferencesSettings,
} from "@repo/application";

interface PreferencesState {
  settings: PreferencesSettings | null;

  hydrate: (userId?: string) => Promise<void>;

  update: (
    partial: Partial<PreferencesSettings>,
    userId: string,
  ) => Promise<void>;
}

export const createPreferencesStore = (
  getSettingsUseCase: GetPreferencesSettings,
  saveSettingsUseCase: SavePreferencesSettings,
) =>
  create<PreferencesState>()(
    persist(
      (set, get) => ({
        settings: null,
        hydrate: async (userId) => {
          if (!userId) return;

          const settings = await getSettingsUseCase.execute(userId);

          if (settings) {
            set({ settings });
          }
        },
        update: async (partial, userId) => {
          let current = get().settings;

          const baseSettings = current || {
            animations: true,
            focusMode: false,
            theme: "light",
            highContrast: false,
            pomodoro: { focusMinutes: 25, breakMinutes: 5 },
            spacing: "medium",
            fontSize: "medium",
            version: 1,
          };

          const updated: PreferencesSettings = {
            ...baseSettings,
            ...partial,
            // A mágica acontece aqui: mesclamos o pomodoro separadamente
            pomodoro: {
              ...baseSettings.pomodoro,
              ...(partial.pomodoro || {}),
            },
          };

          set({ settings: updated });
          await saveSettingsUseCase.execute(userId, updated);
        },
      }),
      {
        name: "user-preferences",
      },
    ),
  );
