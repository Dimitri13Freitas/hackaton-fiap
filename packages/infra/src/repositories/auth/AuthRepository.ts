import { User as DomainUser } from "@repo/domain";
import {
  createUserWithEmailAndPassword,
  User as FirebaseUser,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../firebase/firebase-config";
import { IAuthRepository } from "@repo/application";

export class AuthRepository implements IAuthRepository {
  private currentUser: DomainUser | null = null;

  async signIn(email: string, password: string): Promise<DomainUser> {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );

      const firebaseUser = userCredential.user;
      const domainUser = this.mapFirebaseUserToDomain(firebaseUser);
      this.currentUser = domainUser;

      return domainUser;
    } catch (error: any) {
      if (error.code === "auth/invalid-credential") {
        throw new Error("Usuário ou senha incorretos");
      }
      if (error.code === "auth/user-not-found") {
        throw new Error("Usuário não encontrado");
      }
      if (error.code === "auth/wrong-password") {
        throw new Error("Senha incorreta");
      }
      throw new Error("Erro ao fazer login. Tente novamente.");
    }
  }

  async signUp(
    email: string,
    password: string,
    name: string,
  ): Promise<DomainUser> {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );

      const firebaseUser = userCredential.user;
      await updateProfile(firebaseUser, { displayName: name });

      // return userCredential.user;

      // if (firebaseUser.email) {
      //   const userRef = doc(db, "users", firebaseUser.uid);

      //   await setDoc(userRef, {
      //     email: email,
      //     totalBalance: 0,
      //     createdAt: new Date(),
      //   });
      // }

      const domainUser = this.mapFirebaseUserToDomain(firebaseUser);
      this.currentUser = domainUser;

      return domainUser;
    } catch (error: any) {
      if (error.code === "auth/email-already-in-use") {
        throw new Error("Este email já está em uso");
      }
      if (error.code === "auth/weak-password") {
        throw new Error("A senha é muito fraca");
      }
      if (error.code === "auth/invalid-email") {
        throw new Error("Email inválido");
      }
      throw new Error("Erro ao criar conta. Tente novamente.");
    }
  }

  async signOut(): Promise<void> {
    try {
      await signOut(auth);
      this.currentUser = null;
    } catch (error) {
      throw new Error("Erro ao fazer logout");
    }
  }

  async sendPasswordResetEmail(email: string): Promise<void> {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error: any) {
      if (error.code === "auth/user-not-found") {
        throw new Error("Usuário não encontrado");
      }
      throw new Error("Erro ao enviar email de recuperação");
    }
  }

  onAuthStateChanged(callback: (user: DomainUser | null) => void): () => void {
    return onAuthStateChanged(auth, (firebaseUser: FirebaseUser | null) => {
      if (firebaseUser) {
        const domainUser = this.mapFirebaseUserToDomain(firebaseUser);
        this.currentUser = domainUser;
        callback(domainUser);
      } else {
        this.currentUser = null;
        callback(null);
      }
    });
  }

  getCurrentUser(): DomainUser | null {
    return this.currentUser;
  }

  private mapFirebaseUserToDomain(firebaseUser: FirebaseUser): DomainUser {
    return DomainUser.create(
      firebaseUser.uid,
      firebaseUser.email,
      firebaseUser.displayName,
      firebaseUser.emailVerified,
    );
  }
}
