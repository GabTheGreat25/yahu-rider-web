module.exports = {
  prefix: "tw-",
  important: true,
  mode: "aot",
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#FF7733",
          dark: "#108043",
          neutral: {
            DEFAULT: "#8D9DAE",
            dark: "#516579",
            base: "#CCD5DE",
            accent: "#F4F6F8",
          },
          tint: {
            DEFAULT: "#86CB8F",
            dark: "#4DC15F",
            base: "#62CC74",
            accent: "#76D889",
            light: "#8AE39E",
          },
        },
        secondary: {
          DEFAULT: "#FBB040",
          dark: "#DAB038",
          neutral: {
            DEFAULT: "#425263",
            dark: "#333F4D",
            base: "#425263",
            accent: "#ADB9C6",
          },
          tint: {
            DEFAULT: "#FBBA59",
            dark: "#FBB040",
            base: "#FBC472",
            accent: "#FAD8A5",
            light: "#FAE2BE",
          },
        },
        dark: {
          DEFAULT: "#212B36",
        },
        gray: {
          DEFAULT: "#5E738A",
        },
      },
    },
  },
  plugins: [],
};
