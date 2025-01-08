import type { Config } from "tailwindcss";
const withMT = require("@material-tailwind/react/utils/withMT");

const config: Config = withMT({
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        notoRegular: ["noto-regular"], // Use your font name
        notoCondensed: ["noto-condensed"], // Use your font name
        notoSemibold: ["noto-semibold"], // Use your font name
      },
    },
  },
  plugins: [],
});

export default config;
