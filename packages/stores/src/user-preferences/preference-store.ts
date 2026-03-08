import { getPreferencesSettings, savePreferencesSettings } from "@repo/infra";
import { createPreferencesStore } from "./user-preferences";

export const usePreferencesStore = createPreferencesStore(
  getPreferencesSettings,
  savePreferencesSettings,
);
