<template>
    <div class="mall-my-orders">
        <div class="banner">
            <p :class="{active: showCommon}" @click="changeShow()">普通订单</p>
            <p :class="{active: !showCommon}" @click="changeShow()">拼团订单</p>
        </div>
        <div v-show="showCommon">
            <mall-order-box></mall-order-box>
            <mall-order-box></mall-order-box>
            <mall-order-box></mall-order-box>
        </div>
        <div v-show="!showCommon">
            <mall-order-box></mall-order-box>
        </div>
    </div>
</template>

<style lang="scss" src="./index.scss"></style>

<script src="./index.js"></script>
