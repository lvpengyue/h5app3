import util from 'util';
import $apiConf from '../../../$api-conf';



const state = {

    /**
     * 支付信息
     * @type {String}
     */
    detail: '',

    /**
     * 创建拼团订单详情
    */
    createGroup: '',

    /**
     * 微信支付基础配置
    */
    wxconfig: ''
};

const PAY_SET_DETAIL = 'PAY_SET_DETAIL';
const PAY_SET_CREATE_GROUP = 'PAY_SET_CREATE_GROUP';
const PAY_SET_WXCONFIG = 'PAY_SET_WXCONFIG';

const mutations = {

    /**
     * 新建团购订单详情
     * @param {Object} state state
     * @param {FSA} mutation mutation
     */
    [PAY_SET_CREATE_GROUP](state, mutation) {
        state.createGroup = mutation.payload;
    },

    /**
     * 支付信息
     * @param {Object} state state
     * @param {FSA} mutation mutation
     */
    [PAY_SET_DETAIL](state, mutation) {
        state.detail = mutation.payload;
    },

    /**
     * 支付微信配置信息
     * @param {Object} state state
     * @param {FSA} mutation mutation
     */
    [PAY_SET_WXCONFIG](state, mutation) {
        state.wxconfig = mutation.payload;
    }
};

const actions = {
    /**
     * 新建团购订单详情接口
     * @param {Object} context context
     * @param {Object} params params
     */
    async payGetCreateGroup({
        commit,
        dispatch,
        state
    }, params) {
        try {
            const response = await dispatch('$apisCall', {
                config: $apiConf.API_MALL_ORDER_CREATE_GROUP,
                params
            });

            if (response.code !== 1) {
                alert(response.msg);
            }

            commit({
                type: PAY_SET_CREATE_GROUP,
                payload: response
            });
        } catch (error) {
            alert('创建拼团订单失败');
        }
    },

    /**
     * 获取微信支付数据
     * @param {Object} context context
     * @param {Object} params {id, token, userid}
     */
    async payGetDetail({
        commit,
        dispatch,
        state
    }, params) {
        try {
            const response = await dispatch('$apisCall', {
                config: $apiConf.API_PAY_WXPAY_PREPAY,
                params
            });

            if (response.code !== 1) {
                alert(response.msg);
            }

            commit({
                type: PAY_SET_DETAIL,
                payload: response
            });
        } catch (error) {
            alert('获取支付数据失败');
        }
    },

    /**
     * 获取微信支付基础配置数据
     * @param {Object} context context
     * @param {Object} params {id, token, userid}
     */
    async payGetWxconfig({
        commit,
        dispatch,
        state
    }, params) {
        try {
            const response = await dispatch('$apisCall', {
                config: $apiConf.MALL_GET_CONFIG,
                params
            });

            if (response.code !== 1) {
                alert(response.msg);
            }

            commit({
                type: PAY_SET_WXCONFIG,
                payload: response
            });
        } catch (error) {
            alert('获取支付数据失败');
        }
    }
};

const getters = {

    /**
     * 获取商品详情
     * @param {Object} state state
     * @return {String} input 商品详情
     */
    payDetail(state) {
        return state.detail;
    },

    /**
     * 获取新建拼团订单详情
     * @param {Object} state state
     * @return {String} createGroup 拼团订单详情
     */
    payCreateGroup(state) {
        return state.createGroup;
    },

    /**
     * 获取微信配置
     * @param {Object} state state
     * @return {String} wxconfig 微信配置详情
     */
    payWxconfig(state) {
        return state.wxconfig;
    }
};

export default {
    state,
    mutations,
    actions,
    getters
};
