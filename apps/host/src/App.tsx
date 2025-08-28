import "./App.css";

function App() {
  return (
    <>
      <div
        style={{ color: "hsl(var(--brand))", fontWeight: 700, fontSize: 24 }}
      >
        🔎 Inline style sees --brand
      </div>
      <div className="ol-text-2xl ol-font-bold ol-text-[hsl(var(--brand))]">
        ✅ Design-system brand color is working!
      </div>
    </>
  );
}

export default App;
