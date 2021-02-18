<template>
    <v-container>
        <!-- Columns start at 50% wide on mobile and bump up to 33.3% wide on desktop -->
        <!-- Carte du profil -->
        <v-row v-if="profil">
            <v-col cols="6" md="4">
                <v-card class="pa-2" outlined>
                    <v-card class="mx-auto" max-width="374" elevation="24">

                        <v-img height="250" :aspect-ratio="16/9" :src="require(`../assets/logosClubs/${profil.img}`)"></v-img>

                        <v-card-title> {{ profil.firstname + " " + profil.lastname}} </v-card-title>

                        <v-card-text>
                            <div class="my-4 subtitle-1">
                                <v-icon> mdi-email </v-icon> : {{ profil.email }} <br>
                                <v-icon> mdi-phone </v-icon> : {{ profil.phone }} <br>
                                <v-icon> mdi-alpha-c-circle </v-icon> : {{ profil.clubname }} <br>
                                <v-icon> mdi-assistant </v-icon> : {{ profil.position }} <br>
                            </div>

                        </v-card-text>
                    </v-card>
                </v-card>
            </v-col>

            <!-- Début de la zone des options -->
            <v-col v-if="isAdmin" cols="8" md="8" outlined>
                <v-card>
                    <v-toolbar color="indigo darken-1" flat>
                        <template v-slot:extension>
                            <v-tabs v-model="tabs" centered color="white" dark>
                                <v-tab v-for="title in adminTitles" :key="title">
                                    {{ title }}
                                </v-tab>
                            </v-tabs>
                        </template>
                    </v-toolbar>

                    <v-tabs-items v-model="tabs">
                        <!-- SONDAGE -->
                        <v-tab-item>
                            <v-card flat>
                                <v-card-title class="headline">
                                    Modifier le sondage
                                </v-card-title>
                                <v-card-text>
                                    <v-text-field label="Lien du sondage" name="linkForm" prepend-icon="mdi-vector-link" type="text" v-model="linkForm"> </v-text-field>
                                </v-card-text>
                                <v-card-actions>

                                    <v-spacer> </v-spacer>

                                    <v-btn class="ma-2" color="primary" type="submit" v-on:click="createForm">
                                        Sauvegarder
                                    </v-btn>

                                    <v-dialog v-model="dialogDelete" persistent max-width="600">
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-btn class="ma-2" color="error" dark v-bind="attrs" v-on="on">
                                                Supprimer
                                            </v-btn>
                                        </template>
                                        <v-card>
                                            <v-card-title class="headline">
                                                Etes-vous sûre de vouloir supprimer cet élément ?
                                            </v-card-title>
                                            <v-card-text> Cette action est irréversible </v-card-text>
                                            <v-card-actions>
                                                <v-spacer></v-spacer>
                                                <v-btn color="green darken-1" type="submit" text v-on:click="deleteForm">
                                                    Supprimer
                                                </v-btn>
                                                <v-btn color="green darken-1" text @click="dialogDelete = false">
                                                    Annuler
                                                </v-btn>
                                            </v-card-actions>
                                        </v-card>
                                    </v-dialog>
                                </v-card-actions>
                            </v-card>
                        </v-tab-item>

                        <!-- ONEDRIVE -->
                        <v-tab-item>
                            <v-card flat>
                                <v-card-title class="headline">
                                    Modifier le drive
                                </v-card-title>
                                <v-card-text>
                                    <v-text-field label="Lien du drive" name="linkDrive" prepend-icon="mdi-vector-link" type="text" v-model="linkDrive"> </v-text-field>
                                </v-card-text>
                                <v-card-actions>

                                    <v-spacer> </v-spacer>

                                    <v-btn class="ma-2" color="primary" type="submit" v-on:click="createDrive">
                                        Sauvegarder
                                    </v-btn>

                                    <v-dialog v-model="dialogDelete" persistent max-width="600">
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-btn class="ma-2" color="error" dark v-bind="attrs" v-on="on">
                                                Supprimer
                                            </v-btn>
                                        </template>
                                        <v-card>
                                            <v-card-title class="headline">
                                                Etes-vous sûre de vouloir supprimer cet élément ?
                                            </v-card-title>
                                            <v-card-text> Cette action est irréversible </v-card-text>
                                            <v-card-actions>
                                                <v-spacer></v-spacer>
                                                <v-btn color="green darken-1" type="submit" text v-on:click="deleteDrive">
                                                    Supprimer
                                                </v-btn>
                                                <v-btn color="green darken-1" text @click="dialogDelete = false">
                                                    Annuler
                                                </v-btn>
                                            </v-card-actions>
                                        </v-card>
                                    </v-dialog>
                                </v-card-actions>
                            </v-card>
                        </v-tab-item>

                        <!-- COURS -->
                        <v-tab-item>
                            <v-card flat>
                                <v-card-title class="headline">
                                    Modifier le cours
                                </v-card-title>
                                <v-card-text>
                                    <v-text-field label="Lien du cours" name="linkCourses" prepend-icon="mdi-vector-link" type="text" v-model="linkCourses"> </v-text-field>
                                </v-card-text>
                                <v-card-actions>

                                    <v-spacer> </v-spacer>

                                    <v-btn class="ma-2" color="primary" type="submit" v-on:click="createCourses">
                                        Sauvegarder
                                    </v-btn>

                                    <v-dialog v-model="dialogDelete" persistent max-width="600">
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-btn class="ma-2" color="error" dark v-bind="attrs" v-on="on">
                                                Supprimer
                                            </v-btn>
                                        </template>
                                        <v-card>
                                            <v-card-title class="headline">
                                                Etes-vous sûre de vouloir supprimer cet élément ?
                                            </v-card-title>
                                            <v-card-text> Cette action est irréversible </v-card-text>
                                            <v-card-actions>
                                                <v-spacer></v-spacer>
                                                <v-btn color="green darken-1" type="submit" text v-on:click="deleteCourses">
                                                    Supprimer
                                                </v-btn>
                                                <v-btn color="green darken-1" text @click="dialogDelete = false">
                                                    Annuler
                                                </v-btn>
                                            </v-card-actions>
                                        </v-card>
                                    </v-dialog>

                                </v-card-actions>
                            </v-card>
                        </v-tab-item>

                        <!-- PLAN COMPTABLE -->
                        <v-tab-item>
                            <v-card flat>
                                <v-card-title class="headline">
                                    Modifier le plan comptable
                                </v-card-title>

                                <v-card-text>
                                    <v-card-title>
                                        Ajouter un compte
                                    </v-card-title>
                                    <v-row>
                                        <v-col cols="12" md="4">
                                            <v-text-field autocomplete="off" v-model="numAccount" name="numAccount" :rules="numRules" :counter="4" label="Numéro" required></v-text-field>
                                        </v-col>

                                        <v-col cols="12" md="4">
                                            <v-text-field autocomplete="off" v-model="nameAccount" name="nameAccount" label="Libellé" required></v-text-field>
                                        </v-col>

                                        <v-col cols="12" md="4">
                                            <v-btn class="ma-2" color="primary" type="submit" v-on:click="createAccountchart">
                                                Ajouter
                                            </v-btn>
                                        </v-col>
                                    </v-row>

                                    <!--  :items="intitules"-->
                                    <!-- :items="((line, index) in lines)" -->
                                    <!-- :key="index" -->
                                    <!-- :items="lines[0].name" -->
                                    <v-card-title>
                                        Supprimer un compte
                                    </v-card-title>
                                    <v-row>
                                        <v-col cols="12" md="4">
                                            <v-autocomplete autocomplete="off" name="numAccountDelete" clearable v-model="numAccountDelete" :items="numsFiltered" label="Numéro"> </v-autocomplete>
                                        </v-col>

                                        <v-col cols="12" md="4">
                                            <v-autocomplete autocomplete="off" name="nameAccountDelete" clearable v-model="nameAccountDelete" :items="namesFiltered" label="Libellé"> </v-autocomplete>
                                        </v-col>

                                        <v-col cols="12" md="4">
                                            <v-btn class="ma-2" color="error" type="submit" v-on:click="deleteAccountchart">
                                                Supprimer
                                            </v-btn>
                                        </v-col>
                                    </v-row>
                                </v-card-text>
                            </v-card>
                        </v-tab-item>

                        <!-- Analytiques -->
                        <v-tab-item>
                            <v-card flat>
                                <v-card-title class="headline">
                                    Modifier les analytiques
                                </v-card-title>

                                <v-card-text>
                                    <v-card-title>
                                        Ajouter une analytique
                                    </v-card-title>
                                    <v-row>
                                        <v-col cols="12" md="4">
                                            <v-text-field autocomplete="off" v-model="numAnalytic" name="numAnalytic" :rules="numRules" :counter="4" label="Numéro" required></v-text-field>
                                        </v-col>

                                        <v-col cols="12" md="4">
                                            <v-text-field autocomplete="off" v-model="nameAnalytic" name="nameAnalytic" label="Libellé" required></v-text-field>
                                        </v-col>

                                        <v-col cols="12" md="4">
                                            <v-btn class="ma-2" color="primary" type="submit" v-on:click="createAnalytic">
                                                Ajouter
                                            </v-btn>
                                        </v-col>
                                    </v-row>

                                    <!--  :items="intitules"-->
                                    <!-- :items="((line, index) in lines)" -->
                                    <!-- :key="index" -->
                                    <!-- :items="lines[0].name" -->
                                    <v-card-title>
                                        Supprimer une analytique
                                    </v-card-title>
                                    <v-row>
                                        <v-col cols="12" md="4">
                                            <v-autocomplete autocomplete="off" name="numAnalyticDelete" clearable v-model="numAnalyticDelete" :items="numsAnalyticFiltered" label="Numéro"> </v-autocomplete>
                                        </v-col>

                                        <v-col cols="12" md="4">
                                            <v-autocomplete autocomplete="off" name="nameAnalyticDelete" clearable v-model="nameAnalyticDelete" :items="namesAnalyticFiltered" label="Libellé"> </v-autocomplete>
                                        </v-col>

                                        <v-col cols="12" md="4">
                                            <v-btn class="ma-2" color="error" type="submit" v-on:click="deleteAnalytic">
                                                Supprimer
                                            </v-btn>
                                        </v-col>
                                    </v-row>
                                </v-card-text>
                            </v-card>
                        </v-tab-item>

                        <!-- UTILISATEUR ET CLUBS -->
                        <v-tab-item>
                            <v-row align="center">
                                <v-col cols="6" md="6" align="center">
                                    <v-card class="pa-2" outlined tile>
                                        <v-card flat justify-center>
                                            <v-card-title class="headline">
                                                Gestion des clubs
                                            </v-card-title>
                                            <v-btn x-large color="success" dark to="/clubstable">
                                                Tableau des clubs
                                            </v-btn>
                                        </v-card>
                                    </v-card>
                                </v-col>
                                <v-col cols="6" md="6" align="center" align->
                                    <v-card class="pa-2" outlined tile>
                                        <v-card flat justify-center>
                                            <v-card-title class="headline">
                                                Gestion des utilisateurs
                                            </v-card-title>
                                            <v-btn x-large color="success" dark to="/userstable">
                                                Tableau des utilisateurs
                                            </v-btn>
                                        </v-card>
                                    </v-card>
                                </v-col>
                                <v-col cols="6" md="6" align="center">
                                    <v-card class="pa-2" outlined tile>
                                        <v-card flat justify-center>
                                            <v-card-title class="headline">
                                                Gestion des accès
                                            </v-card-title>
                                            <v-btn x-large color="success" dark to="/accesstable">
                                                Tableau des accès
                                            </v-btn>
                                        </v-card>
                                    </v-card>
                                </v-col>
                                <v-col cols="6" md="6" align="center" align->
                                    <v-card class="pa-2" outlined tile>
                                        <v-card flat justify-center>
                                            <v-card-title class="headline">
                                                Gestion des référents
                                            </v-card-title>
                                            <v-btn x-large color="success" dark to="/referentstable">
                                                Tableau des référents
                                            </v-btn>
                                        </v-card>
                                    </v-card>
                                </v-col>
                            </v-row>
                        </v-tab-item>

                        <v-snackbar :color="type" v-model="snackbar" :timeout="timeout">
                            {{ message }}
                        </v-snackbar>
                    </v-tabs-items>
                </v-card>
            </v-col>
        </v-row>

        <v-col v-else cols="8" md="8" outlined>
            <h1>
                HELLOO
            </h1>
        </v-col>
    </v-container>
