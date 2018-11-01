import $apiConf from '@components/utils/$api-conf';

// import $schemas from '../$schemas';



export default Object.assign({

    /**
     * 测试vue
     * @type {Object}
     */
    TEST_VUE: {
        name: 'TEST_VUE',

        proxy: {
            url: 'http://192.168.0.151:12319/testvue',

            method: 'GET',
            dataType: 'json',
            xhrFields: {
                withCredentials: true
            }
        }
    },

    /**
     * 订单详情
     * @type {Object}
     */
    API_MALL_ORDER_DETAILS: {
        name: 'API_MALL_ORDER_DETAILS',

        proxy: {
            url: '/api/mallOrder/details',
            method: 'POST',
            dataType: 'json',

            // contentType: 'application/json; charset=UTF-8',
            xhrFields: {
                withCredentials: true
            }
        }
    },

    /**
     * 订单详情(支付成功后)
     * @type {Object}
     */
    API_MALL_ORDER_GET_DETAILS: {
        name: 'API_MALL_ORDER_GET_DETAILS',

        proxy: {
            url: '/api/mallOrder/get-details',
            method: 'POST',
            dataType: 'json',

            // contentType: 'application/json; charset=UTF-8',
            xhrFields: {
                withCredentials: true
            }
        }
    },

    /**
     * 获取验证码
     * @type {Object}
     */
    API_CODE_GET_CODE: {
        name: 'API_CODE_GET_CODE',

        proxy: {
            url: '/api/code/getcode',
            method: 'GET',
            dataType: 'json',
            xhrFields: {
                withCredentials: true
            }
        }
    },

    /**
     * 获取/更换图片验证码
     * @type {Object}
     */
    API_CODE_GET_IMGCODE: {
        name: 'API_CODE_GET_IMGCODE',

        proxy: {
            url: '/api/code/get-imgcode',
            method: 'GET',
            dataType: 'json',
            xhrFields: {
                withCredentials: true
            }
        }
    },

    /**
     * 验证图片验证码
     * @type {Object}
     */
    API_CODE_VALI_IMGCODE: {
        name: 'API_CODE_VALI_IMGCODE',

        proxy: {
            url: '/api/code/vali-imgcode',
            method: 'GET',
            dataType: 'json',
            xhrFields: {
                withCredentials: true
            }
        }
    },

    /**
     * 登录
     * @type {Object}
     */
    API_USER_LOGIN: {
        name: 'API_USER_LOGIN',

        proxy: {
            url: '/api/user/login',
            method: 'GET',
            dataType: 'json',
            xhrFields: {
                withCredentials: true
            }
        }
    },

    /**
     * 添加收货地址
     * @type {Object}
     */
    API_ADDRESS_SAVE: {
        name: 'API_ADDRESS_SAVE',

        proxy: {
            url: '/api/address/save',
            method: 'GET',
            dataType: 'json',
            xhrFields: {
                withCredentials: true
            }
        }
    },

    /**
     * 参与拼团
     * @type {Object}
     */
    API_MALL_PRODUCT_CONFIRM_PRODUCT: {
        name: 'API_MALL_PRODUCT_CONFIRM_PRODUCT',

        proxy: {
            url: '/api/mallProduct/confirm-product',
            method: 'GET',
            dataType: 'json',
            xhrFields: {
                withCredentials: true
            }
        }
    },

    /**
     * 商品详情接口
     * @type {Object}
     */
    API_MALL_PRODUCT_DETAILS: {
        name: 'API_MALL_PRODUCT_DETAILS',

        proxy: {
            url: '/api/mallProduct/details',
            method: 'GET',
            dataType: 'json',
            xhrFields: {
                withCredentials: true
            }
        }
    },

    /**
     * 支付前微信初始化
     * @type {Object}
     */
    MALL_GET_CONFIG: {
        name: 'MALL_GET_CONFIG',

        proxy: {
            url: '/mall/get/config',
            method: 'GET',
            dataType: 'json',
            xhrFields: {
                withCredentials: true
            }
        }
    },

    /**
     * 创建拼团订单--点击支付时调用
     * @type {Object}
     */
    API_MALL_ORDER_CREATE_GROUP: {
        name: 'API_MALL_ORDER_CREATE_GROUP',

        proxy: {
            url: '/api/mallOrder/create-group',
            method: 'GET',
            dataType: 'json',
            xhrFields: {
                withCredentials: true
            }
        }
    },

    /**
     * 创建微信支付订单--创建订单成功后调用
     * @type {Object}
     */
    API_PAY_WXPAY_PREPAY: {
        name: 'API_PAY_WXPAY_PREPAY',

        proxy: {
            url: '/api/pay/wxpay/prepay',
            method: 'GET',
            dataType: 'json',
            xhrFields: {
                withCredentials: true
            }
        }
    },

    /**
     * 意见反馈
     * @type {Object}
     */
    API_SUGGEST_NEW: {
        name: 'API_SUGGEST_NEW',

        proxy: {
            url: '/api/suggest/new',
            method: 'POST',
            dataType: 'json',
            xhrFields: {
                withCredentials: true
            }
        }
    },

    /**
     * 问卷调查提交
     * @type {Object}
     */
    API_USER_ANWSER_SUBMIT: {
        name: 'API_USER_ANWSER_SUBMIT',

        proxy: {
            url: '/api/user-anwser/submit',
            method: 'POST',
            dataType: 'json',
            xhrFields: {
                withCredentials: true
            }
        }
    },

    /**
     * 故障报修提交
     * @type {Object}
     */
    API_WASHER_FAULT_NEW: {
        name: 'API_WASHER_FAULT_NEW',

        proxy: {
            url: '/api/washer-fault/new',
            method: 'POST',
            dataType: 'json',
            xhrFields: {
                withCredentials: true
            }
        }
    },

    /**
     * 获取故障机器编号
     * @type {Object}
     */
    API_WASHER_FAULT_GET: {
        name: 'API_WASHER_FAULT_GET',

        proxy: {
            url: '/api/washer-fault/get',
            method: 'POST',
            dataType: 'json',
            xhrFields: {
                withCredentials: true
            }
        }
    },

    /**
     * 申请退款
     * @type {Object}
     */
    API_ORDER_REFUND: {
        name: 'API_ORDER_REFUND',

        proxy: {
            url: '/api/order/refund',
            method: 'POST',
            dataType: 'json',
            xhrFields: {
                withCredentials: true
            }
        }
    },

    /**
     * 微信图片上传
     * @type {Object}
     */
    API_WECHAT_UPLOAD_FILE: {
        name: 'API_WECHAT_UPLOAD_FILE',

        proxy: {
            url: '/api/wechat/upload-file',
            method: 'POST',
            dataType: 'json',
            xhrFields: {
                withCredentials: true
            }
        }
    },

    /**
     * 获得红包活动数据
     * @type {Object}
     */
    API_ACTIVITY_REDPACK_DATA: {
        name: 'API_ACTIVITY_REDPACK_DATA',

        proxy: {
            url: '/api/activity/redpack/data',
            method: 'POST',
            dataType: 'json',
            xhrFields: {
                withCredentials: true
            }
        }
    },

    /**
     * 领取红包
     * @type {Object}
     */
    API_ACTIVITY_REDPACK_GET_COUPON: {
        name: 'API_ACTIVITY_REDPACK_GET_COUPON',

        proxy: {
            url: '/api/activity/redpack/get-coupon',
            method: 'POST',
            dataType: 'json',
            xhrFields: {
                withCredentials: true
            }
        }
    }
}, $apiConf);
