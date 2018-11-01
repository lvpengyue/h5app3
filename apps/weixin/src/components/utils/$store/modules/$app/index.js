import $apiConf from '../../../$api-conf';



const state = {
    washCircle: {
        big: false,
        small: false
    },
    starting: false, // 标识已经启动但是状态未返回的延迟状态
    wxprepay: '', // 微信订单
    wechatUpload: '', // 微信图片上传
    begin: false // 洗衣动画是否开始的标识
};

const $APP_SET_WASH_CIRCLE = '$APP_SET_WASH_CIRCLE';
const $APP_SET_STARTING = '$APP_SET_STARTING';
const $APP_SET_WXPREPAY = '$APP_SET_WXPREPAY';
const $APP_SET_WECHAT_UPLOAD = '$APP_SET_WECHAT_UPLOAD';
const $APP_SET_BEGIN = '$APP_SET_BEGIN';

const mutations = {
    /**
     * 洗衣大小球展示控制
     * @param {Object} state state
     * @param {FSA} mutation mutation
     */
    [$APP_SET_WASH_CIRCLE](state, mutation) {
        state.washCircle = mutation.payload;
    },

    /**
     * 启动中
     * @param {Object} state state
     * @param {FSA} mutation mutation
     */
    [$APP_SET_STARTING](state, mutation) {
        state.starting = mutation.payload;
    },

    /**
     * 微信订单
     * @param {Object} state state
     * @param {FSA} mutation mutation
     */
    [$APP_SET_WXPREPAY](state, mutation) {
        state.wxprepay = mutation.payload;
    },

    /**
     * 动画开始
     * @param {Object} state state
     * @param {FSA} mutation mutation
     */
    [$APP_SET_BEGIN](state, mutation) {
        state.begin = mutation.payload;
    },

    /**
     * 微信图片上传
     * @param {Object} state state
     * @param {FSA} mutation mutation
     */
    [$APP_SET_WECHAT_UPLOAD](state, mutation) {
        state.wechatUpload = mutation.payload;
    }
};

const actions = {
    /**
     * 洗衣大小球展示控制
     * @param {Object} context context
     * @param {Object} params {id, token, userid}
     */
    async $appSetWashCircle({
        commit,
        dispatch,
        state
    }, params) {
        commit({
            type: $APP_SET_WASH_CIRCLE,
            payload: params
        });
    },

    /**
     * 洗衣大小球展示控制
     * @param {Object} context context
     * @param {Object} params {id, token, userid}
     */
    async $appSetStarting({
        commit,
        dispatch,
        state
    }, params) {
        commit({
            type: $APP_SET_STARTING,
            payload: params
        });
    },

    /**
     * 洗衣动画开始
     * @param {Object} context context
     * @param {Object} params {id, token, userid}
     */
    async $appSetBegin({
        commit,
        dispatch,
        state
    }, params) {
        commit({
            type: $APP_SET_BEGIN,
            payload: params
        });
    },

    /**
     * 创建微信订单
     * @param {Object} context context
     * @param {Object} params {id, token, userid}
     */
    async $appSetWxPrepay({
        commit,
        dispatch,
        state
    }, params) {
        try {
            const response = await dispatch('$apisCall', {
                config: $apiConf.API_REQUEST_FORM,
                params: Object.assign(
                    {},
                    {
                        uri: '/api/pay/wxpay/prepay'
                    },
                    params,
                    this.getters.$groupSourceParams3
                )
            });

            commit({
                type: $APP_SET_WXPREPAY,
                payload: response
            });
        } catch (error) {
            console.log('创建微信订单失败');
        }
    },

    /**
     * 微信上传
     * @param {Object} context context
     * @param {Object} params {id, token, userid}
     */
    async $appSetWechatUpload({
        commit,
        dispatch,
        state
    }, params) {
        try {
            const response = await dispatch('$apisCall', {
                config: $apiConf.API_WECHAT_UPLOAD_FILE,
                params
            });

            commit({
                type: $APP_SET_WECHAT_UPLOAD,
                payload: response
            });
        } catch (error) {
            console.log('上传微信图片失败');
        }
    }
};

const getters = {
    /**
     * 洗衣大小球展示控制
     * @param {Object} state state
     * @return {String} wxconfig 微信配置详情
     */
    $appWashCircle(state) {
        return state.washCircle;
    },

    /**
     * 洗衣大小球展示控制
     * @param {Object} state state
     * @return {String} wxconfig 微信配置详情
     */
    $appStarting(state) {
        return state.starting;
    },

    /**
     * 洗衣动画开始
     * @param {Object} state state
     * @return {String} wxconfig 微信配置详情
     */
    $appBegin(state) {
        return state.begin;
    },

    /**
     * 微信订单
     * @param {Object} state state
     * @return {String} wxprepay wxprepay
     */
    $appWxPrepay(state) {
        return state.wxprepay;
    },

    /**
     * 微信图片上传
     * @param {Object} state state
     * @return {String} wxprepay wxprepay
     */
    $appWechatUpload(state) {
        return state.wechatUpload;
    }
};

export default {
    state,
    mutations,
    actions,
    getters
};
