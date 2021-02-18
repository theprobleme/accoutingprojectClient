<template>
    <div class="ma-0 pa-0">
        <v-list>
            <v-list-item>
                <v-list-item-content>
                    <v-list-item-title class="title"> {{ user.firstname + " " + user.lastname}} </v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list nav dense shaped>

            <!-- Home -->
            <v-list-item to="/home">
                <v-list-item-icon>
                    <v-icon dark color="blue darken-4"> mdi-home </v-icon>
                </v-list-item-icon>
                <v-list-item-title> Accueil </v-list-item-title>
            </v-list-item>

            <!-- Profil -->
            <v-list-item to="/profil">
                <v-list-item-icon>
                    <v-icon> mdi-account </v-icon>
                </v-list-item-icon>
                <v-list-item-title> Profil </v-list-item-title>

            </v-list-item>

            <!-- Bilan -->
            <v-list-item to="/bilan">
                <v-list-item-icon>
                    <v-icon> mdi-alpha-b-circle </v-icon>
                </v-list-item-icon>
                <v-list-item-title> Bilan </v-list-item-title>
            </v-list-item>

            <!-- Compte de résultat -->
            <v-list-item to="/resultaccount">
                <v-list-item-icon>
                    <v-icon> mdi-alpha-c-circle </v-icon>
                </v-list-item-icon>
                <v-list-item-title> Compte de résultat </v-list-item-title>
            </v-list-item>

            <!-- Document de cours -->
            <v-list-item to="/courses">
                <v-list-item-icon>
                    <v-icon> mdi-school </v-icon>
                </v-list-item-icon>
                <v-list-item-title> Cours </v-list-item-title>
            </v-list-item>

            <!-- Plan comptable -->
            <v-list-item to="/accountchart">
                <v-list-item-icon>
                    <v-icon> mdi-format-list-bulleted </v-icon>
                </v-list-item-icon>
                <v-list-item-title> Plan comptable </v-list-item-title>
            </v-list-item>

             <!-- Plan des analytiques -->
            <v-list-item to="/analytictable">
                <v-list-item-icon>
                    <v-icon> mdi-table </v-icon>
                </v-list-item-icon>
                <v-list-item-title> Analytiques </v-list-item-title>
            </v-list-item>

            <!-- Cloud -->
            <v-list-item :href="linkDrive" target="_blank">
                <!-- src="https://1drv.ms/u/s!Ap-nRrwasEiscIg36RfIXUz3nDc?e=CPcXUb"  -->
                <v-list-item-icon>
                    <v-icon> mdi-cloud </v-icon>
                </v-list-item-icon>
                <v-list-item-title> Drive des clubs </v-list-item-title>
            </v-list-item>

            <!-- Sondage -->
            <v-list-item to="/form">
                <v-list-item-icon>
                    <v-badge :content="messages" :value="messages" color="green">
                        <v-icon> mdi-poll </v-icon>
                    </v-badge>
                </v-list-item-icon>
                <v-list-item-title> Sondage </v-list-item-title>
            </v-list-item>

            <!-- Document de cours -->
            <v-list-item to="/contacts">
                <v-list-item-icon>
                    <v-icon dark color="green darken-4"> mdi-card-account-phone-outline </v-icon>
                </v-list-item-icon>
                <v-list-item-title> Contacts </v-list-item-title>
            </v-list-item>
        </v-list>

        <v-divider></v-divider>

        <div class="fixed-bottom">
            <v-list-item class="fixed-bottom">
                <v-list-item-icon>
                    <v-icon dark color="red darken-4"> mdi-backspace-reverse </v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                    <v-btn color="red darken-4" dark justify-center>
                        Déconnexion
                    </v-btn>
                </v-list-item-content>
            </v-list-item>
        </div>
    </div>
</template>

<script>
import axios from "axios";
export default {
    props: {
        user: Object,
    },

    data() {
        return {
            messages: 0,
            show: false,
            linkDrive: null,
        };
    },

    mounted: function () {
        this.getDrive();
    },

    methods: {
        date() {
            var now = new Date();
            return (
                now.getDate() +
                "/" +
                (now.getMonth() + 1) +
                "/" +
                now.getFullYear()
            );
        },

        getDrive() {
            axios
                .get(`http://localhost:3000/api/user/drive`, {
                    withCredentials: true,
                })
                .then((response) => {
                    this.linkDrive = response.data[0].link;
                })
                .catch((error) => {
                    console.log(error);
                });
        },
    },
};
</script>
