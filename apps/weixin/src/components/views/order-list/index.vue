<template>
    <!-- <div class="order-list">
        <div v-for="n in 2"
             class="order-each">
            <div class="order-title">
                <p class="time">2017-07-01 12:12:13</p>
                <p class="status error">异常</p>
            </div>
            <div class="order-content">
                <ul>
                    <li class="order-num">订单号：2323232323</li>
                    <li class="order-mode">模式：标准+脱水</li>
                    <li class="order-address">地点：A1FF-03</li>
                </ul>
            </div>
            <div class="order-foot">
                <p>合计： ￥
                    <span class="order-money">4.00</span> 积分：
                    <span class="bonus-points">0</span>分</p>
                <button>申请退款</button>
            </div>
        </div>
    </div> -->
    <div class="order-list"
         v-if="orderListDetail && orderListDetail.data && list.length > 0">
        <van-list v-model="loading"
                  :finished="finished"
                  @load="onLoad">
            <div v-for="item in list"
                 @click="toDetail(item.id)"
                 class="order-each">
                <div class="order-title">
                    <p class="time">{{item.createtime}}</p>
                    <p class="status" :class="{error: item.state == 5}">{{item.stateStr}}</p>
                </div>
                <div class="order-content">
                    <ul>
                        <li class="order-num">订单号：{{item.orderNumber}}</li>
                        <li class="order-mode">模式：{{item.modelStr}}</li>
                        <li class="order-address">地点：{{item.washerAddress}}</li>
                    </ul>
                </div>
                <div class="order-foot">
                    <p>合计： ￥
                        <span class="order-money">{{item.price.toFixed(2)}}</span>
                        <!-- 积分：<span class="bonus-points"></span>分 -->
                    </p>
                    <button v-show="item.showRefundBtn" @click.prevent.stop="applyRefund(item.id)">申请退款</button>
                </div>
            </div>
        </van-list>
    </div>
    <div v-else-if="list.length <= 0"
         class="order-list">
        <div class="empty-data">
            暂无洗衣订单
        </div>
    </div>
</template>

<style lang="scss" src="./index.scss"></style>
<script src="./index.js"></script>