</template>

<script>
import axios from "axios";
export default {
    data() {
        return {
            profil: null,
            dialog: false,
            tabs: null,
            adminTitles: [
                "Sondage",
                "OneDrive",
                "Cours",
                "Plan comptable",
                "Analytiques",
                "Clubs et Utilisateurs",
                "Thème",
            ],
            // userTitles: [
            //     "Téléphone",
            //     "Thème",
            // ],
            message: "",
            type: "",
            snackbar: false,
            timeout: 3000,
            linkForm: null,
            linkDrive: null,
            linkCourses: null,
            dialogDelete: false,
                        
            numRules: [
                (v) => !!v || "Champ requis",
                (v) =>
                    v.length <= 4 ||
                    "Le numéro ne peut pas dépasser 4 chiffres ",
            ],
            lines: [],
            linesAnalytic: [],

            nameAccountDelete: "",
            numAccountDelete: "",
            numAccount: "",
            nameAccount: "",
            namesFiltered: null,
            numsFiltered: null,

            nameAnalyticDelete: "",
            numAnalyticDelete: "",
            numAnalytic: "",
            nameAnalytic: "",
            namesAnalyticFiltered: null,
            numsAnalyticFiltered: null,
        };
    },

    mounted: function () {
        this.getProfil();
        this.getAccountchart();
        this.getAnalytic();
    },

    methods: {
        getProfil() {
            axios
                .get(`http://localhost:3000/api/user/profil`, {
                    withCredentials: true,
                })
                .then((response) => {
                    this.profil = response.data;
                })
                .catch((error) => {
                    switch (error.response.status) {
                        case 403:
                            this.$router.push({ name: "login" });
                            break;

                        default:
                            break;
                    }
                });
        },

        createForm() {
            axios
                .put(
                    `http://localhost:3000/api/user/form`,
                    { link: this.linkForm },
                    { withCredentials: true }
                )
                .then((response) => {
                    (this.message = response.data.message),
                        (this.type = response.data.type),
                        (this.snackbar = 1);
                });
        },

        deleteForm() {
            axios
                .delete(`http://localhost:3000/api/user/form`, {
                    withCredentials: true,
                })
                .then((response) => {
                    (this.message = response.data.message),
                        (this.type = response.data.type),
                        (this.snackbar = 1),
                        (this.linkForm = null),
                        (this.dialogDelete = false);
                });
        },

        // DRIVE DRIVE DRIVE DRIVE DRIVE DRIVE DRIVE DRIVE DRIVE
        createDrive() {
            axios
                .put(
                    `http://localhost:3000/api/user/drive`,
                    { link: this.linkDrive },
                    { withCredentials: true }
                )
                .then((response) => {
                    (this.message = response.data.message),
                        (this.type = response.data.type),
                        (this.snackbar = 1);
                });
        },

        deleteDrive() {
            axios
                .delete(`http://localhost:3000/api/user/drive`, {
                    withCredentials: true,
                })
                .then((response) => {
                    (this.message = response.data.message),
                        (this.type = response.data.type),
                        (this.snackbar = 1),
                        this.linkDrive,
                        this.dialogDelete;
                });
        },

        // COURS COURS COURS COURS COURS COURS COURS COURS COURS COURS
        createCourses() {
            axios
                .put(
                    `http://localhost:3000/api/user/courses`,
                    { link: this.linkCourses },
                    { withCredentials: true }
                )
                .then((response) => {
                    (this.message = response.data.message),
                        (this.type = response.data.type),
                        (this.snackbar = 1);
                });
        },

        deleteCourses() {
            axios
                .delete(`http://localhost:3000/api/user/courses`, {
                    withCredentials: true,
                })
                .then((response) => {
                    (this.message = response.data.message),
                        (this.type = response.data.type),
                        (this.snackbar = 1),
                        (this.linkCourses = null),
                        (this.dialogDelete = false);
                });
        },

        createAccountchart() {
            axios
                .post(`http://localhost:3000/api/user/accountchart`, {
                    withCredentials: true,
                })
                .then((response) => {
                    this.message = response.data.message;
                    this.type = response.data.type;
                    this.snackbar = 1;
                });
        },

        getAccountchart() {
            axios
                .get(`http://localhost:3000/api/user/accountchart`, {
                    withCredentials: true,
                })
                .then((response) => {
                    this.lines = response.data;

                    this.numsFiltered = this.lines.map((line) => {
                        return line.num;
                    });

                    this.namesFiltered = this.lines.map((line) => {
                        return line.name;
                    });
                });
        },

        deleteAccountchart() {
            axios
                .delete(`http://localhost:3000/api/user/accountchart`, {
                    headers: {
                        "Content-Type": "application/json",
                    },

                    data: {
                        numAccountDelete: this.numAccountDelete,
                        nameAccountDelete: this.nameAccountDelete,
                    },
                    withCredentials: true,
                })
                .then((response) => {
                    this.message = response.data.message;
                    this.type = response.data.type;
                    this.snackbar = 1;
                    let index = this.numsFiltered.findIndex(
                        (line) => line === this.numAccountDelete
                    );
                    if (index > -1) {
                        console.log(index);
                        this.numsFiltered.splice(index, 1);
                        this.namesFiltered.splice(index, 1);
                    }
                });
        },
    

        createAnalytic() {
            axios
                .post(`http://localhost:3000/api/user/analytictable`, {
                    withCredentials: true,
                })
                .then((response) => {
                    this.message = response.data.message;
                    this.type = response.data.type;
                    this.snackbar = 1;
                });
        },

        getAnalytic() {
            axios
                .get(`http://localhost:3000/api/user/analytictable`, {
                    withCredentials: true,
                })
                .then((response) => {
                    this.linesAnalytic = response.data;
                    console.log(response.data)

                    this.numsAnalyticFiltered = this.linesAnalytic.map((line) => {
                        return line.num;
                    });

                    this.namesAnalyticFiltered = this.linesAnalytic.map((line) => {
                        return line.name;
                    });
                });
        },

        deleteAnalytic() {
            axios
                .delete(`http://localhost:3000/api/user/analytictable`, {
                    headers: {
                        "Content-Type": "application/json",
                    },

                    data: {
                        numAnalyticDelete: this.numAnalyticDelete,
                        nameAnalyticDelete: this.nameAnalyticDelete,
                    },
                    withCredentials: true,
                })
                .then((response) => {
                    this.message = response.data.message;
                    this.type = response.data.type;
                    this.snackbar = 1;
                    let index = this.numsAnalyticFiltered.findIndex(
                        (line) => line === this.numAnalyticDelete
                    );
                    if (index > -1) {
                        console.log(index);
                        this.numsAnalyticFiltered.splice(index, 1);
                        this.namesAnalyticFiltered.splice(index, 1);
                    }
                });
        },
    },

    computed: {
        isAdmin() {
            if (this.profil.position === "ADMIN") {
                return true;
            } else {
                return false;
            }
        },
    },

    watch: {
        lines() {},
    },
};
</script>