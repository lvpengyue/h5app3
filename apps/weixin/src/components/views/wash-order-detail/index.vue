<template>
    <div class="wash-order-detail" v-if="washOrderDetailData && washOrderDetailData.data">
        <div class="share-tip"
             @click="hideShare()"
             v-show="shareVisible">
            <img src="./assets/share-register.png"
                 class="share-register">
        </div>
        <div class="order-status">
            <div class="content">
                <h3>{{washOrderDetailData.data.orderInfo.stateStr}}</h3>
                <div v-show="washOrderDetailData.data.showRefundBtn" @click="applyRefund">
                    <a class="refund" type="button">退款</a>
                </div>
                <div v-show="washOrderDetailData.data.showShareBtn" class="share-wrap" @click="toShare">
                    <img src="./assets/red-bag.png" alt=""><a class="share" type="button">分享</a>
                </div>
            </div>
        </div>
        <div class="pay-info">
            <h4>支付信息</h4>
            <div class="order-cell">
                <p>支付方式</p>
                <p>{{payWayArr[washOrderDetailData.data.orderInfo.payWay]}}</p>
            </div>

            <div class="order-cell">
                <p>订单金额</p>
                <p>￥{{washOrderDetailData.data.orderInfo.originalPrice.toFixed(2)}}</p>
            </div>

            <div class="order-cell">
                <p>优惠</p>
                <p class="discount-price">￥{{washOrderDetailData.data.orderInfo.discountAmount.toFixed(2)}}</p>
            </div>

            <div class="order-cell pay-price">
                <p>实付</p>
                <p>￥{{washOrderDetailData.data.orderInfo.price.toFixed(2)}}</p>
            </div>
        </div>
        <div class="order-info">
            <h4>订单信息</h4>
            <div class="order-cell">
                <p>订单号</p>
                <p>
                    <span id="ios-copy">{{washOrderDetailData.data.orderInfo.orderNumber}}</span>
                    <input id="copy-text" type="text" value="" readonly>
                     |
                    <span class="to_copy" @click="toCopy">复制</span></p>
            </div>
            <div class="order-cell">
                <p>下单时间</p>
                <p>{{washOrderDetailData.data.orderInfo.createTime}}</p>
            </div>
            <div class="order-cell">
                <p>洗衣机名称</p>
                <p>{{washOrderDetailData.data.washer.name}}</p>
            </div>
            <div class="order-cell">
                <p>模式</p>
                <p>{{washOrderDetailData.data.orderInfo.modelStr}}</p>
            </div>
            <div class="order-cell">
                <p>地址</p>
                <p>{{washOrderDetailData.data.washer.address}}</p>
            </div>
        </div>
    </div>
</template>

<style lang="scss" src="./index.scss"></style>

<script src="./index.js"></script>
