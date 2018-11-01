<template>
    <div class="wash" v-if="this.washDetail && this.washDetail.data && showBig">
        <div class="wash-wrap wash-start" v-show="!runCircle">
            <p class="start-wash start-wash-circle" v-show="!runCircle" @click="startWash()"><span>{{startStr}}</span></p>
        </div>
        <div class="wash-wrap wash-start wash-circle" v-show="runCircle" v-if="this.washDetail.data && this.washDetail.data.hasTask">
            <div class="inner-circle">
                <!-- <img src="./assets/wash-ball@2x.png" alt="" class="wash-ball"> -->
                <div class="rotate-wrap rotate-circle">
                    <div class="rotate circle1" id="circle1" :style="{top: `${99 - this.washDetail.data.persent}%`}"></div>
                </div>
                <!-- <div class="rotate circle2"></div> -->
                <p class="wash-percent">{{parseInt(this.washDetail.data.persent)}}<span>%</span></p>
            </div>
            <!-- <p class="start-wash" v-show="!runCircle" @click="startWash()">点击启动</p> -->
            <img src="./assets/outer-ring@3x.png" alt="" class="wash_img">

        </div>
        <template v-if="">
            <p class="end-time-name">剩余时间</p>
            <p class="end-time-value">00:{{computedTime()}}</p>
        </template>
        <template>
            <p class="end-time-name">剩余时间</p>
            <p class="end-time-value">00:{{computedTime()}}</p>
        </template>

        <p class="address-code-name">地址/宿舍</p>
        <p class="address-code-value">{{(this.washDetail.data && this.washDetail.data.hasTask) ? this.washDetail.data.washer.address  : '--'}}</p>
    </div>
</template>

<style lang="scss" src="./index.scss"></style>
<script src="./index.js"></script>
