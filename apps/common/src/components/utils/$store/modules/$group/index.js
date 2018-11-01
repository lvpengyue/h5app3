import util from 'util';
import $apiConf from '../../../$api-conf';



const state = {

    /**
     * rsa加密字符串
     * @type {String}
     */
    rsa: '',

    /**
     * 用户信息
     * @type {Object}
     */
    userData: '',

    /**
     * 收货地址
     */
    address: '',

    /**
     * 3.0首页入口获取的加密字符串
     */
    rsa3: '0cd61d35faf4b411c28ed248530b8d8874567f5813b00c5b3fa1ec491b777145d162c892d9833e9d4f37ea5b958aab312da95d3e66f3cc4133c121fc40c7946cf31ba6c163f05f221294ad2b9401401e3f6c0af6ba96c48634b41091a47f4233f55e5360b76bf2b6e71fadc17afb4648d85516c0db75847bff34c003a3119656',

    user3: '', // 用户信息

    userAccount3: '', // 用户认证地址

    config3: '', // 配置信息

    location3: '', // 定位信息

    sourceParams3: {
        reqType: 'wxMp',
        wxAppid: 'wx94393c7b982e87443a82ab383c6f59ff',
        apiSign: '',
        apiTimestamp: 0,
        token: '7C23AD34C76B899A34EBB74F226DB87F',
        userId: 2335
    },
    washerId3: '', // 选中的洗衣机id
    washCircle3: {  // 控制大小洗衣球的展示
        big: false,
        small: false
    },
    popAd3: false, // 是否显示弹窗广告，控制弹窗广告只在首次进入首页的时候显示一次
    complete3: false, // 是否显示完善信息  上面这两个参数在是在进入首页的时候显示一次
    areaId3: '' // 保存的是用户选择的洗衣机范围id，如果有此id，直接跳过地址列表，进入洗衣机页面
};

const $GROUP_SET_RSA = '$GROUP_SET_RSA';
const $GROUP_SET_RSA3 = '$GROUP_SET_RSA3';
const $GROUP_SET_USER_DATA = '$GROUP_SET_USER_DATA';
const $GROUP_SET_ADDRESS = '$GROUP_SET_ADDRESS';
const $GROUP_SET_USER3 = '$GROUP_SET_USER3';
const $GROUP_SET_USER_ACCOUNT3 = '$GROUP_SET_USER_ACCOUNT3';
const $GROUP_SET_CONFIG3 = '$GROUP_SET_CONFIG3';
const $GROUP_SET_SOURCE_PARAMS3 = '$GROUP_SET_SOURCE_PARAMS3';
const $GROUP_SET_LOCATION3 = '$GROUP_SET_LOCATION3';
const $GROUP_SET_WASHERID3 = '$GROUP_SET_WASHERID3';
const $GROUP_SET_WASH_CIRCLE3 = 'GROUP_SET_WASH_CIRCLE3';
const $GROUP_SET_POPAD3 = 'GROUP_SET_POPAD3';
const $GROUP_SET_COMPLETE3 = 'GROUP_SET_COMPLETE3';
const $GROUP_SET_AREA_ID3 = 'GROUP_SET_AREA_ID3';

const mutations = {
    /**
     * rsa加密字符串
     * @param {Object} state state
     * @param {FSA} mutation mutation
     */
    [$GROUP_SET_RSA](state, mutation) {
        state.rsa = mutation.payload;
    },

    /**
     * 用户信息
     * @param {Object} state state
     * @param {FSA} mutation mutation
     */
    [$GROUP_SET_USER_DATA](state, mutation) {
        state.userData = mutation.payload;
    },

    /**
     * 收货信息
     * @param {Object} state state
     * @param {FSA} mutation mutation
     */
    [$GROUP_SET_ADDRESS](state, mutation) {
        state.address = mutation.payload;
    },

    /**
     * rsa3加密字符串
     * @param {Object} state state
     * @param {FSA} mutation mutation
     */
    [$GROUP_SET_RSA3](state, mutation) {
        state.rsa3 = mutation.payload;
    },

    /**
     * 3.0用户信息
     * @param {Object} state state
     * @param {FSA} mutation mutation
     */
    [$GROUP_SET_USER3](state, mutation) {
        state.user3 = mutation.payload;
    },

    /**
     * 3.0 用户认证地址
     * @param {Object} state state
     * @param {FSA} mutation mutation
     */
    [$GROUP_SET_USER_ACCOUNT3](state, mutation) {
        state.userAccount3 = mutation.payload;
    },

    /**
     * 3.0 配置信息
     * @param {Object} state state
     * @param {FSA} mutation mutation
     */
    [$GROUP_SET_CONFIG3](state, mutation) {
        state.config3 = mutation.payload;
    },

    /**
     * 3.0 接口基础校验参数
     * @param {Object} state state
     * @param {FSA} mutation mutation
     */
    [$GROUP_SET_SOURCE_PARAMS3](state, mutation) {
        state.sourceParams3 = Object.assign({}, state.sourceParams3, mutation.payload);
    },

    /**
     * 3.0 定位信息
     * @param {Object} state state
     * @param {FSA} mutation mutation
     */
    [$GROUP_SET_LOCATION3](state, mutation) {
        state.location3 = mutation.payload;
    },

    /**
     * 3.0选中的洗衣机id
     * @param {Object} state state
     * @param {FSA} mutation mutation
     */
    [$GROUP_SET_WASHERID3](state, mutation) {
        state.washerId3 = mutation.payload;
    },

    /**
     * 3.0大小洗衣球的控制
     * @param {Object} state state
     * @param {FSA} mutation mutation
     */
    [$GROUP_SET_WASH_CIRCLE3](state, mutation) {
        state.washCircle3 = mutation.payload;
    },

    /**
     * 3.0弹窗广告是否展示
     * @param {Object} state state
     * @param {FSA} mutation mutation
     */
    [$GROUP_SET_POPAD3](state, mutation) {
        state.popAd3 = mutation.payload;
    },

    /**
     * 3.0是否展示完善信息弹框
     * @param {Object} state state
     * @param {FSA} mutation mutation
     */
    [$GROUP_SET_COMPLETE3](state, mutation) {
        state.complete3 = mutation.payload;
    },

    /**
     * 3.0是否进入选择地址列表
     * @param {Object} state state
     * @param {FSA} mutation mutation
     */
    [$GROUP_SET_AREA_ID3](state, mutation) {
        state.areaId3 = mutation.payload;
    }
};

