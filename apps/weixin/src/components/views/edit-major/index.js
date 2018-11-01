import { mapGetters, mapActions } from 'vuex';

export default {
    mounted() {
        this.major = this.userCenterDetail.data.user.major;
        document.title = '修改专业';
    },
    data() {
        return {
            major: '', // 专业
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
        major(newval) {
            if (!newval.trim()) {
                this.error = true;
                this.message = '请填写专业';
            }

            if (newval.trim().length > 20) {
                this.error = true;
                this.message = '专业长度为1-20个字符';
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
            if (this.major.trim().length <= 20 && this.major.trim().length > 0) {
                // 可以提交
                this.loading = true;
                await this.userCenterGetEdit({
                    major: this.major,
                    id: this.userCenterDetail.data.user.id
                });

                if (this.userCenterEdit && this.userCenterEdit.code == 1) {
                    this.loading = false;
                    this.$toast.success('修改专业成功');
                    this.$router.back();
                } else {
                    this.loading = false;
                    this.$toast.fail(this.userCenterEdit.info);
                }
            }
        }
    }
};
