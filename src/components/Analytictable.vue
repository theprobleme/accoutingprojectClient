<template>
    <v-container height=100% class="section">
        <v-card-title>
            <v-text-field v-model="search" append-icon="mdi-magnify" label="Rechercher" outlined solo hide-details> </v-text-field>
        </v-card-title>

        <v-data-table :headers="headers0" fixed-header :items="lines" :page.sync="page" :items-per-page="itemsPerPage" :search="search" hide-default-footer @page-count="pageCount = $event"> </v-data-table> <br>
        
        <div class="pagination">
            <v-pagination v-model="page" :length="pageCount" :total-visible="12"> </v-pagination>
        </div>
    </v-container>
</template>

<script>
import axios from "axios";
export default {
    data() {
        return {
            page: 1,
            pageCount: 0,
            itemsPerPage: 7,
            search: '',
            headers: [
                {
                    text: "Numéro d'analytique",
                    align: 'start',
                    value: "num",
                    width:"300px"
                }, {
                    align: "start",
                    text: "Libellé de l'analytique", 
                    value: "name",
                },
            ],
            lines: [],
            
        };
    },

    // Lance la fonction getlines() ou ... au démarrage
    mounted: function () {
        this.getAccountchart();
    },

    methods: {
        getAccountchart() {
            axios
                .get(`http://localhost:3000/api/user/analytictable`,
                    { withCredentials: true }
                )
                .then((response) => {
                    this.lines = response.data;
                })   
        },
    },

    computed: {
        headers0() {
            return this.headers.map(header => Object.assign({}, header, {fixed: false}))
      },
    }
};
</script>

<style scoped>
    .section {
  margin-top: 10px;
    position: fixed;
    padding: 2em;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
}

</style>