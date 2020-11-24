<template>
    <v-container>
        <v-data-iterator :items="contacts" :items-per-page.sync="itemsPerPage" :page="page" hide-default-footer>
            <v-row class="overflow-auto" id="container">
                <v-col v-for="(contact, index) in contacts" :key="index" cols="12" sm="6" md="4" lg="3">
                    <v-hover v-slot:default=" {hover} ">
                        <v-card :elevation="hover ? 24 : 6">
                            <v-img :aspect-ratio="16/9" :src="require(`../assets/logosClubs/${contact.img}`)" contain height="200px">
                                
                            </v-img>
                            <v-divider> </v-divider>
                            <v-card-text class="pt-6" style="position: relative;">
                                <div class="font-weight-light grey--text title mb-2">
                                    {{ contact.firstname + " " + contact.lastname}}
                                </div>
                                <h3 class="display-1 font-weight-light --text mb-2">
                                    {{ contact.clubname }}
                                </h3>
                                <div class="my-4 subtitle">
                                <v-icon> mdi-email </v-icon> : {{ contact.email }} <br>
                                <v-icon> mdi-phone </v-icon> : {{ contact.phone }} <br>
                            </div>
                            </v-card-text>
                        </v-card>
                    </v-hover>
                </v-col>
            </v-row>
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
            contacts: [],
        };
    },

    computed: {
        numberOfPages() {
            return Math.ceil(this.contacts.length / this.itemsPerPage);
        },
    },

    mounted: function () {
        this.getContacts();
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

        getContacts() {
            axios
                .get(`http://localhost:3000/api/user/contact`, 
                    { withCredentials: true }
                )
                .then((response) => {
                    this.contacts = response.data;
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