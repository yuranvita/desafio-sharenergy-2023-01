/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    fontFamily: {
      roboto: ["Roboto", "sans-serif"],
    },
    extend: {
      backgroundImage: {
        "solar-energy": "url(/src/assets/xp-solar.png)",
        "text-fill-gradient":
          "linear-gradient(89.86deg, #f20f 3.08%, #fff55d 19.94%, #43e7ad 3.57%)",
        "gradient-dark-to-transparent":
          "linear-gradient(180deg,rgba(0,0,0,0) 0%, rgba(0,0,0,1) 100%)",
      },
    },
  },
  plugins: [],
};
