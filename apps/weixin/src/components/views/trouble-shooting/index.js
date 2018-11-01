export default {
    async mounted() {
        document.title = '故障排查';
        _czc.push(['_trackEvent', 'fault_page', '进入故障排查页面']);
    },
    methods: {
        toReport() {
            _czc.push('_trackEvent', 'fault_report', '点击了故障报修按钮');
            this.$router.push({
                name: 'fail-reporting'
            });
        },

        preventDefault(ev) {
            ev.preventDefault();
        },

        isScroller(el) {
            // 判断元素是否为 scroller
            return el.classList.contains('scroller');
        }



    }
};
