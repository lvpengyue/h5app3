export default {
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
     * 获取微信3.0数据的通用接口
    */
    API_REQUEST_FORM: {
        name: 'API_REQUEST_FORM',

        proxy: {
            url: '/api/request/form',
            method: 'GET',
            dataType: 'json',
            xhrFields: {
                withCredentials: true
            }
        }
    },

    FILE_UPLOAD_BASE64: {

        /**
         * 文件上传
         * @type {String}
         */
        name: 'FILE_UPLOAD_BASE64',

        /**
         * 请求参数
         * @type {Object}
         */
        proxy: {
            url: '/fileupload/base64',
            method: 'POST',
            dataType: 'json',
            xhrFields: {
                withCredentials: true
            }
        }
    }
};
