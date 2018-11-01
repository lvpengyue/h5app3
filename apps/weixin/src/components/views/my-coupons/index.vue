<template>
    <div class="my-coupons"
         v-if="myCouponsData && myCouponsData.data && list.length > 0">
        <van-list v-model="loading"
                  :finished="finished"
                  @load="onLoad">
            <div v-for="item in list"
                 @click="checked(item)"
                 :class="{normal: item.state != 1, sale: item.couponType != 1 && item.state == 1, water: item.couponType == 1 && item.state == 1, coupon: true}">
                <img src="./assets/checked.png"
                     :class="{checked_coupon: item.id === checkedCoupon.id}">
                <div class="coupon-detail">
                    <p class="coupon-name">{{item.couponName}}</p>
                    <p class="coupon-type">{{item.modelStr}}</p>
                    <!-- <p class="end-time">截止到2018.0509 23.00前使用</p> -->
                    <p class="end-time">有效期至 {{item.endDateStr}}</p>
                </div>
                <div class="coupon-sale">
                    {{item.discountStr}}{{item.discountStr == '免费' ? '' : '折'}}
                </div>
                <img src="./assets/out-time.png" alt="" class="out-time" v-show="item.state == 3">
                <img src="./assets/used.png" alt="" class="used" v-show="item.state == 2">
            </div>
            <div class="no-use" @click="noCoupon()" v-if="showNoCoupon">
                不使用悠洗洗衣券
            </div>
        </van-list>
    </div>
    <div v-else
         class="my-coupons">
        <div class="empty-data">
            暂无优惠券
        </div>
    </div>
</template>

<style lang="scss" src="./index.scss"></style>
<script src="./index.js"></script>
