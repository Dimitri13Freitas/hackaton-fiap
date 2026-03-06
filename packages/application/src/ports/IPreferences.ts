import { PreferencesSettings } from "@repo/domain";

export interface IPreferencesRepository {
  get(userId: string): Promise<PreferencesSettings | null>;

  save(userId: string, settings: PreferencesSettings): Promise<void>;
}
