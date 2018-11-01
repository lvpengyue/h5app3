import { mapGetters, mapActions } from 'vuex';
import $ from 'jquery';

export default {
    beforeRouteEnter(to, from, next) {
        next();
    },
    async mounted() {
        document.title = '地址列表';
        await this.addressListGetDetail({
            city: this.$groupLocation3.city
        });

         // 初始化地图
        const map = new qq.maps.Map('allmap', {
            // 地图的中心地理坐标。
            center: new qq.maps.LatLng(39.91, 116.397128),
            zoom: 12
        });
    },
    data() {
        return {
            choosedArea: {}
        };
    },
    computed: {
        ...mapGetters([
            '$groupLocation3',
            '$groupUserConfig3',
            'addressListDetail'
        ]),

        areaList() {
            const arr = [];

            if (this.addressListDetail && this.addressListDetail.data) {
                this.addressListDetail.data.forEach((item) => {
                    if (this.showDistance(item.lat, item.lng)) {
                        arr.push(item);
                    }
                });
            }

            return arr;
        }
    },
    methods: {
        ...mapActions([
            'addressListGetDetail',
            '$groupSetAreaId3'
        ]),
        showDistance(lat, lng) {
            // 计算两地之间的距离，超过后台设置的距离则false,否则true
            const distance = this.$groupUserConfig3.distance;

            let pointA = new qq.maps.LatLng(lat, lng);

            // 转换百度坐标为腾讯坐标
            qq.maps.convertor.translate(pointA, 3, (res) => {
                pointA = res[0]; // 因为后台返回的是百度地图坐标，所以重新赋值腾讯坐标
            });


            const pointB = new qq.maps.LatLng(this.$groupLocation3.lat, this.$groupLocation3.lng);

            const trueDistance = qq.maps.geometry.spherical.computeDistanceBetween(pointA, pointB);


            return (Number(trueDistance) < Number(distance));
        },
        chooseArea(areaObj) {
            this.choosedArea = areaObj;
        },
        chooseFloor(id) {
            this.$groupSetAreaId3(id);

            // 获得楼层id
            // 跳转到机器列表
            this.$router.push({
                name: 'machine-list',
                params: {
                    areaId: id
                }
            });
        }
    }
};
