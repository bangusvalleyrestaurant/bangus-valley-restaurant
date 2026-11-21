import type { Config } from "tailwindcss";
export default { content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"], theme: { extend: { colors: { ink: "#1c1712", saffron: "#d46f26", cream: "#fbf5e9", pine: "#294438" }, fontFamily: { display: ["Georgia", "serif"] } } }, plugins: [] } satisfies Config;
