<template>
    <v-container>
        <v-data-table :headers="headers" :items="lines" fixed-header :page.sync="page" :items-per-page="itemsPerPage" hide-default-footer class="elevation-1" @page-count="pageCount = $event">
            <template v-slot:top>
                <v-toolbar flat>
                    <v-toolbar-title> Tableau des utilisateurs </v-toolbar-title>
                    <v-divider class="mx-4" inset vertical></v-divider>
                    <v-spacer></v-spacer>

                    <v-dialog v-model="dialog" persistent>
                        <!-- Bouton "+" d'ajout -->
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn color="primary" dark class="mx-6" v-bind="attrs" v-on="on">
                                <v-icon dark> mdi-plus </v-icon> AJOUTER UN UTILISATEUR
                            </v-btn>
                        </template>

                        <!-- Fenetre de saisie qui s'ouvre -->
                        <v-card>

                            <!-- Titre de la fenetre -->
                            <v-card-title>
                                <span class="headline"> <v-icon x-large color="green"> mdi-account </v-icon> Utilisateur </span>
                            </v-card-title>

                            <!-- Contenu de la fenetre -->
                            <v-card-text>
                                <v-container>
                                    <v-row>
                                        <v-col>
                                            <v-text-field v-model="editedLine.firstname" label="Prénom" :rules="rules.isField" required></v-text-field>
                                        </v-col>
                                        <v-col>
                                            <v-text-field v-model="editedLine.lastname" label="NOM" :rules="rules.isField" required></v-text-field>
                                        </v-col>
                                        <v-col>
                                            <v-text-field v-model="editedLine.email" label="Mail" :rules="rules.isField" required></v-text-field>
                                        </v-col>
                                        <v-col>
                                            <v-text-field v-model="editedLine.password" label="Mot de passe" type="password" :rules="rules.isField" required></v-text-field>
                                        </v-col>
                                        <v-col>
                                            <v-text-field v-model="editedLine.phone" label="Numéro de téléphone"></v-text-field>
                                        </v-col>
                                        <v-col>
                                            <v-autocomplete v-model="editedLine.position" label="Position" :items="position" :rules="rules.isField" required></v-autocomplete>
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
                            <v-card-title class="headline"> Voulez-vous vraiment supprimer cet utilisateur ?</v-card-title>
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
        <v-spacer></v-spacer>
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
                    text: "Prénom",
                    value: "firstname",
                    align: "start",
                    sortable: true,
                },
                {
                    text: "NOM",
                    value: "lastname",
                    sortable: true,

                },
                {
                    text: "Mail",
                    value: "email",
                    sortable: false,
                },
                {
                    text: "Numéro de téléphone",
                    value: "phone",
                    sortable: false,
                },
                {
                    text: "Position",
                    value: "position",
                    sortable: true,
                },
                {
                    text: "Référent club",
                    value: "clubname",
                    sortable: true,
                },
                { text: "Action", value: "actions", sortable: false },
            ],

            page: 1,
            pageCount: 0,
            itemsPerPage: 8,

            lines: [],
            dialog: false,
            editedIndex: -1,
            dialogDelete: false,

            message: "",
            type: "",
            snackbar: false,
            timeout: 3000,
            etat: false,

            editedLine: {
                firstname: "",
                lastname: "",
                email: "",
                password: "",
                phone: "",
                position: "",
                clubname: "",
                iduser: "",
            },

            position: ['ADMIN', 'USER'],

            rules: {
                isField: [val => (val || '').length > 0 || 'Ce champ est requis'],
            }
        };
    },

    mounted: function () {
        this.getClubs();
    },

    methods: {
        getClubs() {
            axios
                .get(`http://localhost:3000/api/user/userstable`, {
                    withCredentials: true,
                })
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

        createUser() {
            axios
                // Méthode
                .post(
                    // URL
                    `http://localhost:3000/api/user/userstable`,
                    {
                        // DATA
                        firstname : this.editedLine.firstname,
                        lastname: this.editedLine.lastname,
                        email: this.editedLine.email,
                        password: this.editedLine.password,
                        phone: this.editedLine.phone,
                        position: this.editedLine.position,
                    },
                    { withCredentials: true }
                )
                .then((response) => {
                    // Ecoute de l'événement login
                    this.message = response.data.message,
                    this.type = response.data.type,
                    this.snackbar = 1;
                    console.log(response)
                })
                .catch((error) => {
                    this.message = error.response.data.message;
                    this.etat = true;
                });
        },

        deleteUser() {
           axios
                .delete(`http://localhost:3000/api/user/userstable`, {
                    headers: {
                        "Content-Type": "application/json",
                    },

                    data: {
                        iduser: this.editedLine.iduser,
                        firstname: this.editedLine.firstname,
                        lastname: this.editedLine.lastname,
                        email: this.editedLine.lastname,
                    },
                    withCredentials: true,
                })
                .then((response) => {
                    this.message = response.data.message;
                    this.type = response.data.type;
                    this.snackbar = 1;
                    console.log(response)
                })
                .catch((error) => {
                    this.message = error.response.data.message;
                    this.etat = true;
                });
        },

        modifiedUser() {
            axios
                .put(
                    `http://localhost:3000/api/user/userstable`,
                    { 
                        iduser: this.editedLine.iduser,
                        firstname: this.editedLine.firstname,
                        lastname: this.editedLine.lastname,
                        email: this.editedLine.email,
                        password: this.editedLine.password,
                        phone: this.editedLine.phone,
                        position: this.editedLine.position,
                    },
                    { withCredentials: true },                    
                )
                .then((response) => {
                    (this.message = response.data.message),
                        (this.type = response.data.type),
                        (this.snackbar = 1);
                });
        },

        editLine(item) {
            this.editedIndex = this.lines.indexOf(item);
            this.editedLine = Object.assign({}, item);
            this.dialog = true;
        },

        deleteLine(item) {
            this.editedIndex = this.lines.indexOf(item);
            this.editedLine = Object.assign({}, item);
            console.log(this.editedLine) //OK ICI il y a bien iduser 
            this.dialogDelete = true;
        },

        deleteLineConfirm() {
            this.lines.splice(this.editedIndex, 1);
            this.deleteUser();
            this.closeDelete();
        },

        close() {
            this.dialog = false;
            this.$nextTick(() => {
                this.editedLine = Object.assign({}, this.defaultItem);
                this.editedIndex = -1;
            });
        },

        closeDelete() {
            this.dialogDelete = false;
            this.$nextTick(() => {
                this.editedLine = Object.assign({}, this.defaultItem);
                this.editedIndex = -1;
            });
        },

        save() {
            if (this.editedIndex > -1) {
                Object.assign(this.lines[this.editedIndex], this.editedLine);
                this.modifiedUser();
            } else {
                this.lines.push(this.editedLine);
                this.createUser()
            }
            this.close();
        },
    },
};
</script>
