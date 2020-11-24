<template>
    <v-card flat tile dark class="indigo darken-3 white--text text-center" width=100%>
        <v-card-text>
            <v-btn rounded v-for="(icon,i) in icons" :key="icon" class="mx-8 white--text" color="indigo darken-3" v-on:click="link(i)">
                <v-icon size="30px"> {{ icon }} </v-icon>
            </v-btn>
        </v-card-text>
        <v-card-text>
            Mandat {{ new Date().getFullYear() }} à {{ new Date().getFullYear() + 1 }} — <strong> BDE ESEOZONE </strong>
        </v-card-text>
    </v-card>
</template>

<script>
export default {
  watch: {
  },
    // Attribue les liens http des différences icônes
    methods: {
        link(i) {
            switch (i) {
                case 0:
                    window.open("https://www.facebook.com/bde.eseo");
                    break;
                case 1:
                    window.open(
                        "https://www.linkedin.com/company/bde-eseo-angers-eseozone/");
                    break;
                case 2:
                    window.open(
                        "https://www.instagram.com/bde.eseo/?hl=fr");
                    break;
                default:
                    break;
            }
        },
    },

    // Icones récupérées via Vuetify
    data: () => ({
        icons: ["mdi-facebook", "mdi-linkedin", "mdi-instagram"],
    }),
};
</script>

<style scoped>

</style>
