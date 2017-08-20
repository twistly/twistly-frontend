<template>
    <div>
        <h1>Account</h1>
        <pre>{{user}}</pre>
    </div>
</template>

<script>
import {mapGetters} from 'vuex';

export default {
    name: 'account',
    data() {
        return {
            loading: false
        };
    },
    computed: {
        ...mapGetters([
            'user'
        ])
    }
};
</script>
