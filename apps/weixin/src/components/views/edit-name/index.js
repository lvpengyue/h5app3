import { mapGetters, mapActions } from 'vuex';

export default {
    mounted() {
        this.name = this.userCenterDetail.data.user.name;
        document.title = '修改昵称';
    },
    data() {
        return {
            name: '', // 昵称
            error: false, // 数据验证是否错误
            message: '',  // 错误信息
            loading: false  // 按钮是否为加载状态
        };
    },
    computed: {
        ...mapGetters([
            'userCenterDetail',
            'userCenterEdit'
        ])
    },
    watch: {
        name(newval) {
            if (!newval.trim()) {
                this.error = true;
                this.message = '请填写昵称';
            }

            if (newval.trim().length > 20) {
                this.error = true;
                this.message = '昵称长度为1-20个字符';
            }

            if (newval.trim().length <= 20 && newval.trim().length > 0) {
                this.error = false;
                this.message = '';
            }
        }
    },
    methods: {
        ...mapActions([
            'userCenterGetEdit'
        ]),
        async submit() {
            if (this.name.trim().length <= 20 && this.name.trim().length > 0) {
                // 可以提交
                this.loading = true;
                await this.userCenterGetEdit({
                    name: this.name,
                    id: this.userCenterDetail.data.user.id
                });

                if (this.userCenterEdit && this.userCenterEdit.code == 1) {
                    this.loading = false;
                    this.$toast.success('修改昵称成功');
                    this.$router.back();
                } else {
                    this.loading = false;
                    this.$toast.fail(this.userCenterEdit.info);
                }
            }
        }
    }
};
