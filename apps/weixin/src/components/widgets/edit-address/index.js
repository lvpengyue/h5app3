import { mapActions, mapGetters } from 'vuex';
import { address } from './assets/address';



export default {
    props: {
        editVisible: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            slots: [{
                flex: 1,
                values: [],
                className: 'slot1',
                textAlign: 'center'
            },
            {
                flex: 1,
                values: [],
                className: 'slot2',
                textAlign: 'center'
            },
            {
                flex: 1,
                values: [],
                className: 'slot3',
                textAlign: 'center'
            }
            ],
            location: {
                username: '',
                phone: '',
                province: '',
                city: '',
                area: '',
                streetAddress: ''
            },
            address,
            selectAddress: '',
            tempAddress: '',
            addressFlag: false
        };
    },
    mounted() {
        this.location.province = this.confirmOrderDetail.data.authAddress.parentName;
        this.location.city = this.confirmOrderDetail.data.authAddress.areaName;
        this.location.area = this.confirmOrderDetail.data.authAddress.childName;
        this.selectAddress = `${this.confirmOrderDetail.data.authAddress.parentName}${this.confirmOrderDetail.data.authAddress.areaName}${this.confirmOrderDetail.data.authAddress.childName}`;
    },
    computed: {
        ...mapGetters([
            '$groupUserData',
            '$groupAddress',
            'confirmOrderDetail'
        ])
    },
    methods: {
        ...mapActions([
            '$groupSetAddress'
        ]),
        showSelect() {
            this.onInitAddress();
            this.addressFlag = true;
        },
        handleHide() {
            this.$emit('hideEdit');
        },
        onInitAddress() {
            this.slots[0].values = this.address.filter((item, index) => {
                if (item.apid == 0) {
                    return item;
                }
            });
            this.slots[1].values = this.address.filter((item, index) => {
                if (item.apid == 1) {
                    return item;
                }
            });
            this.slots[2].values = this.address.filter((item, index) => {
                if (item.apid == 36) {
                    return item;
                }
            });
        },
        onFillAddress() {
            // 填入省市区
            this.selectAddress = this.tempAddress;
            this.addressFlag = !this.addressFlag;
        },
        onValuesChange(picker, values) {
            let citys = [];
            let areas = [];

            // 防止没有省份时报错
            if (values[0]) {
                citys = this.address.filter((item, index) => {
                    if (item.apid == values[0].aid) {
                        return item;
                    }
                });
            }

            // 防止没有市时报错;
            if (values[1]) {
                areas = this.address.filter((item, index) => {
                    if (item.apid == values[1].aid) {
                        return item;
                    }
                });
            }

            // 防止没有区时报错;
            if (values[2]) {
                // 这里可以指定地址符，此处以空格进行连接
                this.location.province = values[0].aname;
                this.location.city = values[1].aname;
                this.location.area = values[2].aname;
                this.tempAddress = `${values[0].aname} ${values[1].aname} ${values[2].aname}`;
            }
            picker.setSlotValues(1, citys);
            picker.setSlotValues(2, areas);
        },

        /**
         * 新增地址操作，需要验证数据
        */
        async handleAdd() {
            if (this.location.username.length < 2) {
                this.$toast.fail('请输入收货人');

                return false;
            }
            if (!/^[1][0,1,2,3,4,5,6,7,8,9][0-9]{9}$/.test(this.location.phone)) {
                this.$toast.fail('请输入正确的手机号');

                return false;
            }
            if (!this.selectAddress) {
                this.$toast.fail('请选择省市区');

                return false;
            }
            if (!this.location.streetAddress) {
                this.$toast.fail('请输入详细地址');

                return false;
            }

            // 进行提交操作
            await this.$groupSetAddress({
                province: this.location.province,
                city: this.location.city,
                area: this.location.area,
                streetAddress: this.location.streetAddress,
                telephone: this.location.phone,
                userName: this.location.username,
                token: this.$groupUserData.sysToken,
                userId: this.$groupUserData.id
            });

            if (this.$groupAddress.code == 1 && this.$groupAddress.success == true) {
                this.$emit('hideEdit');
            }
        }
    }
};
