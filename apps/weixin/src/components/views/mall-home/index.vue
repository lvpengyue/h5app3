<template>
    <div class="mall-home">
        <img src="./assets/banner@2x.png" alt="" class="banner">
        <p class="to-my-orders" @click="toLink('mall-my-orders')">
            我的订单
            <van-icon name="arrow"></van-icon>
        </p>
        <div class="shop-list">
            <template v-for="n in 4">
                <mall-shop-box></mall-shop-box>
            </template>
        </div>
    </div>
</template>

<style lang="scss" src="./index.scss"></style>

<script src="./index.js"></script>
