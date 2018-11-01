<template>
    <div class="shop">
        <div class="shop-desc"
             @click="push();"
             v-if="shopData">
            <img :src="shopData.image+'?x-oss-process=image/resize,m_fill,h_400,w_400'"
                 alt="这是图片">
            <div class="title">
                <p class="name">{{shopData.name}}</p>
                <p class="new-price" v-if="type == 1">￥{{shopData.groupPrice / 100}}</p>
                <p class="new-price" v-else>￥{{shopData.price / 100}}</p>
                <p class="old-price">￥{{shopData.oriPrice / 100}}</p>
            </div>
        </div>
        <div class="tip"
             v-if="sendData">
            <span v-if="sendData.sendType === 0">
                当前地址支持配送，配送地址：{{sendData.area0Name}}{{sendData.area1Name}}
            </span>
            <span v-if="sendData.sendType === 1">
                当前地址仅支持自提，自提地址：{{sendData.area0Name}}{{sendData.area1Name}}
            </span>
        </div>
    </div>

</template>

<script src="./index.js"></script>
<style lang="scss" src="./index.scss"></style>
