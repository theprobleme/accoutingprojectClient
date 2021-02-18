<template>
    <v-container>
        <v-data-iterator :items="clubs" :items-per-page.sync="itemsPerPage" :page="page" hide-default-footer>
            <template v-slot:no-data>
                <v-alert color="white">
                    H
                </v-alert>
            </template>
            <v-row class="overflow-auto" id="container">
                <v-col v-for="(club, index) in clubs" :key="index" cols="12" sm="6" md="4" lg="3">
                    <v-hover v-slot:default=" {hover} ">
                        <v-card :elevation="hover ? 24 : 6">
                            <v-img :aspect-ratio="16/9" :src="require(`../assets/logosClubs/${club.img}`)" contain height="200px">
                                <v-expand-transition>
                                    <div v-if="hover" class="d-flex transition-fast-in-fast-out green darken-1 v-card--reveal display-1 white--text" style="height: 100%">
                                        Données rapides
                                    </div>
                                </v-expand-transition>
                            </v-img>
                            <v-divider> </v-divider>
                            <v-card-text class="pt-6" style="position: relative;">
                                <v-btn absolute color="green darken-1" class="white--text" fab right top :to="{ name: 'inputtable', params: { club }}">
                                    <v-icon> mdi-id-card </v-icon>
                                </v-btn>
                                <div class="font-weight-light grey--text title mb-2">
                                    {{ club.firstname + " " + club.lastname}}
                                </div>
                                <h3 class="display-1 font-weight-light --text mb-2">
                                    {{ club.clubname }}
                                </h3>
                            </v-card-text>
                        </v-card>
                    </v-hover>
                </v-col>
            </v-row>

            <!-- <span class="mr-4
              grey--text">
                Page {{ page }} of {{ numberOfPages }}
            </span>
            <v-btn dark color="blue darken-3" class="mr-1" @click="formerPage">
                <v-icon>mdi-chevron-left</v-icon>
            </v-btn>
            <v-btn dark color="blue darken-3" class="ml-1" @click="nextPage">
                <v-icon>mdi-chevron-right</v-icon>
            </v-btn> -->

        </v-data-iterator>
    </v-container>
</template>

<script>
import axios from "axios";
export default {

    data() {
        return {
            filter: {},
            sortDesc: false,
            page: 1,
            itemsPerPage: 4,
            clubs: [],
            loading: true,
        };
    },

    computed: {
        numberOfPages() {
            return Math.ceil(this.clubs.length / this.itemsPerPage);
        },
    },

    mounted: function () {
        this.getClubs();
    },
    methods: {
        nextPage() {
            if (this.page + 1 <= this.numberOfPages) this.page += 1;
        },
        formerPage() {
            if (this.page - 1 >= 1) this.page -= 1;
        },
        updateItemsPerPage(number) {
            this.itemsPerPage = number;
        },

        getClubs() {
            axios
                .get(`http://localhost:3000/api/user/clubs`)
                .then((response) => {
                    this.clubs = response.data;
                    this.loading = false;
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
    },
};
</script>