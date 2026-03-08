import { PreferencesSettings } from "@repo/domain";
import { IPreferencesRepository } from "../../ports";

export class SavePreferencesSettings {
  constructor(private repository: IPreferencesRepository) {}

  async execute(userId: string, settings: PreferencesSettings) {
    await this.repository.save(userId, settings);
  }
}
