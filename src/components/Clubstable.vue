<template>
    <v-container class="container">
        <v-data-table :headers="headers" :items="lines" fixed-header :page.sync="page" :items-per-page="itemsPerPage" hide-default-footer class="elevation-1" @page-count="pageCount = $event">
            <template v-slot:top>
                <v-toolbar flat>
                    <v-toolbar-title> Tableau des clubs </v-toolbar-title>
                    <v-divider class="mx-4" inset vertical></v-divider>
                    <v-spacer></v-spacer>

                    <v-dialog v-model="dialog" persistent>
                        <!-- Bouton "+" d'ajout -->
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn color="primary" dark class="mx-6" v-bind="attrs" v-on="on">
                                <v-icon dark> mdi-plus </v-icon> AJOUTER UN CLUB
                            </v-btn>
                        </template>

                        <!-- Fenetre de saisie qui s'ouvre -->
                        <v-card>

                            <!-- Titre de la fenetre -->
                            <v-card-title>
                                <span class="headline">
                                    <v-icon x-large color="green"> mdi-cards </v-icon> Club
                                </span>
                            </v-card-title>

                            <!-- Contenu de la fenetre -->
                            <v-card-text>
                                <v-container>
                                    <v-row>
                                        <v-col>
                                            <v-text-field v-model="editedLine.clubname" label="Club" :rules="rules.isField" required></v-text-field>
                                        </v-col>
                                        <v-col>
                                            <v-text-field v-model="editedLine.shortname" label="Nom raccourci" :rules="rules.isField" required></v-text-field>
                                        </v-col>
                                        <v-col>
                                            <v-text-field v-model="editedLine.numaccount" label="Numéro de la banque" :rules="rules.isField" required></v-text-field>
                                        </v-col>
                                        <v-col>
                                            <v-text-field v-model="editedLine.img" label="Image"></v-text-field>
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </v-card-text>

                            <v-card-actions>
                                <v-spacer> </v-spacer>
                                <v-btn color="red darken-1" text @click="close">
                                    Annuler
                                </v-btn>
                                <v-btn color="blue darken-1" text @click="save">
                                    Sauvegarder
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>

                    <v-dialog v-model="dialogDelete" max-width="562px">
                        <v-card>
                            <v-card-title class="headline"> Voulez-vous vraiment supprimer ce club ? </v-card-title>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="red darken-1" text @click="closeDelete"> Annuler </v-btn>
                                <v-btn color="blue darken-1" text @click="deleteLineConfirm"> Valider </v-btn>
                                <v-spacer></v-spacer>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                </v-toolbar>
            </template>

            <!-- Colonne action -->
            <template v-slot:item.actions="{ item }">
                <v-icon small class="mr-2" @click="editLine(item)">
                    mdi-pencil
                </v-icon>
                <v-icon small @click="deleteLine(item)">
                    mdi-delete
                </v-icon>
            </template>
        </v-data-table> <br>

        <div class="pagination">
            <v-pagination v-model="page" :length="pageCount" :total-visible="10"> </v-pagination>
        </div>

        <v-snackbar :color="type" v-model="snackbar" :timeout="timeout">
            {{ message }}
        </v-snackbar>

    </v-container>
</template>

