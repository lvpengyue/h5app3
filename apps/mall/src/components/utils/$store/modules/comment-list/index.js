import util from 'util';
import $apiConf from '../../../$api-conf';



const state = {

    /**
     * 评论列表详情
     * @type {Object}
     */
    data: ''
};

const COMMENT_LIST_SET_DATA = 'COMMENT_LIST_SET_DATA';

const mutations = {

    /**
     * 设置评论列表
     * @param {Object} state state
     * @param {FSA} mutation mutation
     */
    [COMMENT_LIST_SET_DATA](state, mutation) {
        state.data = mutation.payload;
    }
};

const actions = {
    /**
     * 调用获取评论列表的接口
     * @param {Object} context context
     * @param {Object} params availabel/fromUserId/pageNum/pageSize/productId
     */
    async commentListGetData({
        commit,
        dispatch,
        state
    }, params) {
        try {
            let response = '';

            if (params.fromUserId) {
                response = await dispatch('$apisCall', {
                    config: $apiConf.API_COMMENT_PERSONAL_LIST,
                    params: Object.assign(
                        {},
                        this.getters.$groupSourceParams3,
                        {
                            apiTimestamp: +new Date()
                        },
                        params
                    )
                });
            } else {
                response = await dispatch('$apisCall', {
                    config: $apiConf.API_COMMENT_LIST,
                    params: Object.assign(
                        {},
                        this.getters.$groupSourceParams3,
                        {
                            apiTimestamp: +new Date()
                        },
                        params
                    )
                });
            }

            if (response.code !== 1) {
                alert(response.info);
            }

            commit({
                type: COMMENT_LIST_SET_DATA,
                payload: response
            });
        } catch (error) {
            console.log(`获取评论列表失败:${error.code}`);
        }
    }
};

const getters = {

    /**
     * 获取评论列表
     * @param {Object} state state
     * @return {Object} data 评论列表
     */
    commentListData(state) {
        return state.data;
    }
};

export default {
    state,
    mutations,
    actions,
    getters
};
