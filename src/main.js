// Imports
import Vue from 'vue'                           // Initialisation de la vue de l'application
import App from './App.vue'                     // Initilisation de l'app
import vuetify from './plugins/vuetify';        // Initialisation du Framework de l'app : Vuetify
import VueRouter from 'vue-router';             // Initialisation du router pour VueJS

// Imports des composants
import Login from '../src/components/Login'
import Club from '../src/components/Club'
import Accountchart from '../src/components/Accountchart'
import Inputtable from "../src/components/Inputtable"
import Profil from "../src/components/Profil"
import Courses from "../src/components/Courses"
import Resultaccount from "../src/components/Resultaccount"
import Bilan from "../src/components/Bilan"
import Register from "../src/components/Register"
import Form from "../src/components/Form"
import Contacts from "../src/components/Contacts"
import Clubstable from "../src/components/Clubstable"
import Userstable from "../src/components/Userstable"
import Accesstable from "../src/components/Accesstable"
import Referentstable from "../src/components/Referentstable"

Vue.use(VueRouter)

// Routeur de l'application
const router = new VueRouter({
    mode: "history",
    routes: [
        {
            path: "/login",
            component: Login,
            name: "login"
        }, {
            path: "*",
            redirect: '/login',
        }, {
            path: "/home",
            component: Club,
            name: "home"
        }, {
            path: "/accountchart",
            component: Accountchart,
            name: "accountchart"
        } , {
            path: "/inputtable",
            component: Inputtable,
            name: "inputtable",
            props: true,
        } , {
            path: "/profil",
            component: Profil,
            name : "profil"
        } , {
            path: "/courses",
            component: Courses,
            name: "courses"
        } , {
            path: "/resultaccount",
            component: Resultaccount,
            name: "resultaccount",
        } , {
            path: "/bilan",
            component: Bilan,
            name: "bilan",
        } , {
            path: "/register",
            component: Register,
            name: "register",
        } , {
            path: "/form",
            component: Form,
            name: "form",
        } , {
            path: "/contacts",
            component: Contacts,
            name: "contacts",
        } , {
            path: "/userstable",
            component: Userstable,
            name: "userstable",
        } , {
            path: "/clubstable",
            component: Clubstable,
            name: "clubstable",
        } , {
            path: "/accesstable",
            component: Accesstable,
            name : "accesstable",
        } , {
            path: "/referentstable",
            component: Referentstable,
            name : "referentstable",
        }
    ]
})

// Vue de l'application
new Vue({
    vuetify,
    router,
    render: h => h(App)
}).$mount('#app')

