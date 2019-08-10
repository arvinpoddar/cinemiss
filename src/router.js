import Vue from "vue"
import Router from "vue-router"
import Search from "./components/Search.vue"
import Result from "./components/Result.vue"

Vue.use(Router);

const router = new Router({
    mode: 'history',
    routes: [{
        path: "/",
        component: Search
    },
    //:id allows for dynamic paths, which will be used for the movie ids to call the API
    {
        path: "/movie/:id",
        component: Result
    },
    //Default path goes to the search page
    {
        path: "*",
        component: Search
    }
    ]
});
export default router;