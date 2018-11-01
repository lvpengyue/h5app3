<template>
    <div class="mall-shop-box" v-if="shopData && shopData.image">
        <div class="img" @click="toLink(shopData.id)">
            <img :src="shopData.image+'?x-oss-process=image/resize,m_fill,h_400,w_620'" alt="">
        </div>
        <div class="title">{{shopData.name}}</div>
        <p>￥{{shopData.price / 100}}<span>价格：￥{{shopData.oriPrice / 100}}</span></p>
    </div>
</template>

<style lang="scss" src="./index.scss"></style>
<script src="./index.js"></script>
