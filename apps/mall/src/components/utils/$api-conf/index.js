import $apiConf from '@components/utils/$api-conf';
import $schemas from '../$schemas';



export default Object.assign({
    WEATHERS_GET: {

        /**
         * 接口名称，用于在状态树中保存该接口相关信息
         * @type {String}
         */
        name: 'WEATHERS_GET',

        /**
         * 请求参数
         * @type {Object}
         */
        proxy: {
            url: 'https://query.yahooapis.com/v1/public/yql',
            method: 'GET',
            dataType: 'json',
            data: {
                format: 'json'
            }
        }
    },

    API_MALL_PRODUCT_LIST: {

        /**
         * 商品列表
         * @type {String}
         */
        name: 'API_MALL_PRODUCT_LIST',

        /**
         * 请求参数
         * @type {Object}
         */
        proxy: {
            url: '/api/mallProduct/list',
            method: 'POST',
            dataType: 'json',
            xhrFields: {
                withCredentials: true
            }
        }
    },

    API_MALL_PRODUCT_DETAILS: {

        /**
         * 商品详情
         * @type {String}
         */
        name: 'API_MALL_PRODUCT_DETAILS',

        /**
         * 请求参数
         * @type {Object}
         */
        proxy: {
            url: '/api/mallProduct/details',
            method: 'POST',
            dataType: 'json',
            xhrFields: {
                withCredentials: true
            }
        }
    },


    API_COMMENT_LIST: {

        /**
         * 评论列表
         * @type {String}
         */
        name: 'API_COMMENT_LIST',

        /**
         * 请求参数
         * @type {Object}
         */
        proxy: {
            url: '/api/comment/list',
            method: 'POST',
            dataType: 'json',
            xhrFields: {
                withCredentials: true
            }
        }
    },

    API_COMMENT_PERSONAL_LIST: {

        /**
         * 我的评论列表
         * @type {String}
         */
        name: 'API_COMMENT_PERSONAL_LIST',

        /**
         * 请求参数
         * @type {Object}
         */
        proxy: {
            url: '/api/comment/personalList',
            method: 'POST',
            dataType: 'json',
            xhrFields: {
                withCredentials: true
            }
        }
    },

    API_MALL_PRODUCT_CONFIRM_PRODUCT: {

        /**
         * 确认订单信息
         * @type {String}
         */
        name: 'API_MALL_PRODUCT_CONFIRM_PRODUCT',

        /**
         * 请求参数
         * @type {Object}
         */
        proxy: {
            url: '/api/mallProduct/confirm-product',
            method: 'POST',
            dataType: 'json',
            xhrFields: {
                withCredentials: true
            }
        }
    },

    API_ADDRESS_SAVE: {

        /**
         * 新增、修改收货地址
         * @type {String}
         */
        name: 'API_ADDRESS_SAVE',

        /**
         * 请求参数
         * @type {Object}
         */
        proxy: {
            url: '/api/address/save',
            method: 'POST',
            dataType: 'json',
            xhrFields: {
                withCredentials: true
            }
        }
    },

    API_MALL_ORDER_LIST: {

        /**
         * 获取我的订单
         * @type {String}
         */
        name: 'API_MALL_ORDER_LIST',

        /**
         * 请求参数
         * @type {Object}
         */
        proxy: {
            url: '/api/mallOrder/list',
            method: 'POST',
            dataType: 'json',
            xhrFields: {
                withCredentials: true
            }
        }
    },

    API_MALL_ORDER_DETAILS: {

        /**
         * 订单详情
         * @type {String}
         */
        name: 'API_MALL_ORDER_DETAILS',

        /**
         * 请求参数
         * @type {Object}
         */
        proxy: {
            url: '/api/mallOrder/details',
            method: 'POST',
            dataType: 'json',
            xhrFields: {
                withCredentials: true
            }
        }
    },

    API_COMMENT_RELEASE_COMMENT: {

        /**
         * 发布评论
         * @type {String}
         */
        name: 'API_COMMENT_RELEASE_COMMENT',

        /**
         * 请求参数
         * @type {Object}
         */
        proxy: {
            url: '/api/comment/releaseComment',
            method: 'POST',
            dataType: 'json',
            xhrFields: {
                withCredentials: true
            }
        }
    }
}, $apiConf);
