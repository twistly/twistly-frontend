<template>
    <div class="form-signin">
        <h2 class="form-signin-heading">Signup</h2>
        <form v-on:submit.prevent="trySignup()" class="signin-wrap">
            <span class="flash-error">{{error}}</span>
            <input class="form-control" type="text" placeholder="Username" v-model="username" autofocus/>
            <br>
            <input class="form-control" type="password" placeholder="Password" v-model="password"/>
            <button class="btn btn-theme btn-block" @click="trySignup()">
                <i class="fa fa-lock"></i> Signup
            </button>
            <hr>
            <div class="registration">
                Already have an account?
                <br>
                <router-view :to="{ name: 'signin' }">Signin</a>
            </div>
        </form>
    </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex';

export default {
    name: 'signup',
    data() {
        return {
            loading: false,
            username: '',
            password: ''
        };
    },
    methods: {
        ...mapActions([
            'signup'
        ]),
        trySignup() {
            const vm = this;
            const {username, password} = vm;
            vm.signup({username, password}).then(() => {
                this.$router.push({name: 'home'});
            });
        }
    },
    computed: {
        ...mapGetters({
            error: 'authError',
            stack: 'authStack'
        })
    }
};
</script>

<style scoped>
.form-signin {
    margin: 0 auto;
}
</style>
