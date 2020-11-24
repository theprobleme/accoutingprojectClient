<template>
    <v-row align="center" justify="center" class="fill-height">
        <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
                <v-toolbar color="primary" dark flat>
                    <v-toolbar-title> Enregistrer un nouvel utilisateur </v-toolbar-title>
                    <v-spacer></v-spacer>
                </v-toolbar>

                <v-card-text>
                    <v-text-field label="NOM" name="nom" prepend-icon="mdi-account-multiple-plus" type="text" v-model="nom" id="nom"> </v-text-field>
                    <v-text-field label="Prénom" name="prenom" type="text" id="prenom" v-model="prenom"> </v-text-field>
                    <v-text-field label="Club" name="club" type="text" id="club" v-model="club" v-on:keyup.enter="ajouter"> </v-text-field>
                </v-card-text>

                <v-card-actions>
                    <v-spacer> </v-spacer>
                    <v-btn color="primary" type="submit" v-on:click="ajouter">
                        Ajouter
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-col>
    </v-row>
</template>