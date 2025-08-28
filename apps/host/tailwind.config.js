/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "../../packages/design-system/src/**/*.{ts,tsx}", // so Host "sees" DS classes
  ],
  prefix: "ol-", // keep consistent with design-system
  theme: { extend: {} },
  plugins: [],
};
