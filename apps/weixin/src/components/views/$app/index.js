import $ from 'jquery';
import wash from '../../widgets/wash';
import { mapGetters, mapActions } from 'vuex';
import scanvas2 from '../../widgets/canvas2/index.vue';

export default {
    components: {
        wash,
        scanvas2
    },
    data() {
        return {
            test: '30%',
            isdrag: true,
            tempX: 0,
            x: 0,
            tempY: 0,
            y: 0,
            commonInterval: null, // 小洗衣球的定时任务查询
            showBig: false,
            showSmall: true,
            hasStart: false // 已启动
        };
    },
    mounted() {
        // this.$appSetWashCircle({
        //     big: false,
        //     small: true
        // });
    },
    computed: {
        ...mapGetters([
            'washDetail',
            '$appWashCircle'
        ])
    },
    beforeRouteLeave(to, from, next) {
        next();
    },
    methods: {
        ...mapActions([
            '$appSetWashCircle'
        ]),
        starting() {
            // 已启动
            this.hasStart = true;
        },
        ending() {
            this.hasStart = false;
        },
        dragStart(e) {
            setTimeout(() => {
                this.isdrag = true;
            }, 300);

            this.tempX = parseInt($('#common-circle').css('left') + 0);
            this.tempY = parseInt($('#common-circle').css('top') + 0);
            this.x = e.touches[0].pageX;
            this.y = e.touches[0].pageY;
        },

        dragMove(e) {
            // 禁止浏览器默认事件
            e.preventDefault();
            if (this.isdrag) {
                let curX = (this.tempX + e.touches[0].pageX) - this.x;
                let curY = (this.tempY + e.touches[0].pageY) - this.y;
                const width = $('.common-wash-circle').height();

                console.log(width);

                // 边界判断
                curX = curX < 0 ? 0 : curX;
                curY = curY < 0 ? 0 : curY;
                curX = curX < document.documentElement.clientWidth - width ? curX : document.documentElement.clientWidth - width;
                curY = curY < document.documentElement.clientHeight - width ? curY : document.documentElement.clientHeight - width;
                $('#common-circle').css({
                    left: curX,
                    top: curY
                });
            }
        },
        dragEnd() {
            this.isdrag = false;
        },
        showWash() {
            this.$appSetWashCircle({
                big: true,
                small: false
            });
        },
        handleShowSmall() {
            this.$appSetWashCircle({
                big: false,
                small: true
            });
        }
    }
};
