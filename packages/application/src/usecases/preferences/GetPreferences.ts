import { IPreferencesRepository } from "../../ports/IPreferences";
export class GetPreferencesSettings {
  constructor(private repository: IPreferencesRepository) {}

  async execute(userId: string) {
    return this.repository.get(userId);
  }
}
