<template>
    <div>
        <loader v-if="loading" type="square"></loader>
        <template v-else>
            <template v-if="isAuthenticated">
                <div v-for="blog in blogs" class="col-md-4 mb">
                    <div class="darkblue-panel pn">
                        <br>
                        <br>
                        <p><img src="https://placehold.it/60x60?text=+" class="img-circle" width="80"></p>
                        <p><b>{{blog.url}}</b></p>
                        <div class="row">
                            <div class="col-md-6">
                                <p class="small mt">{{ $t('New Followers') }}</p>
                                <p>{{ gainedThisWeek(blog) }}</p>
                            </div>
                            <div class="col-md-6">
                                <p class="small mt">{{ $t('Total Followers') }}</p>
                                <p>{{ blog.followerCount }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </template>
            <template v-else>
                Replace this with a nice splash page.
            </template>
        </template>
    </div>
</template>

<script>
import stats from 'stats-lite';
import {mapGetters, mapActions} from 'vuex';

import loader from './loader.vue';

export default {
    name: 'home',
    data() {
        return {
            loading: false
        };
    },
    mounted() {
        const vm = this;
        vm.checkAuth().then(({token}) => {
            if (token) {
                vm.getUser();
                vm.getAllBlogs();
            }

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
            'isAuthenticated',
            'blogs'
        ])
    },
    methods: {
        ...mapActions([
            'getUser',
            'getAllBlogs',
            'checkAuth',
            'getStats'
        ]),
        async gainedThisWeek(blog) {
            return stats.mean(await this.getStats({url: blog.url, limit: 7}));
        }
    },
    components: {
        loader
    }
};
</script>
