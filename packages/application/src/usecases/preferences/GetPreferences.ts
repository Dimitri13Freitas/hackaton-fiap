import { PreferencesRepository } from "../../ports/IPreferences";
export class GetPreferencesSettings {
  constructor(private repository: PreferencesRepository) {}

  async execute(userId: string) {
    return this.repository.get(userId);
  }
}
