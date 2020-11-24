import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
          light: {
            primary: colors.indigo.darken2,
            secondary: colors.red.darken4,
            accent: colors.teal.darken1,
            error: colors.yellow.darken4,
          },
          dark: {
            primary: colors.blue.lighten3,
          },
        }
    }
});