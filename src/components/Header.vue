<template>
    <div class="header">
        <div class="d-flex align-center">
            <span class="font-weight-black shrink" style="font-size: 25px"> Comptabilité BDE ESEO ANGERS </span>

            <!-- The v-spacer component is useful when you want to fill available space or make space between two components -->
            <v-spacer> </v-spacer>

            <v-bottom-sheet v-model="sheet" persistent>
                <template v-slot:activator="{ on, attrs }">
                    <v-btn color="green" dark v-bind="attrs" v-on="on">
                        Aide
                    </v-btn>
                </template>

                <v-sheet class="text-center" height="150px">
                    <v-btn class="mt-3" text color="info" @click="sheet = !sheet"> Fermer </v-btn>
                    <div class="py-3">
                        En cas de problème de connexion, contacter Paul Lefay à l'adresse : <br>
                        paul.lefay@reseau.eseo.fr <br>
                    </div>
                </v-sheet>
            </v-bottom-sheet>
        </div>
    </div>
</template>

<script>
export default {
    data: () => ({
        sheet: false,
    }),
};
</script>

<style scoped>
.header {
    width: 100%;
}
</style>