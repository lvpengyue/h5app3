<template>
    <div class="mall-order-box"
         v-if="data"
         @click="toDetail()">
        <div class="title">
            <p class="order-code">订单号
                <span>{{data.orderId}}</span>
            </p>
            <p class="status" v-if="data.orderType === 0 || (data.orderType === 1 && data.groupStatus === 3)">{{data.statusStr}}</p>
            <p class="status" v-else-if="data.orderType === 1 && data.groupStatus === 1">拼团中</p>
            <p class="status" v-else>拼团失败</p>
        </div>
        <div class="content">
            <div class="order-img">
                <img :src="data.productImage+'?x-oss-process=image/resize,m_fill,h_280,w_280'"
                     alt="">
            </div>
            <div class="order-content">
                <div class="name">{{data.productName}}</div>
                <div class="price">
                    <div class="price-left">
                        <p class="new-price">￥{{data.totalPrice / 100}}</p>
                        <p class="old-price">￥{{data.oriPrice / 100}}</p>
                    </div>
                    <div class="btn"
                         v-show="data.payStatus > 5 && data.payStatus < 10"
                         @click.stop="toLinkRider(data.riderPhone)">
                        联系骑手
                    </div>
                    <div class="btn btn-comment"
                         v-show="data.payStatus == 10"
                         @click.stop="toComment()">
                        评价
                    </div>
                    <div class="group-cancel"
                         v-show="data.orderType === 1 && data.groupStatus === 2">
                        订单已取消
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" src="./index.scss"></style>

<script src="./index.js"></script>
