<template>
    <div class="person-center">
        <div class="person-top"
             v-show="!loginIn">
            <img src="./assets/no-login.png"
                 alt=""
                 class="youxi-login">
            <p class="login-name">请登录</p>
        </div>
        <div class="person-top"
             v-show="loginIn">
            <p class="login-out">
                退出登录
            </p>
            <div class="person-img">
                <img src="./assets/store.png"
                     alt="">
            </div>
            <p class="login-name">齐天大圣</p>
        </div>
        <ul>
            <li @click="toLoad('/mall/#/store')">悠洗商城</li>
            <li @click="toLink('charge')">账户充值</li>
            <li @click="toLink('order-list')">洗衣订单
                <div class="circle"></div>
            </li>
            <li @click="toLink('my-coupons')">我的优惠券
                <div class="circle"></div>
            </li>
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
