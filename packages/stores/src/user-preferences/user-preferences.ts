// stores/accessibility/accessibility.store.ts
import { create } from "zustand";
import { PreferencesSettings } from "@repo/domain";
import { GetPreferencesSettings } from "@repo/application";

interface AccessibilityState {
  settings: GetPreferencesSettings | null;

  hydrate: (userId?: string) => Promise<void>;

  update: (partial: Partial<PreferencesSettings>) => Promise<void>;
}

export const createAccessibilityStore = (
  getSettingsUseCase: any,
  updateSettingsUseCase: any,
) =>
  create<AccessibilityState>((set, get) => ({
    settings: null,

    hydrate: async (userId) => {
      if (!userId) return;

      const settings = await getSettingsUseCase.execute(userId);

      if (settings) {
        set({ settings });
      }
    },

    update: async (partial) => {
      const current = get().settings;

      if (!current) return;

      const updated = {
        ...current,
        ...partial,
      };

      set({ settings: updated });

      await updateSettingsUseCase.execute(updated);
    },
  }));
