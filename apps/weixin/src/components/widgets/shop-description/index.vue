<template>
    <div class="shop-desc" @click="push();" v-if="shopOrder">
        <img :src="shopOrder.productImage" alt="这是图片">
        <div class="title">
            <p class="name">{{shopOrder.productName}}</p>
            <p class="new-price">￥{{shopOrder.totalPrice / 100}}</p>
            <p class="old-price">￥{{shopOrder.oriPrice / 100}}</p>
        </div>
    </div>
</template>

<script src="./index.js"></script>
<style lang="scss" src="./index.scss"></style>
