<template>
    <div>
        <iframe :src="linkForm" width="640" height="3658" frameborder="0" marginheight="0" marginwidth="0"></iframe>
    </div>
</template>

<script>
import axios from "axios";
export default {

  data () {
    return {
        linkForm: null,
    }
  },

    mounted: function () {
        this.getForm();
    },
    methods: {
        getForm() {
            axios
                .get(`http://localhost:3000/api/user/form`)
                .then((response) => {
                    this.linkForm = response.data[0].link;
                    console.log(response.data)
                })
                .catch((error) => {
                    console.log(error);
                });
        },
    },
};
</script>

<style scoped>
div, iframe {
    width: 100%;
    height: 100%;
}

iframe {
    display: block;
    border-style: none;
}
</style>