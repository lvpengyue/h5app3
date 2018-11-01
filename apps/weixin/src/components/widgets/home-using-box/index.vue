<template>
    <div class="home-using-box" @click="jump()">
        <!-- <img src="./assets/public-machine.png" alt="" class="machine" v-if="public">
      <img src="./assets/private-machine.png" alt="" class="machine" v-else> -->
        <div class="machine-wrap"
             v-if="data.state === 1">
            <img src="./assets/home-wash-scroll.gif"
                 alt=""
                 class="machine machine-using">
            <img src="./assets/shadow.png" alt="" class="shadow">
            <p class="end-time">00:{{data.surplusTime >= 10 ? data.surplusTime : `0${data.surplusTime}`}}</p>
        </div>
        <div class="machine-wrap"
             v-else-if="data.state === 0 || data.state === 3 || data.state === 5">
            <img src="./assets/home-wash.png"
                 alt=""
                 class="machine">
            <p class="end-time">00:00</p>
        </div>
        <div class="machine-wrap"
             v-else>
            <img src="./assets/home-wash-no.png"
                 alt=""
                 class="machine">
            <p class="end-time" :class="{no_use: true}">00:00</p>
        </div>
        <div class="divider">

        </div>
        <div class="content-wrap">
            <p :class="{top: true, no_use: data.state === 2}">
                {{data.errorState ? errorList[data.errorState] : data.stateStr}}
                <span class="my-tip" v-show="showMyTip">我的订单</span>
            </p>
            <p class="address" :class="{no_use: data.state === 2}">{{data.address}}-{{data.name}}</p>
        </div>
        <div class="arrow-to">
            <van-icon name="arrow"></van-icon>
        </div>
    </div>
</template>

<style lang="scss" src="./index.scss"></style>
<script src="./index.js"></script>
