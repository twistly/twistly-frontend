<template>
    <aside :class="open ? '' : 'sidebar-closed'">
        <div id="sidebar" class="nav-collapse">
            <ul id="nav-accordion" class="sidebar-menu">
                <p class="centered">
                    <a href="/account">
                        <img src="https://placehold.it/60x60?text=+" width="60" class="img-circle">
                        <h5 class="centered">{{user.name || user.username}}</h5>
                    </a>
                    <li class="mt">
                        <router-link :to="{ name: 'home' }">
                            <icon name="dashboard"class="fa-fw"></icon> <span>Dashboard</span>
                        </router-link>
                    </li>
                    <li>
                        <router-link :to="{ name: 'account' }">
                            <icon name="calendar-o"class="fa-fw"></icon> <span>Account</span>
                        </router-link>
                    </li>
                    <template v-if="blogs.length >= 1">
                        <li class="sub-menu">
                            <a @click="expand">
                                <icon name="bar-chart"class="fa-fw"></icon> <span>Stats</span>
                            </a>
                            <ul class="sub">
                                <li v-for="blog in blogs">
                                    <router-link :to="{ name: 'stats', params: { blogUrl: blog.url} }" @click.native="closeAll">{{blog.url}}</router-link>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <router-link :to="{ name: 'queues' }"><icon name="calendar-o"class="fa-fw"></icon> <span>Queues</span></router-link>
                        </li>
                        <li class="sub-menu">
                            <a @click="expand">
                                <icon name="globe"class="fa-fw"></icon> <span>Counters</span>
                            </a>
                            <ul class="sub">
                                <li v-for="blog in blogs">
                                    <router-link :to="{ name: 'counter', params: { blogUrl: blog.url} }" @click.native="closeAll">{{blog.url}}</router-link>
                                </li>
                            </ul>
                        </li>
                    </template>
                    <template v-else>
                        <li v-if="user.apiKey">
                            <a v-bind:href="'https://api.twistly.xyz/auth/tumblr?api_key=' + user.apiKey">
                                <i class="fa fa-cogs-o"></i> <span>Link an account</span>
                            </a>
                        </li>
                        <li v-else>
                            <span>Your account doesn't have API access enabled.</span>
                        </li>
                    </template>
                </p>
            </ul>
            <span class="credit">Theme from BlackTie.co</span>
        </div>
    </aside>
</template>

<script>
import 'vue-awesome/icons/dashboard'; // eslint-disable-line import/no-unassigned-import
import 'vue-awesome/icons/calendar-o'; // eslint-disable-line import/no-unassigned-import
import 'vue-awesome/icons/bar-chart'; // eslint-disable-line import/no-unassigned-import
import 'vue-awesome/icons/globe'; // eslint-disable-line import/no-unassigned-import

export default {
    name: 'sidebar',
    props: [
        'user',
        'blogs',
        'open'
    ],
    methods: {
        expand(e) {
            const element = e.target.parentNode;
            if (element.className.split(' ').indexOf('active') >= 0) {
                element.className = 'sub-menu';
            } else {
                element.className = 'sub-menu dcjq-current-parent active';
            }
        },
        closeAll(e) {
            const element = e.target.parentNode.parentNode.parentNode;
            element.className = 'sub-menu';
        }
    }
};
</script>

<style scoped>
#sidebar {
    padding-bottom: 15px;
}
#sidebar span.api_warning {
    color: white;
    font-size: 10px;
}

.sidebar-menu {
    margin-top: 60px;
    padding-top: 15px;
}
</style>
