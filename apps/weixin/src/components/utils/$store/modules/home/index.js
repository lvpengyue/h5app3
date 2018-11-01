import util from 'util';
import $apiConf from '../../../$api-conf';



const state = {

    /**
     * 首页信息
     * @type {String}
     */
    detail: '',

    /**
     * 配置数据
    */
    config: '',

    /**
     * 微信支付基础配置
    */
    wxconfig: '',

    /**
     * 用户中心的数据
    */
    userCenter: '',
    scan: '', // 调用扫码洗衣

    popAd: false, // 是否显示弹窗广告，控制弹窗广告只在首次进入首页的时候显示一次

    complete: false // 是否显示完善信息  上面这两个参数在是在进入首页的时候显示一次
};

const HOME_SET_DETAIL = 'HOME_SET_DETAIL';
const HOME_SET_CONFIG = 'HOME_SET_CONFIG';
const HOME_SET_WXCONFIG = 'HOME_SET_WXCONFIG';
const HOME_SET_USER_CENTER = 'HOME_SET_USER_CENTER';
const HOME_SET_POPAD = 'HOME_SET_POPAD';
const HOME_SET_COMPLETE = 'HOME_SET_COMPLETE';
const HOME_SET_SCAN = 'HOME_SET_SCAN';

const mutations = {

    /**
     * 首页的数据
     * @param {Object} state state
     * @param {FSA} mutation mutation
     */
    [HOME_SET_DETAIL](state, mutation) {
        state.detail = mutation.payload;
    },

    /**
     * 配置信息
     * @param {Object} state state
     * @param {FSA} mutation mutation
     */
    [HOME_SET_CONFIG](state, mutation) {
        state.config = mutation.payload;
    },

    /**
     * 微信配置信息
     * @param {Object} state state
     * @param {FSA} mutation mutation
     */
    [HOME_SET_WXCONFIG](state, mutation) {
        state.wxconfig = mutation.payload;
    },

    /**
     * 用户中心信息
     * @param {Object} state state
     * @param {FSA} mutation mutation
     */
    [HOME_SET_USER_CENTER](state, mutation) {
        state.userCenter = mutation.payload;
    },

    /**
     * 设置首页的弹框信息为true,不显示
     * @param {Object} state state
     * @param {FSA} mutation mutation
     */
    [HOME_SET_POPAD](state, mutation) {
        state.popAd = mutation.payload;
    },

    /**
     * 扫码洗衣
     * @param {Object} state state
     * @param {FSA} mutation mutation
     */
    [HOME_SET_SCAN](state, mutation) {
        state.scan = mutation.payload;
    },

    /**
     * 设置首页的完善信息弹框为true,不显示
     * @param {Object} state state
     * @param {FSA} mutation mutation
     */
    [HOME_SET_COMPLETE](state, mutation) {
        state.complete = mutation.payload;
    }
};

const actions = {
    /**
     * 首页数据
     * @param {Object} context context
     * @param {Object} params params
     */
    async homeGetDetail({
        commit,
        dispatch,
        state
    }, params) {
        try {
            const response = await dispatch('$apisCall', {
                config: $apiConf.API_REQUEST_FORM,
                params: Object.assign({}, {
                    uri: '/api/washer/index'
                }, params)
            });

            if (response.code !== 1) {
                console.log(response.msg);
            }
            commit({
                type: HOME_SET_DETAIL,
                payload: response
            });
        } catch (error) {
            console.log('创建首页信息失败');
        }
    },

    /**
     * 获取配置信息
     * @param {Object} context context
     * @param {Object} params {userId 可不传}
     */
    async homeGetConfig({
        commit,
        dispatch,
        state
    }, params) {
        try {
            const response = await dispatch('$apisCall', {
                config: $apiConf.API_REQUEST_FORM,
                params: Object.assign({}, {
                    uri: '/api/index/config'
                }, params)
            });

            commit({
                type: HOME_SET_CONFIG,
                payload: response
            });
        } catch (error) {
            console.log('获取配置数据失败');
        }
    },

    /**
     * 获取微信基础配置数据
     * @param {Object} context context
     */
    async homeGetWxconfig({
        commit,
        dispatch,
        state
    }, params) {
        try {
            const response = await dispatch('$apisCall', {
                config: $apiConf.MALL_GET_CONFIG,
                params
            });

            commit({
                type: HOME_SET_WXCONFIG,
                payload: response
            });
        } catch (error) {
            console.log('获取微信配置失败');
        }
    },

    /**
     * 获取用户中心数据
     * @param {Object} context context
     * @param {Object} params {userId, token}
     */
    async homeGetUserCenter({
        commit,
        dispatch,
        state
    }, params) {
        try {
            const response = await dispatch('$apisCall', {
                config: $apiConf.API_REQUEST_FORM,
                params: Object.assign({}, {
                    uri: '/api/user/center'
                }, params)
            });

            commit({
                type: HOME_SET_USER_CENTER,
                payload: response
            });
        } catch (error) {
            console.log('获取用户中心数据失败');
        }
    },

    /**
     * 扫码洗衣
     * @param {Object} context context
     * @param {Object} params {userId, token}
     */
    async homeGetScan({
        commit,
        dispatch,
        state
    }, params) {
        try {
            const response = await dispatch('$apisCall', {
                config: $apiConf.API_REQUEST_FORM,
                params: Object.assign({},
                    params,
                    {
                        uri: '/api/washer/scan-code'
                    },
                    this.getters.$groupSourceParams3)
            });

            commit({
                type: HOME_SET_SCAN,
                payload: response
            });
        } catch (error) {
            console.log('扫码绑定失败');
        }
    },

    /**
     * 设置弹框显示
     * @param {Object} context context
     * @param {Object} params {userId, token}
     */
    async homeSetPopad({
        commit,
        dispatch,
        state
    }, params) {
        commit({
            type: HOME_SET_POPAD,
            payload: params
        });
    },

    /**
     * 设置完善信息的显示
     * @param {Object} context context
     * @param {Object} params {userId, token}
     */
    async homeSetComplete({
        commit,
        dispatch,
        state
    }, params) {
        commit({
            type: HOME_SET_COMPLETE,
            payload: params
        });
    }
};

const getters = {

    /**
     * 获取首页详情
     * @param {Object} state state
     * @return {Object} input 商品详情
     */
    homeDetail(state) {
        return state.detail;
    },

    /**
     * 获取配置信息
     * @param {Object} state state
     * @return {Object} config 配置信息
     */
    homeConfig(state) {
        return state.config;
    },

    /**
     * 获取微信配置
     * @param {Object} state state
     * @return {Object} wxconfig 微信配置详情
     */
    homeWxconfig(state) {
        return state.wxconfig;
    },

    /**
     * 获取用户中心
     *
     * @param {Object} state state
     * @returns {Object} userCenter 用户中心
     */
    homeUserCenter(state) {
        return state.userCenter;
    },

    /**
     * 扫码绑定
     *
     * @param {Object} state state
     * @returns {Object} scan scan
     */
    homeScan(state) {
        return state.scan;
    },

    /**
     * 获取弹框广告是否显示
     *
     * @param {Object} state state
     * @returns {Object} popAd 弹框广告是否显示
     */
    homePopad(state) {
        return state.popAd;
    },

    /**
     * 获取完善信息弹框是否显示
     *
     * @param {Object} state state
     * @returns {Object} complete 完善信息弹框是否显示
     */
    homeComplete(state) {
        return state.complete;
    }
};

export default {
    state,
    mutations,
    actions,
    getters
};
