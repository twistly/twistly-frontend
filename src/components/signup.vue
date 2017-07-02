<template>
    <div class="form-signin">
        <h2 class="form-signin-heading">Signup</h2>
        <form v-on:submit.prevent="trySignup()" class="signin-wrap">
            <span class="flash-error">{{userError}}</span>
            <input class="form-control" type="text" placeholder="Username" v-model="username" autofocus/>
            <br>
            <input class="form-control" type="email" placeholder="Email" v-model="email"/>
            <br>
            <input class="form-control" type="password" placeholder="Password" v-model="password"/>
            <br>
            <button class="btn btn-theme btn-block" @click="trySignup()">
                <i class="fa fa-lock"></i> Signup
            </button>
            <hr>
            <div class="registration">
                Already have an account?
                <br>
                <router-link :to="{ name: 'signin' }">Signin</router-link>
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
            email: '',
            password: ''
        };
    },
    methods: {
        ...mapActions([
            'signup'
        ]),
        trySignup() {
            const vm = this;
            const {username, email, password} = vm;
            vm.signup({username, email, password}).then(() => {
                this.$router.push({name: 'home'});
            });
        }
    },
    computed: {
        ...mapGetters({
            userError: 'authUserError',
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
