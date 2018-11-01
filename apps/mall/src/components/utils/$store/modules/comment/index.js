import util from 'util';
import $apiConf from '../../../$api-conf';



const state = {

    /**
     * 文件上传详情
     * @type {Object}
     */
    upload: '',

    // 评价提交详情
    data: ''
};

const COMMENT_SET_UPLOAD = 'COMMENT_SET_UPLOAD';
const COMMENT_SET_DATA = 'COMMENT_SET_DATA';

const mutations = {

    /**
     * 设置文件上传
     * @param {Object} state state
     * @param {FSA} mutation mutation
     */
    [COMMENT_SET_UPLOAD](state, mutation) {
        state.upload = mutation.payload;
    },

    /**
     * 设置评价提交
     * @param {Object} state state
     * @param {FSA} mutation mutation
     */
    [COMMENT_SET_DATA](state, mutation) {
        state.data = mutation.payload;
    }
};

const actions = {
    /**
     * 调用获取文件上传的接口
     * @param {Object} context context
     * @param {Object} params file文件
     */
    async commentToUpload({
        commit,
        dispatch,
        state
    }, params) {
        try {
            const response = await dispatch('$apisCall', {
                config: $apiConf.FILE_UPLOAD_BASE64,
                params
            });

            if (response.code !== 1) {
                alert(response.info);
            }

            commit({
                type: COMMENT_SET_UPLOAD,
                payload: response
            });
        } catch (error) {
            console.log(`获取文件上传失败:${error.code}`);
        }
    },

    /**
     * 调用获取评价提交的接口
     * @param {Object} context context
     * @param {Object} params 评价内容
     */
    async commentGetData({
        commit,
        dispatch,
        state
    }, params) {
        try {
            const response = await dispatch('$apisCall', {
                config: $apiConf.API_COMMENT_RELEASE_COMMENT,
                params: Object.assign(
                    {},
                    this.getters.$groupSourceParams3,
                    {
                        apiTimestamp: +new Date()
                    },
                    params
                )
            });

            if (response.code !== 1) {
                alert(response.info);
            }

            commit({
                type: COMMENT_SET_DATA,
                payload: response
            });
        } catch (error) {
            console.log(`获取发布评价失败:${error.code}`);
        }
    }
};

const getters = {

    /**
     * 获取文件上传
     * @param {Object} state state
     * @return {Object} upload 文件上传
     */
    commentUpload(state) {
        return state.upload;
    },

    /**
     * 获取评价
     * @param {Object} state state
     * @return {Object} data 评价提交
     */
    commentData(state) {
        return state.data;
    }
};

export default {
    state,
    mutations,
    actions,
    getters
};
