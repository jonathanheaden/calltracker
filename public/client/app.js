Vue.use(VueRouter)

const Home = {
    template: `
    <div class="user">
    <h1>Call Trackr</h1>
    <ul>
    <li v-for="contact in contacts">{{contact.name}}</li>
    </ul>
    </div>
    `,
    data: function () {
        return {
            
        }
    },
    computed: {
        contacts(){
            return store.state.contacts
        }
    },
    methods: {
        refreshContacts() {
            axios.get(store.state.siteUrl + 'api/contacts')
                .then(response => {
                    store.commit('setContacts', response.data)
                })
                .catch(error => {
                    console.log('There was an error: ' + error.message)
                })
        }
    },
    created: function () {
        this.refreshContacts();
    }
}

const router = new VueRouter({
    routes: [{
        path: '/',
        component: Home,
    }],
    mode: 'history'
})

const store = new Vuex.Store({
    state: {
        contacts: [],
        siteUrl: this.document.URL.split('?')[0]
    },
    mutations: {
        setContacts(state, data) {
            state.contacts = data
        }
    }
})

new Vue({
    router,
    store,
    el: '#app',
    data: {

    }
})