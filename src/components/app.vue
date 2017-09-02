<template>
    <loader v-if="loading" type="square"></loader>
    <section v-else id="container">
        <header class="header">
            <span v-if="isAuthenticated && !maintenanceMode" class="sidebar-toggle-box" @click="toggleSidebar">
                <icon name="bars" class="tooltips"></icon>
            </span>
            <router-link :to="{ name: 'home' }" class="logo"><b>Twistly</b></router-link>
            <div v-if="!maintenanceMode" class="top-menu">
                <ul class="nav pull-right top-menu">
                    <template v-if="isAuthenticated">
                        <li>
                           <button v-if="hasRole('admin')" @click="toggleErrors" class="button">{{displayErrors ? 'Hide' : 'Show'}} errors</button>
                        </li>
                        <li>
                            <router-link :to="{ name: 'signout' }" class="button">Signout</router-link>
                        </li>
                    </template>
                    <template v-else>
                        <li>
                            <router-link :to="{ name: 'signin' }" class="button">Signin</router-link>
                        </li>
                        <li>
                            <router-link :to="{ name: 'signup' }" class="button">Signup</router-link>
                        </li>
                    </template>
                </ul>
            </div>
        </header>
        <sidebar v-if="isAuthenticated && !maintenanceMode" :open="sidebarOpen" :blogs="blogs" :user="user"></sidebar>
        <section id="main-content" :class="isAuthenticated ? sidebarOpen ? '' : 'sidebar-closed' : 'sidebar-closed'">
            <section class="wrapper">
                <router-view v-if="!maintenanceMode" :display-errors="displayErrors"></router-view>
                <div v-else>Twistly is currently in maintenance mode and will be back online soon.</div>
            </section>
        </section>
        <span v-if="env !== 'production'" class="env">{{env}} v{{version}}</span>
    </section>
</template>

<script>
import {mapGetters, mapActions} from 'vuex';
import 'vue-awesome/icons/bars'; // eslint-disable-line import/no-unassigned-import
import api from '../api';
import {env} from '../utils';
import {version} from '../../package';
import loader from './loader.vue';
import sidebar from './sidebar.vue';

export default {
    name: 'app',
    data() {
        return {
            env,
            version,
            sidebarOpen: false,
            loading: false,
            maintenanceMode: false,
            displayErrors: false
        };
    },
    mounted() {
        const vm = this;
        vm.loading = true;
        api.get('/healthcheck').then(vm.checkAuth).then(({token}) => {
            vm.sidebarOpen = localStorage.getItem('sidebar') === 'true';
            return token;
        }).then(token => {
            if (token) {
                vm.getUser();
                vm.getAllBlogs();
            }
        }).then(() => {
            vm.loading = false;
        }).catch(error => {
            vm.loading = false;
            if (error.message === 'Network Error') {
                vm.maintenanceMode = true;
            }
        });
    },
    computed: {
        ...mapGetters([
            'hasRole',
            'blogs',
            'user',
            'userError',
            'isAuthenticated'
        ])
    },
    methods: {
        ...mapActions([
            'getUser',
            'getAllBlogs',
            'checkAuth'
        ]),
        toggleSidebar() {
            const vm = this;
            localStorage.setItem('sidebar', !vm.sidebarOpen);
            vm.sidebarOpen = !vm.sidebarOpen;
        },
        toggleErrors() {
            const vm = this;
            localStorage.setItem('displayErrors', !vm.displayErrors);
            vm.displayErrors = !vm.displayErrors;
        }
    },
    components: {
        loader,
        sidebar
    }
};
</script>

<style>
button:focus {outline:0;}

.button {
    padding: 4px 8px !important;
    color: white !important;
    background-color: #727E92 !important;
    text-transform: uppercase !important;
    font-size: 12px !important;
    border: 1px solid #666666 !important;
    border-radius: 0 !important;
}

.button + .button {
    margin-right: 5px;
}

#nav-accordion {
    height: 100%;
    overflow: scroll;
}
span.credit {
    background: #424a5d;
    padding-top: 5px;
}
#main-content {
    padding: 10px;
    margin: 0;
}
.sidebar-closed #sidebar {
    margin-left: -210px;
}
.error {
    border: 3px solid red;
    padding: 5px;
}
</style>
<style scoped>
header .button {
    margin-right: 15px;
    margin-top: 15px;
}
#main-content {
    margin-left: 210px;
}
#main-content.sidebar-closed {
    margin: 0;
}
.env {
    background-color: #333;
    color: #DDD;
    position: fixed;
    bottom: 2px;
    right: 2px;
    padding: 7px;
}

.sidebar-toggle-box {
    margin-right: 15px;
    padding: 0;
    cursor: pointer;
    cursor: hand;
}
</style>
