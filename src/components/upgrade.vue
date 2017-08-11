<template>
    <div>
        <form v-if="plans && enabled">
            <select v-model="productId">
                <option v-for="product in products" :value="product.id">{{product.description}}</option>
            </select>

            <stripe-checkout
                stripe-key="pk_test_6pRNASCoBOKtIshFeQd4XMUh"
                :on-success="'broadcast'"
                :products="products"
                :product-id="productId">
            </stripe-checkout>
        </form>
        <div v-else>Plans aren't currently enabled.</div>
    </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex';
import {Bus, StripeCheckout} from 'vue-stripe';

export default {
    name: 'upgrade',
    data() {
        return {
            enabled: false,
            plans: false,
            loading: false,
            productId: 1,
            products: [{
                id: 1,
                name: '',
                description: 'Twistly Lite',
                amount: 99 // $0.99 in cents
            }, {
                id: 2,
                name: '',
                description: 'Twistly Pro',
                amount: 499 // $4.99 in cents
            }]
        };
    },
    mounted() {
        const vm = this;
        Bus.$on('vue-stripe.success', ({token, email}) => {
            vm.upgradeUser({token, email}).then(() => {
                this.$router.push({name: 'home'});
            });
        });
    },
    methods: {
        ...mapActions([
            'upgradeUser'
        ])
    },
    computed: {
        ...mapGetters([
            'user'
        ])
    },
    components: {
        'stripe-checkout': StripeCheckout
    }
};
</script>