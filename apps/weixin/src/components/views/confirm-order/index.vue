<template>
    <div class="confirm-order" v-if="confirmOrderDetail">
        <edit-address :editVisible="editVisible"
                      @hideEdit="hideEdit()"></edit-address>
        <address-box @showEdit="showEdit()"></address-box>
        <van-button type="primary"
                   size="small"
                   @click="showEdit()"
                   v-show="!$groupAddress || !$groupAddress.data">新增收货地址</van-button>
        <shop-description :shopOrder="pinDetail.data.productOrder"></shop-description>
        <div class="tip"
             v-if="$groupAddress && $groupAddress.data != {}">
            <img src="./assets/tip@2x.png"
                 alt="">
            <span v-if="confirmOrderDetail.data.mallArea.sendType === 0">
                当前地址支持配送，配送地址：{{confirmOrderDetail.data.mallArea.area0Name}}{{confirmOrderDetail.data.mallArea.area1Name}}
            </span>
            <span v-if="confirmOrderDetail.data.mallArea.sendType === 1">
                当前地址仅支持自提，自提地址：{{confirmOrderDetail.data.mallArea.area0Name}}{{confirmOrderDetail.data.mallArea.area1Name}}
            </span>
        </div>
        <div class="buy-wrap">
            <div class="price">
                实付金额:
                <span>￥{{pinDetail.data.productOrder.totalPrice / 100}}</span>
            </div>
            <div class="buy"
                 @click="handleBuy()">
                确认购买
            </div>
        </div>
    </div>
</template>

<script src="./index.js"></script>
<style lang="scss" src="./index.scss"></style>
