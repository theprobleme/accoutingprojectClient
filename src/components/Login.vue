<template>
    <v-row align="center" justify="center" class="fill-height">
        <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
                <v-toolbar color="primary" dark flat>
                    <v-toolbar-title> Bienvenue </v-toolbar-title>
                    <v-spacer></v-spacer>
                </v-toolbar>

                <!-- Zones de saisie -->
                <v-card-text>
                    <v-text-field label="Identifiant" name="email" prepend-icon="mdi-account" type="text" v-model="email"> </v-text-field>
                    <v-text-field label="Mot de passe" name="password" prepend-icon="mdi-lock" type="password" id="motDePasse" v-model="password" v-on:keyup.enter="connexion"> </v-text-field>
                </v-card-text>

                <!-- Bouton de connexion -->
                <v-card-actions>
                    <v-spacer> </v-spacer>
                    <v-btn color="primary" type="submit" v-on:click="connexion">
                        Connexion
                    </v-btn>
                </v-card-actions>
            </v-card>

            <!-- Gestion de l'apparition du message d'erreur -->
            <v-alert v-if="etat" color="red" type="error">
                {{ message }}
            </v-alert>
        </v-col>
    </v-row>
</template>

<script>
import axios from "axios";

export default {

    // Données et variables de la page Login
    data: () => ({
        email: null,
        password: null,
        message: null,
        etat: false,
    }),

    methods: {
        connexion() {
            axios
                // Méthode
                .post(
                    // URL
                    `http://localhost:3000/api/user/login`,
                    {
                        // DATA
                        email: this.email,
                        password: this.password,
                    },
                    { withCredentials: true }
                )
                .then((response) => {
                    // Ecoute de l'événement login
                    this.$router.app.$emit('test', response.data)
                    
                })
                .catch((error) => {
                    this.message = error.response.data.message;
                    this.etat = true;
                    
                });
        },
    },
};

</script>

<style scoped>
    /* Style CSS */
</style>

