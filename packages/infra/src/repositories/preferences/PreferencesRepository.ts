import { IPreferencesRepository } from "@repo/application";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase-config";

export class PreferencesRepository implements IPreferencesRepository {
  async get(userId: string) {
    const ref = doc(db, "users", userId);

    const snap = await getDoc(ref);

    if (!snap.exists()) return null;

    return snap.data().accessibilitySettings;
  }

  async save(userId: string, settings: any) {
    const ref = doc(db, "users", userId);

    await setDoc(ref, { accessibilitySettings: settings }, { merge: true });
  }
}
