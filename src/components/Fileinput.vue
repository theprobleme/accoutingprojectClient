<template>
    <v-file-input v-model="files" color= "indigo darken2 accent-4" counter label="File input" multiple placeholder="Select your files" prepend-icon="mdi-paperclip" outlined :show-size="1000">
        <template v-slot:selection="{ index, text }">
            <v-chip v-if="index < 2" color= "indigo darken2 accent-4" dark label small>
                {{ text }}
            </v-chip>

            <span v-else-if="index === 2" class="overline grey--text text--darken-3 mx-2">
                +{{ files.length - 2 }} Fichier(s)
            </span>
        </template>
</template>

<script>
export default {
    data: () => ({
        files: [],
    }),
};
</script>