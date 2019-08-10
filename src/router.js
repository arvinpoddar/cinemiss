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
    {
        path: "/movie/:id",
        component: Result
    }
    ]
});
export default router;