const actions = {

    /**
     * rsa加密字符串
     * @method $groupSetAccount
     * @param {Object} context context
     * @param {String} info rsa加密字符串
     */
    async $groupSetRsa({
        commit
    }, info) {
        if (util.isString(info)) {
            commit({
                type: $GROUP_SET_RSA,
                payload: info
            });
        } else {
            throw new Error('$groupSetRsa invalid info');
        }
    },

    /**
     * 用户信息
     * @method $groupSetAccount
     * @param {Object} context context
     * @param {Object} info 用户信息
     */
    async $groupSetUserData({
        commit
    }, info) {
        commit({
            type: $GROUP_SET_USER_DATA,
            payload: info
        });
    },

    /**
     * 保存收货地址
     * @method $groupSetAccount
     * @param {Object} context context
     * @param {Object} info 用户信息
     */
    async $groupSetGetAddress({
        commit
    }, info) {
        commit({
            type: $GROUP_SET_ADDRESS,
            payload: info
        });
    },


    /**
     * 调用添加收货地址
     * @param {Object} context context
     * @param {Object} params {id, token, userid}
     */
    async $groupSetAddress({
        commit,
        dispatch,
        state
    }, params) {
        try {
            const response = await dispatch('$apisCall', {
                config: $apiConf.API_ADDRESS_SAVE,
                params
            });

            if (response.code !== 1) {
                alert(response.msg);
            }

            commit({
                type: $GROUP_SET_ADDRESS,
                payload: response
            });
        } catch (error) {
            alert('添加收货地址失败');
        }
    },

    /**
     * 3.0加密字符串
     * @method $groupSetUser3
     * @param {Object} context context
     * @param {Object} info 用户信息
     */
    async $groupSetRsa3({
        commit
    }, info) {
        commit({
            type: $GROUP_SET_RSA3,
            payload: info
        });
    },

    /**
     * 3.0选中洗衣机id
     * @method $groupSetUser3
     * @param {Object} context context
     * @param {Object} info 用户信息
     */
    $groupSetWasherId3({
        commit
    }, info) {
        commit({
            type: $GROUP_SET_WASHERID3,
            payload: info
        });
    },


    /**
     * 调用获取设置的接口
     * @param {Object} context context
     */
    // async $groupSetConfig3({
    //     commit,
    //     dispatch,
    //     state
    // }) {
    //     try {
    //         const response = await dispatch('$apisCall', {
    //             config: $apiConf.API_MALL_PRODUCT_LIST
    //         });

    //         if (response.code !== 1) {
    //             alert(response.info);
    //         }

    //         commit({
    //             type: MALL_HOME_SET_DATA,
    //             payload: response
    //         });
    //     } catch (error) {
    //         console.log(`获取商城列表失败:${error.code}`);
    //     }
    // }

    /**
     * 3.0用户信息
     * @method $groupSetUser3
     * @param {Object} context context
     * @param {Object} info 用户信息
     */
    async $groupSetUser3({
        commit
    }, info) {
        commit({
            type: $GROUP_SET_USER3,
            payload: info
        });
    },

    /**
     * 3.0用户认证地址
     * @method $groupSetUserAccount3
     * @param {Object} context context
     * @param {Object} info 用户信息
     */
    async $groupSetUserAccount3({
        commit
    }, info) {
        commit({
            type: $GROUP_SET_USER_ACCOUNT3,
            payload: info
        });
    },

    /**
     * 3.0 配置信息
     * @method $groupSetUserAccount3
     * @param {Object} context context
     * @param {Object} config 配置信息
     */
    async $groupSetConfig3({
        commit
    }, config) {
        commit({
            type: $GROUP_SET_CONFIG3,
            payload: config
        });
    },

    /**
     * 3.0 接口基础校验参数
     * @method $groupSetUserAccount3
     * @param {Object} context context
     * @param {Object} params 参数信息
     */
    async $groupSetSourceParams3({
        commit
    }, params) {
        commit({
            type: $GROUP_SET_SOURCE_PARAMS3,
            payload: params
        });
    },

    /**
     * 保存定位信息
     * @method $groupSetLocation3
     * @param {Object} context context
     * @param {Object} info 定位信息
     */
    async $groupSetLocation3({
        commit
    }, info) {
        commit({
            type: $GROUP_SET_LOCATION3,
            payload: info
        });
    },

    /**
     * 设置大小弹框展示
     * @param {Object} context context
     * @param {Object} params {userId, token}
     */
    async $groupSetWashCircle3({
        commit,
        dispatch,
        state
    }, params) {
        commit({
            type: $GROUP_SET_WASH_CIRCLE3,
            payload: params
        });
    },

    /**
     * 设置弹框显示
     * @param {Object} context context
     * @param {Object} params {userId, token}
     */
    $groupSetPopad3({
        commit,
        dispatch,
        state
    }, params) {
        commit({
            type: $GROUP_SET_POPAD3,
            payload: params
        });
    },

    /**
     * 设置完善信息的显示
     * @param {Object} context context
     * @param {Object} params {userId, token}
     */
    async $groupSetComplete3({
        commit,
        dispatch,
        state
    }, params) {
        commit({
            type: $GROUP_SET_COMPLETE3,
            payload: params
        });
    },

    /**
     * 设置选中区域的id
     * @param {Object} context context
     * @param {Number} params areaId
     */
    async $groupSetAreaId3({
        commit,
        dispatch,
        state
    }, params) {
        commit({
            type: $GROUP_SET_AREA_ID3,
            payload: params
        });
    }
};

