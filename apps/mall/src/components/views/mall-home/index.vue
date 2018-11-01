<template>
    <div class="mall-home" v-if="mallHomeData && mallHomeData.data">
        <van-swipe :autoplay="3000">
            <van-swipe-item v-for="item in mallHomeData.data.adList" :key="item.id">
                <img :src="item.aliPic+'?x-oss-process=image/resize,m_fill,h_540,w_1500'"
                     @click="reLocation(item.link)" />
            </van-swipe-item>
        </van-swipe>
        <p class="to-my-orders" @click="toLink('mall-my-orders')">
            我的订单
            <van-icon name="arrow"></van-icon>
        </p>
        <div class="divider"></div>
        <div class="shop-list">
            <template v-for="item in mallHomeData.data.productList">
                <mall-shop-box :shopData="item"></mall-shop-box>
            </template>
        </div>
    </div>
</template>

<style lang="scss" src="./index.scss"></style>

<script src="./index.js"></script>
