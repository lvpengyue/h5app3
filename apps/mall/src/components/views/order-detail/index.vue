<template>
    <div class="order-detail"
         v-if="orderDetailData && orderDetailData.data">
        <div class="share-wrap"
             @click="hideShare()"
             v-show="shareVisible">
            <img src="./assets/share-register.png"
                 class="share-register">
        </div>
        <div class="order-status" v-if="orderDetailData.data.productOrder.orderType === 1">
            <p>订单号 {{orderDetailData.data.productOrder.orderId}}</p>
            <p class="status"
               v-if="orderDetailData.data.productOrder.groupStatus === 3">{{orderDetailData.data.productOrder.statusStr}}</p>
            <p class="status"
               v-else>{{orderDetailData.data.productOrder.groupStatus === 1 ? '拼团中' : '拼团失败'}}</p>
        </div>
        <address-box @showEdit="showEdit()"
                     :data="addressObject"
                     :eidtValid="false"></address-box>
        <shop-description :shopData="shopData"></shop-description>
        <div class="people-wrap"
             v-if="orderDetailData.data.productOrder.orderType === 1 && orderDetailData.data.productOrder.groupStatus === 1">
            <people-num :peopleData="orderDetailData"></people-num>
            <van-button type="primary"
                        @click="handleShare()">分享好友</van-button>
        </div>
        <div class="trans-message"
             v-if="(orderDetailData.data.productOrder.orderType === 1 && orderDetailData.data.productOrder.groupStatus === 3 && orderDetailData.data.rider.userType !== 3) || (orderDetailData.data.productOrder.orderType === 0 && orderDetailData.data.productOrder.payStatus >= 5 && orderDetailData.data.rider.userType !== 3)">
            <van-cell title="配送编码"
                      :value="orderDetailData.data.productOrder.sendCode"></van-cell>
            <van-cell title="配送骑手">
                <span class="link-rider"
                      @click="linkRider()">联系骑手</span> | {{orderDetailData.data.rider.userName}}
            </van-cell>
            <van-cell title="下单时间"
                      :value="orderDetailData.data.productOrder.createTime"></van-cell>
            <van-cell title="发货时间"
                      :value="orderDetailData.data.productOrder.sendTime"></van-cell>
            <van-cell title="我的评价" @click="toMyComment()" is-link />
        </div>
        <div class="trans-message"
             v-if="(orderDetailData.data.productOrder.orderType === 1 && orderDetailData.data.productOrder.groupStatus === 3 && orderDetailData.data.rider.userType === 3) || (orderDetailData.data.productOrder.orderType === 0 && orderDetailData.data.productOrder.payStatus >= 5 && orderDetailData.data.rider.userType === 3)">
            <van-cell title="收货码"
                      :value="orderDetailData.data.productOrder.sendCode"></van-cell>
            <van-cell title="联系商家">
                <span class="link-rider"
                      @click="linkRider()">联系商家</span> | {{orderDetailData.data.rider.userName}}
            </van-cell>
            <van-cell title="自提地址"
                      class="get_address"
                      :value="orderDetailData.data.rider.address"></van-cell>
            <van-cell title="下单时间"
                      :value="orderDetailData.data.productOrder.createTime"></van-cell>
            <van-cell title="我的评价" @click="toMyComment()" is-link />
        </div>
    </div>
</template>

<script src="./index.js"></script>
<style lang="scss" src="./index.scss"></style>
