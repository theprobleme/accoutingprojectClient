<template>
    <v-app class="v-app">

        <v-navigation-drawer v-if="user.logged" app permanent expand-on-hover clipped>
            <Navbar :user= "user"/>
        </v-navigation-drawer>

        <v-app-bar app dark clipped-left color="primary">
            <Header />
        </v-app-bar>

        <v-main>
             <v-container app fluid fill-height>
                <router-view/>
            </v-container>
        </v-main>

        <v-footer app padless v-if="!user.logged">
            <Footer />
        </v-footer>
    </v-app>
</template>

<script>
import Header from "./components/Header";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import axios from "axios";

export default {
    name: "App",

    data: () => ({
        sheet: false,
        icons: ["mdi-facebook", "mdi-linkedin", "mdi-instagram"],
        user: {
            firstname: null,
            lastname: null,
            logged: false,
        },
    }),

    components: {
        Header,
        Footer,
        Navbar,
    },

    mounted: function () {
        this.$router.app.$on('test', (user) => {
            this.user = user
            this.user.logged = true
            this.$router.push({ name: "home" })
            
        })
        this.verifyToken();
    },

    methods: {
        verifyToken() {
            axios
                .get(`http://localhost:3000/api/user/token`, 
                { withCredentials: true })
                
                .then((response) => {
                    this.user = response.data;
                    this.user.logged = true;
                    this.$router.push({ name: "home" })
                    .catch(() => {

                    })
                })
                .catch(() => {
                    this.user.logged = false;
                    this.$router.push({ name: "login" })
                    .catch(() => {

                    })
                })
        },
        link(i) {
            switch (i) {
                case 0:
                    window.open("https://www.facebook.com/bde.eseo");
                    break;
                case 1:
                    window.open(
                        "https://www.linkedin.com/company/bde-eseo-angers-eseozone/",
                        "_blank"
                    );
                    break;
                case 2:
                    window.open(
                        "https://www.instagram.com/bde.eseo/?hl=fr",
                        "_blank"
                    );
                    break;
                default:
                    break;
            }
        },

        loginuser(user) {
            this.user = user
            this.user.logged = true
            this.$router.push({ name: "home" })
        }
    },
};
</script>