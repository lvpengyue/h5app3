import { mapActions, mapGetters } from 'vuex';



export default {
    props: {
        eidtValid: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {};
    },

    computed: {
        ...mapGetters([
            '$groupAddress'
        ])
    },
    methods: {
        handleShow() {
            this.$emit('showEdit');
        }
    }
};
