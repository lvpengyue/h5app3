<template>
    <div class="pay">
        <div class="content">
            <p class="price">支付金额：<span>￥{{pinDetail.data.productOrder.totalPrice / 100}}</span></p>
            <div @click.prevent="wxPay()">
                <van-cell-group>
                    <van-cell title="微信支付" icon="wechat" is-link />
                </van-cell-group>
            </div>
        </div>
    </div>
</template>

<style lang="css" src="./index.css"></style>
<script src="./index.js"></script>
