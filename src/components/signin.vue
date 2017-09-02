<template>
    <div class="form-signin">
        <h2 class="form-signin-heading">Signin</h2>
        <form v-on:submit.prevent="trySignin()" class="signin-wrap">
            <span class="flash-error">{{error}}</span>
            <input class="form-control" type="text" placeholder="Username" v-model="username" autofocus/>
            <br>
            <input class="form-control" type="password" placeholder="Password" v-model="password"/>
            <label class="checkbox">
                <span class="pull-right">
                    <!-- Replace with forgot password modal? -->
                    <a href="/signin#myModal">Forgot your password?</a>
                </span>
            </label>
            <a class="button" @click="trySignin()">
                <i class="fa fa-lock"></i> Signin
            </a>
            <hr>
            <div class="registration">
                Don't have an account yet?
                <br>
                <router-link :to="{ name: 'signup' }">Create an account</router-link>
            </div>
        </form>
    </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex';

export default {
    name: 'signin',
    data() {
        return {
            loading: false,
            username: '',
            password: ''
        };
    },
    methods: {
        ...mapActions([
            'signin'
        ]),
        trySignin() {
            const vm = this;
            const {username, password} = vm;
            vm.signin({username, password}).then(() => {
                this.$router.push({name: 'home'});
            });
        }
    },
    computed: {
        ...mapGetters({
            error: 'authUserError',
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
