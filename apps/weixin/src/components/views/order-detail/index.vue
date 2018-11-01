<template>
    <div class="order-detail"
         v-if="orderDetail && orderDetail.data && orderDetail.data.isPaySuccess">
        <div class="share-wrap"
             @click="hideShare()"
             v-show="shareVisible">
            <img src="./assets/share-register.png"
                 class="share-register">
        </div>
        <div class="order-status">
            <p>订单号 {{orderDetail.data.productOrder.orderId}}</p>
            <p class="status"
               v-if="orderDetail.data.productOrder.groupStatus === 3">{{orderDetail.data.productOrder.statusStr}}</p>
            <p class="status"
               v-else>{{orderDetail.data.productOrder.groupStatus === 1 ? '拼团中' : '拼团失败'}}</p>
        </div>
        <address-box @showEdit="showEdit()"
                     :eidtValid="false"></address-box>
        <shop-description :shopOrder="orderDetail.data.productOrder"></shop-description>
        <div class="tip"
             v-if="orderDetail.data.rider.userType === 3">
            <img src="./assets/tip@2x.png"
                 alt=""> 当前地址仅支持自提，自提地址：{{orderDetail.data.rider.address}}
        </div>
        <div class="people-wrap"
             v-if="orderDetail.data.productOrder.groupStatus !== 3">
            <people-num :peopleData="orderDetail"></people-num>
            <van-button type="primary"
                        @click="handleShare()">分享好友</van-button>
        </div>
        <div class="trans-message"
             v-if="orderDetail.data.productOrder.groupStatus === 3 && orderDetail.data.rider.userType !== 3">
            <van-cell title="配送编码"
                      :value="orderDetail.data.productOrder.sendCode"></van-cell>
            <van-cell title="配送骑手">
                <span class="link-rider"
                      @click="linkRider()">联系骑手</span> | {{orderDetail.data.rider.userName}}
            </van-cell>
            <van-cell title="下单时间"
                      :value="orderDetail.data.productOrder.createTime"></van-cell>
            <van-cell title="发货时间"
                      :value="orderDetail.data.productOrder.sendTime"></van-cell>
        </div>
    </div>
</template>

<script src="./index.js"></script>
<style lang="scss" src="./index.scss"></style>
