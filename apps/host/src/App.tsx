import { lazy, Suspense, useEffect, useRef, useState } from "react";

const LoginForm = lazy(() => import("auth_ui/LoginForm"));

type AuthUser = { uid: string; name?: string };

type Provider = {
  init(config: Record<string, unknown>): Promise<void>;
  signIn(): Promise<AuthUser>;
  signOut(): Promise<void>;
  onAuthStateChanged(cb: (u: AuthUser | null) => void): () => void;
  getIdToken(): Promise<string | null>;
};

export default function App() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const providerRef = useRef<Provider | null>(null);
  const unsubscribeRef = useRef<null | (() => void)>(null);

  useEffect(() => {
    return () => {
      // cleanup subscription on unmount
      unsubscribeRef.current?.();
    };
  }, []);

  async function ensureProvider(): Promise<Provider> {
    if (providerRef.current) return providerRef.current;

    const createProvider = (await import("provider_firebase/createProvider"))
      .default as () => Provider;
    const p = createProvider();

    // read env from Vite
    const cfg = {
      firebaseConfig: {
        apiKey: import.meta.env.VITE_FB_API_KEY,
        authDomain: import.meta.env.VITE_FB_AUTH_DOMAIN,
        projectId: import.meta.env.VITE_FB_PROJECT_ID,
        appId: import.meta.env.VITE_FB_APP_ID,
      },
      useEmulator: String(import.meta.env.VITE_FB_USE_EMULATOR) === "true",
      emulatorOrigin: import.meta.env.VITE_FB_EMULATOR_ORIGIN,
    };

    await p.init(cfg as any);
    const unsub = p.onAuthStateChanged(setUser);
    unsubscribeRef.current = unsub;
    providerRef.current = p;
    return p;
  }

  async function handleSignIn() {
    const p = await ensureProvider();
    await p.signIn();
  }

  async function handleSignOut() {
    const p = await ensureProvider();
    await p.signOut();
  }

  return (
    <div className="ol-min-h-screen ol-bg-[rgb(var(--color-bg))] ol-text-[rgb(var(--color-fg))]">
      <header className="ol-sticky ol-top-0 ol-z-10 ol-backdrop-blur ol-border-b ol-border-black/10 ol-px-4 ol-py-2 ol-flex ol-items-center ol-justify-between">
        <div className="ol-font-semibold ol-text-[hsl(var(--brand))]">
          MF Auth Host
        </div>
        <div className="ol-flex ol-items-center ol-gap-3">
          {user ? (
            <>
              <span className="ol-text-sm">
                Signed in as <strong>{user.name ?? user.uid}</strong>
              </span>
              <button
                className="ol-text-sm ol-rounded-xl ol-border ol-px-3 ol-py-1"
                onClick={handleSignOut}
              >
                Sign out
              </button>
            </>
          ) : (
            <span className="ol-text-sm ol-opacity-70">Not signed in</span>
          )}
        </div>
      </header>

      <main className="ol-max-w-xl ol-mx-auto ol-p-6 ol-space-y-6">
        <h1 className="ol-text-2xl ol-font-bold ol-text-[hsl(var(--brand))]">
          Host → Remote (auth-ui) + Provider (firebase stub)
        </h1>

        <section className="ol-space-y-3">
          <Suspense fallback={<div>Loading login…</div>}>
            {/* remote component; TS types are shimmed */}
            <LoginForm onSignIn={handleSignIn} />
          </Suspense>

          <div className="ol-text-sm ol-opacity-80">
            User: {user ? `${user.uid} (${user.name ?? "no name"})` : "none"}
          </div>
        </section>

        {/* Optional debug controls */}
        <section className="ol-rounded-2xl ol-border ol-p-4 ol-space-y-2">
          <div className="ol-font-semibold">Provider controls</div>
          <div className="ol-flex ol-gap-2">
            <button
              className="ol-rounded-xl ol-bg-[hsl(var(--brand))] ol-text-white ol-px-3 ol-py-2"
              onClick={handleSignIn}
            >
              Sign in (stub)
            </button>
            <button
              className="ol-rounded-xl ol-border ol-px-3 ol-py-2"
              onClick={handleSignOut}
            >
              Sign out
            </button>
          </div>
        </section>
      </main>

      <footer className="ol-text-center ol-text-xs ol-opacity-70 ol-py-6">
        © {new Date().getFullYear()} MF Auth Demo
      </footer>
    </div>
  );
}
