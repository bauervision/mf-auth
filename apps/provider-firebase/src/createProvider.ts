// apps/provider-firebase/src/createProvider.ts
import { initializeApp, type FirebaseOptions } from "firebase/app";
import {
  getAuth,
  connectAuthEmulator,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut as fbSignOut,
  type Auth,
} from "firebase/auth";

export type AuthUser = {
  uid: string;
  name?: string;
  email?: string;
  photoURL?: string;
};

type InitConfig = {
  firebaseConfig: FirebaseOptions;
  useEmulator?: boolean;
  /** e.g. "http://localhost:9099" */
  emulatorOrigin?: string;
};

export default function createProvider() {
  let auth: Auth | null = null;

  return {
    async init(cfg: InitConfig) {
      const app = initializeApp(cfg.firebaseConfig);
      auth = getAuth(app);
      if (cfg.useEmulator) {
        connectAuthEmulator(
          auth,
          cfg.emulatorOrigin ?? "http://localhost:9099",
          {
            disableWarnings: true,
          }
        );
      }
    },

    async signIn(): Promise<AuthUser> {
      if (!auth) throw new Error("init first");
      const cred = await signInWithPopup(auth, new GoogleAuthProvider());
      const u = cred.user;
      return {
        uid: u.uid,
        name: u.displayName ?? undefined,
        email: u.email ?? undefined,
        photoURL: u.photoURL ?? undefined,
      };
    },

    async signOut() {
      if (auth) await fbSignOut(auth);
    },

    onAuthStateChanged(cb: (u: AuthUser | null) => void) {
      if (!auth) throw new Error("init first");
      return onAuthStateChanged(auth, (u) =>
        cb(
          u
            ? {
                uid: u.uid,
                name: u.displayName ?? undefined,
                email: u.email ?? undefined,
                photoURL: u.photoURL ?? undefined,
              }
            : null
        )
      );
    },

    async getIdToken() {
      return auth?.currentUser ? await auth.currentUser.getIdToken() : null;
    },
  };
}
