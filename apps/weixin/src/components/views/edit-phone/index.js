import { mapGetters, mapActions } from 'vuex';

export default {
    mounted() {
        this.oldphone = this.userCenterDetail.data.user.phone;
        document.title = '更换手机号';
    },
    data() {
        return {
            oldphone: '', // 旧手机号
            loading: false,  // 按钮是否为加载状态
            phone: '', // 新手机号
            code: '', // 验证码
            getCodeBoolean: false, // 是显示点击获取验证码还是倒计时
            backSec: 0,
            captcha: '' // 图片验证码
        };
    },
    computed: {
        ...mapGetters([
            'userCenterDetail',
            'userCenterEdit',

            'loginCodeDetail',
            'loginImgValid',
            'phoneEdit'
        ])
    },
    watch: {
        phone(newval) {
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
            'userCenterGetEdit',

            'loginValidImageCodeDetail',
            'loginGetImageCodeDetail',
            'loginGetCodeDetail',
            'phoneGetEdit'
        ]),
        async submit() {
            if (this.phone.trim().length <= 20 && this.phone.trim().length > 0) {
                // 可以提交
                this.loading = true;
                await this.userCenterGetEdit({
                    phone: this.phone,
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
        },

        async getCode() {
            if (this.phone && /^[1][0,1,2,3,4,5,6,7,8,9][0-9]{9}$/.test(this.phone)) {
                // 如果有图片验证码，先进行图片验证码的操作
                if (this.captcha || (this.loginCodeDetail && this.loginCodeDetail.data)) {
                    await this.loginValidImageCodeDetail({
                        code: this.captcha,
                        phone: this.phone
                    });

                    if (this.loginImgValid.code === 1) {
                        let timer = null;

                        this.backSec = 60;
                        this.getCodeBoolean = true;
                        timer = setInterval(() => {
                            this.backSec -= 1;
                            if (this.backSec <= 0) {
                                this.getCodeBoolean = false;
                                clearInterval(timer);
                            }
                        }, 1000);
                    }
                } else {
                    await this.loginGetCodeDetail({
                        codeType: 0,
                        phone: this.phone
                    });
                    if (this.loginCodeDetail.code === 1) {
                        let timer = null;

                        this.backSec = 60;
                        this.getCodeBoolean = true;
                        timer = setInterval(() => {
                            this.backSec -= 1;
                            if (this.backSec <= 0) {
                                this.getCodeBoolean = false;
                                clearInterval(timer);
                            }
                        }, 1000);
                    }
                }
            } else {
                this.$toast.fail('请正确填写手机号');
            }
        },

        /**
         * 获取或者更换图片验证码
         */
        async getImgCode() {
            if (this.phone && /^[1][0,1,2,3,4,5,6,7,8,9][0-9]{9}$/.test(this.phone)) {
                await this.loginGetImageCodeDetail({
                    phone: this.phone
                });
            }
        },

        /**
         * 提交
         */
        async handleSubmits() {
            // 然后验证登录
            if (!this.phone || !/^[1][0,1,2,3,4,5,6,7,8,9][0-9]{9}$/.test(this.phone)) {
                this.$toast.fail('请正确填写手机号');
            } else if (!this.code) {
                this.$toast.fail('请填写验证码');
            } else {
                this.loading = true;
                await this.phoneGetEdit({
                    code: this.code,
                    phone: this.phone
                });


                if (this.phoneEdit && this.phoneEdit.code === 1) {
                    this.loading = false;
                    this.$toast.success('修改成功');
                    this.$router.back();
                } else {
                    this.loading = false;
                    this.$toast.fail(this.phoneEdit.info);
                }
            }
        }
    }
};
