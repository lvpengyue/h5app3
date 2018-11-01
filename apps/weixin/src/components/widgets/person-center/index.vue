<template>
    <div class="person-center">
        <div class="person-top"
             v-if="!homeConfig || !homeConfig.data || !homeConfig.data.user">
            <img src="./assets/no-login.png"
                 alt=""
                 class="youxi-login">
            <p class="login-name" @click="toLogin">请登录</p>
        </div>
        <div class="person-top"
             v-if="homeConfig && homeConfig.data && homeConfig.data.user">
            <!-- <p class="login-out" @click="toLoginOut">
                退出登录
            </p> -->
            <div class="person-img" @click="toUserCenter">
                <img v-if="homeConfig && homeConfig.data && homeConfig.data.user && homeConfig.data.user.aliPic" :src="`${homeConfig.data.user.aliPic}?x-oss-process=image/resize,m_fill,h_320,w_320`"
                     alt="">
            </div>
            <p class="login-name">{{homeConfig.data.user.name}}</p>
        </div>
        <ul>
            <!-- <li @click="toLink('mall-home')">悠洗商城</li> -->
            <li @click="toLink('charge')">账户充值</li>
            <li @click="toLink('order-list')">洗衣订单
                <div class="circle" v-show="userData && userData.unusualOrderCount > 0"></div>
            </li>
            <li @click="toLink('my-coupons')">我的优惠券
                <div class="circle" v-show="userData && userData.couponCount > 0"></div>
            </li>
            <li @click="toLink('meal')" v-show="homeConfig && homeConfig.data && homeConfig.data.config.moduleMeal">购买月卡</li>
        </ul>
        <div class="serve-women">
            <a href="tel:400-996-6220">
                <img src="./assets/serve-women.png"
                     alt="">
                <p>客服电话</p>
            </a>
            <div @click="toLink('operation-manual')">
                <img src="./assets/operation.png"
                     alt="">
                <p>操作指南</p>
            </div>
        </div>
    </div>
</template>

<style lang="scss" src="./index.scss"></style>
<script src="./index.js"></script>
