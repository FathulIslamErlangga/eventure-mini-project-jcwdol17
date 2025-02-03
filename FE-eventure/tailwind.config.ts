import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#9723C9",
          secondary: "#E3DFF2",
          accent: "#A388EE",
          neutral: "#FDFDFC",
          "base-100": "#FDFDFC",
          info: "#87CEEB",
          success: "#90EE90",
          warning: "#FDFD96",
          error: "#FF7A5C",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
} satisfies Config;