const getters = {

    /**
     * 获取rsa
     * @param {Object} state 状态数据
     * @return {Object} state.rsa 用户对象
     */
    $groupRsa(state) {
        return state.rsa;
    },

    /**
     * 获取rsa3
     * @param {Object} state 状态数据
     * @return {Object} state.rsa 用户对象
     */
    $groupRsa3(state) {
        return state.rsa3;
    },

    /**
     * 获取userData
     * @param {Object} state 状态数据
     * @return {Object} state.userData 用户对象
     */
    $groupUserData(state) {
        return state.userData;
    },

    /**
     * 获取address
     * @param {Object} state 状态数据
     * @return {Object} state.address 收货地址
     */
    $groupAddress(state) {
        return state.address;
    },

    /**
     * 获取3.0用户信息
     * @param {Object} state 状态数据
     * @return {Object} state.user3 用户信息
     */
    $groupUser3(state) {
        return state.user3;
    },

    /**
     * 获取3.0用户认证地址
     * @param {Object} state 状态数据
     * @return {Object} state.userAccount3 用户认证地址
     */
    $groupUserAccount3(state) {
        return state.userAccount3;
    },

    /**
     * 获取3.0配置信息
     * @param {Object} state 状态数据
     * @return {Object} state.config3 用户认证地址
     */
    $groupUserConfig3(state) {
        return state.config3;
    },

    /**
     * 获取3.0定位信息
     * @param {Object} state 状态数据
     * @return {Object} state.location3 用户定位信息
     */
    $groupLocation3(state) {
        return state.location3;
    },

    /**
     * 获取3.0选中洗衣机id
     * @param {Object} state 状态数据
     * @return {Object} state.washerId3 用户选中洗衣机id
     */
    $groupWasherId3(state) {
        return state.washerId3;
    },

    /**
     * 获取3.0接口基础参数
     * @param {Object} state 状态数据
     * @return {Object} state.sourceParams3 接口基础参数
     */
    $groupSourceParams3(state) {
        return state.sourceParams3;
    },

    /**
     * 获取3.0大小洗衣球展示
     * @param {Object} state 状态数据
     * @return {Object} state.washCircle3 washCircle3
     */
    $groupWashCircle3(state) {
        return state.washCircle3;
    },

    /**
     * 获取3.0是否展示弹窗广告
     * @param {Object} state 状态数据
     * @return {Object} state.popAd3 popAd3
     */
    $groupPopad3(state) {
        return state.popAd3;
    },

    /**
     * 获取3.0是否展示完善信息的弹框
     * @param {Object} state 状态数据
     * @return {Object} state.complete3 complete3
     */
    $groupComplete3(state) {
        return state.complete3;
    },

    /**
     * 获取3.0选中洗衣机区域id
     * @param {Object} state 状态数据
     * @return {Object} state.complete3 complete3
     */
    $groupAreaId3(state) {
        return state.areaId3;
    }
};

export default {
    state,
    mutations,
    actions,
    getters
};
