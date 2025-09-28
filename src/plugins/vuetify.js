import Vue from "vue";
import Vuetify from "vuetify/lib/framework";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: "#0D0D0D", // Preto / Grafite Escuro
        secondary: "#97938eff", // Cinza Metálico / Prata Escuro
      },
      dark: {
        primary: "#97938eff",
        secondary: "#0D0D0D",
      },
    },
    dark: false, // Altere para true se quiser ativar o tema escuro por padrão
  },
});
