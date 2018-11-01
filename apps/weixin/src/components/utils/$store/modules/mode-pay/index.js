import util from 'util';
import $apiConf from '../../../$api-conf';



const state = {

    /**
     * 洗衣机详情信息信息
     * @type {String}
     */
    detail: '',

    clean: '', // 一键清洁结果
    occupy: '', // 占用洗衣机结果
    createOrder: '', // 创建普通订单
    createMeal: '', // 创建套餐订单
    createWallet: '', // 创建钱包支付订单
    payState: '' // 查看在线支付的支付状态
};

const MACHINE_SET_DETAIL = 'MACHINE_SET_DETAIL';
const MACHINE_SET_CLEAN = 'MACHINE_SET_CLEAN';
const MACHINE_SET_OCCUPY = 'MACHINE_SET_OCCUPY';
const MACHINE_SET_CREATE_ORDER = 'MACHINE_SET_CREATE_ORDER';
const MACHINE_SET_CREATE_MEAL = 'MACHINE_SET_CREATE_MEAL';
const MACHINE_SET_CREATE_WALLET = 'MACHINE_SET_CREATE_WALLET';
const MACHINE_SET_PAY_STATE = 'MACHINE_SET_PAY_STATE';

const mutations = {

    /**
     * 洗衣机详情信息的数据
     * @param {Object} state state
     * @param {FSA} mutation mutation
     */
    [MACHINE_SET_DETAIL](state, mutation) {
        state.detail = mutation.payload;
    },

    /**
     * 一键清洁信息的数据
     * @param {Object} state state
     * @param {FSA} mutation mutation
     */
    [MACHINE_SET_CLEAN](state, mutation) {
        state.clean = mutation.payload;
    },

    /**
     * 占用洗衣机的数据
     * @param {Object} state state
     * @param {FSA} mutation mutation
     */
    [MACHINE_SET_OCCUPY](state, mutation) {
        state.occupy = mutation.payload;
    },

    /**
     * 创建普通订单信息的数据
     * @param {Object} state state
     * @param {FSA} mutation mutation
     */
    [MACHINE_SET_CREATE_ORDER](state, mutation) {
        state.createOrder = mutation.payload;
    },

    /**
     * 创建套餐订单的数据
     * @param {Object} state state
     * @param {FSA} mutation mutation
     */
    [MACHINE_SET_CREATE_MEAL](state, mutation) {
        state.createMeal = mutation.payload;
    },

    /**
     * 创建钱包支付的数据
     * @param {Object} state state
     * @param {FSA} mutation mutation
     */
    [MACHINE_SET_CREATE_WALLET](state, mutation) {
        state.createWallet = mutation.payload;
    },

    /**
     * 在线支付的支付状态
     * @param {Object} state state
     * @param {FSA} mutation mutation
     */
    [MACHINE_SET_PAY_STATE](state, mutation) {
        state.payState = mutation.payload;
    }
};

const actions = {
    /**
     * 洗衣机详情信息数据
     * @param {Object} context context
     * @param {Object} params params
     */
    async machineGetDetail({
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
                        uri: '/api/washer/detail'
                    },
                    this.getters.$groupSourceParams3,
                    params
                )
            });

            if (response.code !== 1) {
                alert(response.msg);
            }
            commit({
                type: MACHINE_SET_DETAIL,
                payload: response
            });
        } catch (error) {
            console.log('获取洗衣机详情失败');
        }
    },

    /**
     * 洗衣机清洁数据
     * @param {Object} context context
     * @param {Object} params params
     */
    async machineGetClean({
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
                        uri: '/api/washer/clean'
                    },
                    this.getters.$groupSourceParams3,
                    params
                )
            });

            if (response.code !== 1) {
                alert(response.msg);
            }
            commit({
                type: MACHINE_SET_DETAIL,
                payload: response
            });
        } catch (error) {
            console.log('一键清洁失败');
        }
    },

    /**
     * 占用洗衣机
     * @param {Object} context context
     * @param {Object} params params
     */
    async machineGetOccupy({
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
                        uri: '/api/washer/occupy'
                    },
                    this.getters.$groupSourceParams3,
                    params
                )
            });

            commit({
                type: MACHINE_SET_OCCUPY,
                payload: response
            });
        } catch (error) {
            console.log('占用洗衣机失败');
        }
    },

    /**
     * 创建普通订单
     * @param {Object} context context
     * @param {Object} params params
     */
    async machineGetCreateOrder({
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
                        uri: '/api/order/create'
                    },
                    this.getters.$groupSourceParams3,
                    params
                )
            });

            commit({
                type: MACHINE_SET_CREATE_ORDER,
                payload: response
            });
        } catch (error) {
            console.log('创建订单失败');
        }
    },

    /**
     * 创建套餐免费支付订单
     * @param {Object} context context
     * @param {Object} params params
     */
    async machineGetCreateMeal({
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
                        uri: '/api/order/create/meal'
                    },
                    this.getters.$groupSourceParams3,
                    params
                )
            });

            commit({
                type: MACHINE_SET_CREATE_MEAL,
                payload: response
            });
        } catch (error) {
            console.log('创建订单失败');
        }
    },

    /**
     * 创建钱包支付订单
     * @param {Object} context context
     * @param {Object} params params
     */
    async machineGetCreateWallet({
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
                        uri: '/api/order/create/wallet'
                    },
                    this.getters.$groupSourceParams3,
                    params
                )
            });

            commit({
                type: MACHINE_SET_CREATE_WALLET,
                payload: response
            });
        } catch (error) {
            console.log('创建订单失败');
        }
    },

    /**
     * 查询在线支付的支付状态
     * @param {Object} context context
     * @param {Object} params params
     */
    async machineGetPayState({
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
                        uri: '/api/pay/query/state'
                    },
                    this.getters.$groupSourceParams3,
                    params
                )
            });

            commit({
                type: MACHINE_SET_PAY_STATE,
                payload: response
            });
        } catch (error) {
            console.log('查询支付状态失败');
        }
    }
};

const getters = {

    /**
     * 获取洗衣机详情信息详情
     * @param {Object} state state
     * @return {Object} detail 洗衣机详情
     */
    machineDetail(state) {
        return state.detail;
    },

    /**
     * 获取洗衣机清洁详情
     * @param {Object} state state
     * @return {Object} clean 清洁详情
     */
    machineClean(state) {
        return state.clean;
    },

    /**
     * 占用洗衣机信息
     * @param {Object} state state
     * @return {Object} occupy occupy
     */
    machineOccupy(state) {
        return state.occupy;
    },

    /**
     * 创建普通订单
     * @param {Object} state state
     * @return {Object} createOrder createOrder
     */
    machineCreateOrder(state) {
        return state.createOrder;
    },

    /**
     * 创建套餐免费订单
     * @param {Object} state state
     * @return {Object} createMeal createMeal
     */
    machineCreateMeal(state) {
        return state.createMeal;
    },

    /**
     * 创建钱包支付订单
     * @param {Object} state state
     * @return {Object} createWallet createWallet
     */
    machineCreateWallet(state) {
        return state.createWallet;
    },

    /**
     * 在线支付的支付状态
     * @param {Object} state state
     * @return {Object} payState payState
     */
    machinePayState(state) {
        return state.payState;
    }
};

export default {
    state,
    mutations,
    actions,
    getters
};
