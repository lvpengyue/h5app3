<template>
    <div class="shop-detail"
         v-if="shopDetailData && shopDetailData.data">
        <div class="content-wrap">
            <van-swipe :autoplay="3000">
                <van-swipe-item>
                    <img :src="shopDetailData.data.mallProduct.image+'?x-oss-process=image/resize,m_fill,h_1440,w_1500'"
                         alt=""
                         class="big-img">
                </van-swipe-item>
            </van-swipe>
            <div class="desc">
                <div class="title">
                    <div class="price-now">￥
                        <span>{{shopDetailData.data.mallProduct.price / 100}}</span>
                    </div>
                    <div class="price-old">￥{{shopDetailData.data.mallProduct.oriPrice / 100}}</div>
                    <div class="discountStr"
                         v-show="shopDetailData.data.discountStr">{{shopDetailData.data.discountStr}}</div>
                </div>

                <div class="description">
                    <div>
                        快递: 免运费
                    </div>
                    <div>
                        <span v-if="shopDetailData.data.mallProduct.type === 1">
                            已拼{{shopDetailData.data.mallProduct.clickTimes}}件·4人拼团
                        </span>
                        <span v-else>
                            已售出{{shopDetailData.data.mallProduct.clickTimes}}件
                        </span>
                    </div>
                </div>

                <h3 class="name">
                    {{shopDetailData.data.mallProduct.name}}
                </h3>

                <div class="shop-label">
                    <p>
                        自营品牌,悠洗定制
                    </p>
                    <p>
                        迅捷配送,便利自提
                    </p>
                    <p>
                        拼团发起者在拼团成功后可立即获得2张免息券哦！
                    </p>
                </div>
            </div>
            <div class="coupons">
                <div>
                    优惠券
                </div>
                <div class="use-coupon"
                     @click="showOrHideCoupons">
                    <p>
                        <span v-show="showUseCouponNum">
                            <template v-if="shopDetailData.data.coupons.length">
                                {{shopDetailData.data.coupons.length}}个可用
                            </template>
                            <template v-else>
                                暂无可用
                            </template>
                        </span>
                        <span v-show="!showUseCouponNum">使用{{this.discount * 10}}折优惠券</span>
                    </p>
                    <van-icon name="arrow"></van-icon>
                </div>
            </div>
            <div class="group"
                 v-show="shopDetailData.data.groupOrderList &&　shopDetailData.data.groupOrderList.length > 0">
                <div class="title">
                    <p>{{shopDetailData.data.groupOrderCount}}人在拼团，可直接参与</p>
                    <div @click="showOrHideGroup">
                        <span>查看更多</span>
                        <van-icon name="arrow"></van-icon>
                    </div>
                </div>
                <div class="each-group"
                     v-show="index < 2"
                     v-for="(item, index) in shopDetailData.data.groupOrderList">
                    <div class="left">
                        <div class="user-img">
                            <img :src="item.groupUserPic+'?x-oss-process=image/resize,m_fill,h_180,w_180'"
                                 alt="">
                        </div>
                        <p>{{item.groupUserName}}</p>
                    </div>
                    <div class="right">
                        <div class="group-message">
                            <p class="people-num">还差
                                <span>{{item.count}}人</span>拼成</p>
                            <p class="end-time">剩余{{commonFunctions.formateTime(groupLeftTimes[index])}}</p>
                        </div>
                        <div class="go-group"
                             @click="toGroupBuy(item.productOrderId)">
                            去参团
                        </div>
                    </div>
                </div>
            </div>

            <div class="comment">
                <div class="title">
                    <div>商品评价 ({{shopDetailData.data.commentNum}})</div>
                    <div @click="toLocation('comment-list')">
                        <span>查看全部</span>
                        <van-icon name="arrow"></van-icon>
                    </div>
                </div>
                <div v-for="item in shopDetailData.data.comment"
                     class="each-comment">
                    <div class="top">
                        <div class="logo">
                            <img :src="item.logo+'?x-oss-process=image/resize,m_fill,h_120,w_120'"
                                 alt="">
                        </div>
                        <div class="user">
                            <p>{{item.userName}}</p>
                            <div class="star">
                                <img src="./assets/yellow-star.png"
                                     alt=""
                                     v-for="n in item.star">
                                <span>{{starList[item.star]}}</span>
                            </div>
                        </div>
                        <div class="comment-time">
                            {{item.createTime}}
                        </div>
                    </div>
                    <div class="content">
                        {{item.content.trim()}}
                    </div>
                </div>
            </div>
            <van-tabs v-model="selected">
                <van-tab title="产品详情">
                    <div v-html="shopDetailData.data.mallProduct.oriDetailHtml">
                    </div>
                </van-tab>
                <van-tab title="购买须知">
                    <div v-html="shopDetailData.data.mallProduct.oriExtDesc1">
                    </div>
                </van-tab>
            </van-tabs>
            <!-- <div class="detail-wrap">
                <div class="title">
                    <div @click="changeDetail" :class="{detail_active: detailActive}">产品详情</div>
                    <div @click="changeDetail" :class="{detail_active: !detailActive}">购买须知</div>
                </div>
                <div class="content" v-html="detailActive ? shopDetailData.data.mallProduct.detailHtml : shopDetailData.data.mallProduct.extDesc1">
                </div>
            </div> -->
        </div>

        <div class="bottom-fixed">
            <div class="back-home">
                <img src="./assets/to-home.png" class="wap-home">
                <div @click="toMallHome()">首页</div>
            </div>
            <div class="to-buy buy-single"
                 @click="toBuy('single')">
                <div>￥{{(shopDetailData.data.mallProduct.price * discount / 100).toFixed(2)}}</div>
                <div>单独购买</div>
            </div>
            <div class="to-buy buy-group"
                 @click="toBuy('group')"
                 v-show="shopDetailData.data.mallProduct.type === 1">
                <div>￥{{shopDetailData.data.mallProduct.groupPrice / 100}}</div>
                <div>发起拼团</div>
            </div>
        </div>
        <van-popup v-model="show"
                   position="bottom"
                   :overlay="true">
            <div class="title">选择优惠券
                <van-icon name="close"
                          @click="showOrHideCoupons"></van-icon>
            </div>
            <div class="coupon-list">
                <template v-if="!shopDetailData.data.coupons.length && !shopDetailData.data.unCoupons.length">
                    <p class="empty-coupon-tip">
                        暂无优惠券，快去看看活动或去参加拼团吧！
                    </p>
                </template>
                <template v-else>
                    <div class="coupon"
                         @click="checkOrHideCoupon(item.id, item.discount)"
                         v-for="(item, index) in shopDetailData.data.coupons">
                        <div class="left">
                            <p class="name">{{item.couponName}}</p>
                            <p class="time">截止到 {{item.endDateStr}} 前使用</p>
                        </div>
                        <div class="right">
                            <span>{{item.discount * 10}}</span>折
                        </div>
                        <img src="./assets/checked.png"
                             v-show="item.id === userCouponId"
                             alt="">
                    </div>
                    <div class="coupon uncoupon"
                         v-for="(item, index) in shopDetailData.data.unCoupons">
                        <div class="left">
                            <p class="name">{{item.couponName}}</p>
                            <p class="time">截止到 {{item.endDateStr}} 前使用</p>
                        </div>
                        <div class="right">
                            <span>{{item.discount * 10}}</span>折
                        </div>
                    </div>
                </template>
            </div>
        </van-popup>
        <van-popup v-model="showGroup"
                   position="top"
                   class="group group-popup"
                   :overlay="true">
            <van-icon name="close"
                      @click="showOrHideGroup"></van-icon>
            <div class="title">正在拼团
            </div>
            <div class="coupon-list">
                <div class="each-group"
                     v-for="(item, index) in shopDetailData.data.groupOrderList">
                    <div class="left">
                        <div class="user-img">
                            <img :src="item.groupUserPic+'?x-oss-process=image/resize,m_fill,h_120,w_120'"
                                 alt="">
                        </div>
                        <div class="right-message">
                            <div class="right-top-message">
                                <p class="user">{{item.groupUserName}}</p>
                                <p class="num">还差
                                    <span>{{item.count}}人</span>
                                </p>
                            </div>
                            <div class="end-time">剩余{{commonFunctions.formateTime(groupLeftTimes[index])}}</div>
                        </div>

                    </div>
                    <div class="right">
                        <div class="go-group"
                             @click="toGroupBuy(item.productOrderId)">
                            去参团
                        </div>
                    </div>
                </div>
            </div>
        </van-popup>
    </div>
</template>

<script src="./index.js"></script>
<style lang="scss" src="./index.scss"></style>
