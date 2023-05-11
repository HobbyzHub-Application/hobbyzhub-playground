import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import "@mdi/font/css/materialdesignicons.css";
import { aliases, mdi } from "vuetify/iconsets/mdi";

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: "mdi",
    aliases,
    sets: {
      mdi,
    },
  },
  theme: {
    defaultTheme: "customDark",
    themes: {
      customDark: {
        dark: true,
        colors: {
          background: "#282E57",
          surface: "#242733",
          primary: "#df8eff",
          secondary: "#b7f1ff",
          error: "#F73826",
          info: "#56A3CD",
          success: "#5CEB95",
          warning: "#EA7D10",
        },
      },
      customLight: {
        dark: false,
        colors: {
          background: "#EAE7F3",
          surface: "#EAE7F3",
          primary: "#069e70",
          secondary: "#b2ffdb",
          error: "#EF3966",
          info: "#97DFF2",
          success: "#0F6C48",
          warning: "#F5AA47",
        },
      },
    },
  },
});

export default vuetify;
