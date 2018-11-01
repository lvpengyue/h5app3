<template>
    <div class="redbag" v-if="redbagData && redbagData.data && redbagData.data.activityRedp" :style="{'background-image': `url('${redbagData.data.activityRedp.aliBgPic}')`}">
        <div class="top" v-if="redbagData && redbagData.data">
            <img :src="redbagData.data.activityRedp.aliBgLogoPic" alt="">
        </div>
        <div class="phone-wrap" v-show="!answer">
            <input type="number" @click="scrollTop" id="phone" placeholder="请输入您的手机号" v-model="telephone">
            <button @click="getRedBag">领红包</button>
        </div>
        <div class="empty-bag" v-show="answer" v-if="redbagCoupon && redbagCoupon.data && !redbagCoupon.data.coupon">
            领完啦
        </div>
        <div class="answer-wrap" v-show="answer" v-if="redbagCoupon && redbagCoupon.data && redbagCoupon.data.coupon">
            <div class="coupon-wrap">
                <div class="coupon-sale"><span>8.0</span>折</div>
                <div class="coupon-des">
                    <p>{{redbagCoupon.data.coupon.couponName}}</p>
                    <p>{{redbagCoupon.data.coupon.modelStr}}</p>
                    <p>
                        {{redbagCoupon.data.coupon.endDateStr}}到期
                    </p>

                </div>
            </div>
            <div class="coupon-phone">
                <span>优惠券已放入账户: </span>{{telephone ? telephone : this.$route.query.phone}}<span @click="showPhone" v-show="edit">, 修改 >></span>
            </div>
            <div class="open-app" id="open-app" v-html="link">
                <a href=""></a>
            </div>
        </div>

        <div class="list-wrap" v-show="answer"  v-if="redbagCoupon && redbagCoupon.data && redbagCoupon.data.redpList">
            <div class="rule-top">
                <div class="line"></div>
                <div class="rule-name">他们的红包是</div>
                <div class="line"></div>
            </div>
            <div class="each-list" v-for="item in redbagCoupon.data.redpList">
                <div class="list-left">
                    <div>
                        <img :src="item.aliUserPic" alt="">
                    </div>
                    <div class="left-right">
                        <p>{{item.userName}}</p>
                        <p>{{item.createTime}}</p>
                    </div>
                </div>
                <div class="list-right">
                    {{(item.couponDiscount * 10).toFixed(1)}}折
                </div>
            </div>
        </div>
        <div class="rules">
            <div class="rule-top">
                <div class="line"></div>
                <div class="rule-name">活动规则</div>
                <div class="line"></div>
            </div>
            <div class="rule-content">
                <p>
                    1.“快速洗”/“标准洗”模式下单支付后即可分享红包给好友，仅限App内下单才可分享，红包内容为免洗券及折扣券。
                </p>
                <p>
                    2.每个链接仅限10人领取。
                </p>
                <p>
                    3.每人每天最多可领取1次，红包不找零，不可叠加使用，红包有效期为7天。
                </p>
                <p>
                    4.领取红包时输入的手机号和账号绑定手机号需为同一手机号才可使用。
                </p>
                <p>
                    5.优惠券在app、微信公众号都可使用。
                </p>
                <p>
                    6.活动时间：2018年8月31日~9月4日。
                </p>
                <p>
                    7.其他未尽事宜，请咨询客服：400-996-6220。
                </p>
                <p>
                    8.本活动最终解释权归厦门悠生活网络科技有限公司所有。
                </p>
            </div>
        </div>
    </div>
</template>

<style lang="scss" src="./index.scss"></style>
<script src="./index.js"></script>
