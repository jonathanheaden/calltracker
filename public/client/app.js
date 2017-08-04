Vue.use(VueRouter)

const Home = {
    template:`
    <div class="user">
    <h1>Call Trackr</h1>
    </div>
    `
}

const router = new VueRouter({
    routes: [{
        path: '/',
        component: Home,
    }],
    mode: 'history'
})

new Vue({
    router,
    el: '#app',
    data: {
       
    }
})