<script scope>
import axios from "axios";
export default {
    data() {
        return {
            headers: [
                {
                    text: "Club",
                    value: "clubname",
                    sortable: true,
                    align: "start",
                },
                { text: "Nom raccourci", value: "shortname", sortable: true },
                { text: "Prénom", value: "firstname", sortable: true },
                { text: "NOM", value: "lastname", sortable: true },
                {
                    text: "Numéro de la banque",
                    value: "numaccount",
                    sortable: true,
                },
                { text: "Image", value: "img", sortable: false },
                { text: "Actions", value: "actions", sortable: false },
            ],
            page: 1,
            pageCount: 0,
            itemsPerPage: 8,
            message: "",
            type: "",
            snackbar: false,
            timeout: 3000,
            etat: false,

            lines: [],
            dialog: false,
            dialogDelete: false,
            editedIndex: -1,

            editedLine: {
                clubname: "",
                shortname: "",
                numaccount: "",
                img: "",
                idclub: "",
            },

            rules: {
                isField: [
                    (val) => (val || "").length > 0 || "Ce champ est requis",
                ],
            },
        };
    },

    mounted: function () {
        this.getClubs();
    },

    methods: {
        getClubs() {
            axios
                .get(`http://localhost:3000/api/user/clubstable`)
                .then((response) => {
                    this.lines = response.data;
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

        createClub() {
            axios
                // Méthode
                .post(
                    // URL
                    `http://localhost:3000/api/user/clubstable`,
                    {
                        // DATA
                        clubname: this.editedLine.clubname,
                        img: this.editedLine.img,
                        shortname: this.editedLine.shortname,
                        numaccount: this.editedLine.numaccount,
                    }
                )
                .then((response) => {
                    // Ecoute de l'événement login
                    (this.message = response.data.message),
                        (this.type = response.data.type),
                        (this.snackbar = 1);
                    console.log(response);
                })
                .catch((error) => {
                    this.message = error.response.data.message;
                    this.etat = true;
                });
        },

        deleteClub() {
            axios
                .delete(`http://localhost:3000/api/user/clubstable`, {
                    headers: {
                        "Content-Type": "application/json",
                    },

                    data: {
                        clubname: this.editedLine.clubname,
                        shortname: this.editedLine.shortname,
                    }
                })
                .then((response) => {
                    this.message = response.data.message;
                    this.type = response.data.type;
                    this.snackbar = 1;
                    console.log(response);
                })
                .catch((error) => {
                    this.message = error.response.data.message;
                    this.etat = true;
                });
        },

        modifiedClub() {
            axios
                .put(`http://localhost:3000/api/user/clubstable`, {
                    clubname: this.editedLine.clubname,
                    img: this.editedLine.img,
                    shortname: this.editedLine.shortname,
                    numaccount: this.editedLine.numaccount,
                    idclub: this.editedLine.idclub,
                })
                .then((response) => {
                    (this.message = response.data.message),
                    (this.type = response.data.type),
                    (this.snackbar = 1);
                });
        },

        // Lance la fenêtre d'édition puis pour quitter lance la fonction save() qui met les data
        // dans le l'objet editedLine.
        editLine(item) {
            this.editedIndex = this.lines.indexOf(item); // Regarde l'index
            this.editedLine = Object.assign({}, item); // Prend l'objet item qui était déjà écrit et le met dans editedLine, c'est
            // comme ça qu'on repart des valeurs d'origines
            this.previousLine = this.editedLine;
            this.dialog = true; // Affiche le dialog, on peut alors soit supprimer, soit sauvegarder
            console.log(this.editedLine);
        },

        deleteLine(item) {
            this.editedIndex = this.lines.indexOf(item); // Regarde l'index
            this.editedLine = Object.assign({}, item); // Prend l'objet item qui était déjà écrit et le met dans editedLine, c'est
            // comme ça qu'on repart des valeurs d'origines
            console.log(this.editedLine);
            this.dialogDelete = true; // Affiche le dialog, on peut alors confirmer ou non
        },

        deleteLineConfirm() {
            this.lines.splice(this.editedIndex, 1); // Retire (index, nb d'éléments, élément), remplace 1 élément de l'index "editedIndex" avec rien
            this.deleteClub();
            this.closeDelete(); // Ferme la fenêtre
        },

        close() {
            this.dialog = false;
            this.$nextTick(() => {
                this.editedLine = Object.assign({}, this.defaultItem); // Rénitialise les choses
                this.editedIndex = -1;
            });
        },

        closeDelete() {
            this.dialogDelete = false;
            this.$nextTick(() => {
                this.editedLine = Object.assign({}, this.defaultItem); // Rénitialise les choses
                this.editedIndex = -1;
            });
        },

        save() {
            if (this.editedIndex > -1) {
                Object.assign(this.lines[this.editedIndex], this.editedLine); // Modification de la ligne
                this.modifiedClub();
            } else {
                this.lines.push(this.editedLine); // Ajoute la ligne éditer dans editedLine
                console.log(this.editedLine);
                this.createClub();
            }
            this.close();
        },
    },
};
</script>
