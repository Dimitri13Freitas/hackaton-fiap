import {
  GetPreferencesSettings,
  SavePreferencesSettings,
} from "@repo/application";
import { PreferencesRepository } from "./PreferencesRepository";

const preferencesRepository = new PreferencesRepository();

export const getPreferencesSettings = new GetPreferencesSettings(
  preferencesRepository,
);

export const savePreferencesSettings = new SavePreferencesSettings(
  preferencesRepository,
);
