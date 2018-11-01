import util from 'util';
import $apiConf from '../../../$api-conf';



const state = {

    /**
     * 支付信息
     * @type {String}
     */
    detail: '',

    /**
     * 启动洗衣机
    */
    start: '',

    /**
     * 微信支付基础配置
    */
    wxconfig: ''
};

const WASH_SET_DETAIL = 'WASH_SET_DETAIL';
const WASH_SET_START = 'WASH_SET_START';
const WASH_SET_WXCONFIG = 'WASH_SET_WXCONFIG';

const mutations = {

    /**
     * 新建团购订单详情
     * @param {Object} state state
     * @param {FSA} mutation mutation
     */
    [WASH_SET_START](state, mutation) {
        state.start = mutation.payload;
    },

    /**
     * 支付信息
     * @param {Object} state state
     * @param {FSA} mutation mutation
     */
    [WASH_SET_DETAIL](state, mutation) {
        state.detail = mutation.payload;
    },

    /**
     * 支付微信配置信息
     * @param {Object} state state
     * @param {FSA} mutation mutation
     */
    [WASH_SET_WXCONFIG](state, mutation) {
        state.wxconfig = mutation.payload;
    }
};

const actions = {
    /**
     * 启动洗衣机
     * @param {Object} context context
     * @param {Object} params params
     */
    async washGetStart({
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
                        uri: '/api/washer/start'
                    },
                    this.getters.$groupSourceParams3,
                    params
                )
            });

            commit({
                type: WASH_SET_START,
                payload: response
            });
        } catch (error) {
            console.log('启动洗衣机失败');
        }
    },

    /**
     * 查看是否有洗衣任务
     * @param {Object} context context
     * @param {Object} params {id, token, userid}
     */
    async washGetDetail({
        commit,
        dispatch,
        state
    }) {
        try {
            const response = await dispatch('$apisCall', {
                config: $apiConf.API_REQUEST_FORM,
                params: Object.assign(
                    {},
                    {
                        uri: '/api/washer/check-task'
                    },
                    this.getters.$groupSourceParams3
                )
            });

            commit({
                type: WASH_SET_DETAIL,
                payload: response
            });
        } catch (error) {
            console.log('获取洗衣任务失败');
        }
    },

    /**
     * 获取微信支付基础配置数据
     * @param {Object} context context
     * @param {Object} params {id, token, userid}
     */
    async washGetWxconfig({
        commit,
        dispatch,
        state
    }) {
        try {
            const response = await dispatch('$apisCall', {
                config: $apiConf.MALL_GET_CONFIG
            });

            if (response.code !== 1) {
                alert(response.msg);
            }

            commit({
                type: WASH_SET_WXCONFIG,
                payload: response
            });
        } catch (error) {
            alert('获取支付数据失败');
        }
    }
};

const getters = {

    /**
     * 洗衣任务
     * @param {Object} state state
     * @return {String} detail detail
     */
    washDetail(state) {
        return state.detail;
    },

    /**
     * 启动洗衣机状态
     * @param {Object} state state
     * @return {String} start start
     */
    washStart(state) {
        return state.start;
    },

    /**
     * 获取微信配置
     * @param {Object} state state
     * @return {String} wxconfig 微信配置详情
     */
    washWxconfig(state) {
        return state.wxconfig;
    }
};

export default {
    state,
    mutations,
    actions,
    getters
};
