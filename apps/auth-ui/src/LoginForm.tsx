export default function LoginForm({ onSignIn }: { onSignIn?: () => void }) {
  return (
    <div className="ol-max-w-sm ol-mx-auto ol-rounded-2xl ol-border ol-p-4">
      <h1 className="ol-text-xl ol-font-semibold ol-mb-2">Login (auth-ui)</h1>
      <button
        className="ol-w-full ol-rounded-xl ol-py-2 ol-font-medium ol-bg-[hsl(var(--brand))] ol-text-white"
        onClick={onSignIn}
      >
        Continue
      </button>
    </div>
  );
}
