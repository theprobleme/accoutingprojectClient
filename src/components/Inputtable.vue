<template>
    <v-container class="container">
        <v-data-table :headers="headers" :items="lines" sort-by="piece" class="elevation-1">
            <template v-slot:top>
                <v-toolbar flat>
                    <v-toolbar-title> Ecritures comptables</v-toolbar-title>
                    <v-divider class="mx-4" inset vertical></v-divider>
                    <v-spacer></v-spacer>

                    <v-dialog v-model="dialog">
                        <!-- Bouton "+" d'ajout -->
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn color="primary" dark class="mx-6" v-bind="attrs" v-on="on">
                                <v-icon dark> mdi-plus </v-icon> NOUVELLE SAISIE
                            </v-btn>
                        </template>

                        <!-- Fenetre de saisie qui s'ouvre -->
                        <v-card>

                            <!-- Titre de la fenetre -->
                            <v-card-title>
                                <span class="headline"> Nouvelle écriture </span>
                            </v-card-title>

                            <!-- Contenu de la fenetre -->
                            <v-card-text>
                                <v-container>
                                    <v-row>
                                        <v-col>
                                            <v-text-field v-model="editedLine.entryjournal" label="Code Journal"> </v-text-field>
                                        </v-col>
                                        <v-col>
                                            <v-text-field v-model="editedLine.piece" label="Pièce"> </v-text-field>
                                        </v-col>
                                        <v-col>
                                            <v-text-field v-model="editedLine.date" label="Date"> </v-text-field>
                                        </v-col>
                                        <v-col>
                                            <v-autocomplete clearable v-model="editedLine.accountnumber" :items="comptes" label="N° du compte"> </v-autocomplete>
                                        </v-col>
                                        <v-col>
                                            <v-autocomplete v-model="editedLine.accountintitule" :items="intitules" label="Intitulé du compte"> </v-autocomplete>
                                        </v-col>

                                        <v-col>
                                            <v-text-field v-model="editedLine.libelle" label="Libellé"> </v-text-field>
                                        </v-col>

                                        <v-col>
                                            <v-text-field v-model="editedLine.debit" label="Débit" prefix="€"> </v-text-field>
                                        </v-col>

                                        <v-col>
                                            <v-text-field v-model="editedLine.credit" label="Crédit" prefix="€"> </v-text-field>
                                        </v-col>
                                    </v-row>

                                </v-container>
                            </v-card-text>

                            <!-- Zone pour annulation ou sauvegarde -->
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="red darken-1" text @click="close">
                                    Annuler
                                </v-btn>
                                <v-btn color="blue darken-1" text @click="save">
                                    Sauvegarder
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>

                    <!-- Zone pour la validation de la suppression d'une écriture -->
                    <v-dialog v-model="dialogDelete" max-width="562px">
                        <v-card>
                            <v-card-title class="headline"> Voulez-vous vraiment supprimer cette écriture ?</v-card-title>
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

            <!-- Si il n'y a pas de données il y a un bouton Reset -->
            <template v-slot:no-data>
                Il n'y a pas d'écriture
            </template>
        </v-data-table>
    </v-container>
</template>

<script>
import axios from "axios";
export default {
    props: {
        club: Object,
    },
    

    data: function() {
        return {
        dialog: false,
        dialogDelete: false,

        headers: [
            {
                align: "start",
                text: "Code Journal",
                value: "entryjournal",
                sortable: false,
            },
            { text: "Pièce", value: "piece" },
            { text: "Date", value: "date", sortable: false },
            { text: "N° de compte", value: "accountnumber", sortable: false },
            {
                text: "Intitulé du compte",
                value: "accountintitule",
                sortable: false,
            },
            { text: "Libelle", value: "libelle", sortable: false },
            { text: "Débit", value: "debit", sortable: false },
            { text: "Crédit", value: "credit", sortable: false },
            { text: "Actions", value: "actions", sortable: false },
        ],

        // Initialisation
        lines: [],
        editedIndex: -1,

        comptes: ["602", "Vérifif à faire parmis les comptes"],

        intitules: [
            "Achat de consommable",
            "Vérifif à faire parmis les comptes",
        ],
        intitule: "",

        // Les items à éditer avec la fenetre pop-up
        editedLine: {
            entryjournal: "",
            piece: "",
            accountnumber: 45,
            accountintitule: "",
            libelle: 0,
            debit: 0,
            credit: 0,
        },
        }
    },

    mounted: function () {
        console.log(this.club);
        this.getAccountingEntry();
    },

    methods: {
        getAccountingEntry() {
            console.log(this.club.shortname)
            axios
                .get(`http://localhost:3000/api/user/inputtable`, 
                {
                    withCredentials: true,
                    params: {
                        shortname : this.club.shortname
                    }
                })
                .then((response) => {
                    this.lines = response.data;
                    console.log(response.data);
                })
                .catch((error) => {
                    console.log(error);
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
            this.dialogDelete = true;
        },

        deleteLineConfirm() {
            this.lines.splice(this.editedIndex, 1);
            this.closeDelete();
        },

        close() {
            this.dialog = false;
            this.$nextTick(() => {
                this.editedLine = Object.assign({}, this.defaultLine);
                this.editedIndex = -1;
            });
        },

        closeDelete() {
            this.dialogDelete = false;
            this.$nextTick(() => {
                this.editedLine = Object.assign({}, this.defaultLine);
                this.editedIndex = -1;
            });
        },

        save() {
            if (this.editedIndex > -1) {
                Object.assign(this.lines[this.editedIndex], this.editedLine);
            } else {
                this.lines.push(this.editedLine);
            }
            this.close();
        },
    },
};
</script>