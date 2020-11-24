<template>
    <div class="container">
        <v-progress-linear v-if="loading" indeterminate color="blue darken-4"></v-progress-linear>
        <iframe fill-height :src="linkCourses" width="476" height="288" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"> </iframe>

        <!-- <v-progress-circular v-else :size="50" color="primary" indeterminate></v-progress-circular> -->

        <!-- <iframe src="https://onedrive.live.com/embed?cid=DD2F426E7D90E1BB&resid=DD2F426E7D90E1BB%2178985&authkey=AF86-FpvtMaxQvs&em=2" width="476" height="288" frameborder="0" scrolling="no"></iframe> -->
    </div>
    <!--  v-else -->
</template> 

<script>
import axios from "axios";
export default {
    data() {
        return {
            linkCourses: null,
            loading: true,
        };
    },

    mounted: function () {
        this.getCourses();
    },
    methods: {
        getCourses() {
            axios
                .get(`http://localhost:3000/api/user/courses`, {
                    withCredentials: true,
                })
                .then((response) => {
                    this.linkCourses = response.data[0].link;
                    this.loading = false;
                })
                .catch((error) => {
                    console.log(error);
                });
        },
    },
};
</script>

<style scoped>
div,
iframe {
    width: 100%;
    height: 100%;
    margin: 0 auto;
}
</style>