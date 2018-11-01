<template>
    <div class="confirm-order"
         v-if="confirmOrderData && confirmOrderData.data">
        <edit-address :editVisible="editVisible"
                      :data="confirmOrderData.data.authAddress"
                      @hideEdit="hideEdit()"></edit-address>
        <address-box @showEdit="showEdit()"
                     :data="confirmOrderData.data.address"></address-box>
        <van-button type="primary"
                    size="small"
                    @click="showEdit()"
                    v-show="!confirmOrderData.data.address">新增收货地址</van-button>
        <shop-description :shopData="confirmOrderData.data.mallProduct"
                          :sendData="confirmOrderData.data.mallArea"
                          :type="params.orderType"
                          :discountStr="confirmOrderData.data.discountStr"></shop-description>
        <div class="buy-wrap">
            <div class="price">
                实付金额:
                <span v-if="params.orderType == 1">￥{{confirmOrderData.data.mallProduct.groupPrice / 100}}</span>
                <span v-else>￥{{confirmOrderData.data.mallProduct.price / 100}}</span>
            </div>
            <div class="buy"
                 @click="handleBuy()" v-if="params.orderType === '0'">
                <p class="sig-buy">确认购买</p>
                <p class="discount_str">({{confirmOrderData.data.discountStr}})</p>
            </div>
            <div class="buy"
                 @click="handleBuy()" v-else>
                <p class="group-buy">确认购买</p>
            </div>
        </div>
    </div>
</template>

<script src="./index.js"></script>
<style lang="scss" src="./index.scss"></style>
