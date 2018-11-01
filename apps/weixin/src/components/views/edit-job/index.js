import { mapGetters, mapActions } from 'vuex';

export default {
    mounted() {
        this.job = this.userCenterDetail.data.user.job;
        document.title = '修改职业';
    },
    data() {
        return {
            job: '', // 职业
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
        job(newval) {
            if (!newval.trim()) {
                this.error = true;
                this.message = '请填写职业';
            }

            if (newval.trim().length > 20) {
                this.error = true;
                this.message = '职业长度为1-20个字符';
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
            if (this.job.trim().length <= 20 && this.job.trim().length > 0) {
                // 可以提交
                this.loading = true;
                await this.userCenterGetEdit({
                    job: this.job,
                    id: this.userCenterDetail.data.user.id
                });

                if (this.userCenterEdit && this.userCenterEdit.code == 1) {
                    this.loading = false;
                    this.$toast.success('修改职业成功');
                    this.$router.back();
                } else {
                    this.loading = false;
                    this.$toast.fail(this.userCenterEdit.info);
                }
            }
        }
    }
};
