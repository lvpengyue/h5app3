<template>
    <div class="wash" id="wash" v-if="washDetail && washDetail.data && $appWashCircle.big">
        <div class="wash-wrap wash-start" v-if="!runCircle">
            <p class="start-wash start-wash-circle" v-if="!runCircle" @click="startWash()"><span>{{startStr}}</span></p>
        </div>
        <div class="wash-wrap wash-start wash-circle" v-if="runCircle && washDetail.data && washDetail.data.hasTask">
            <div class="inner-circle">
                <!-- <img src="./assets/wash-ball@2x.png" alt="" class="wash-ball"> -->
                <div class="rotate-wrap rotate-circle" >
                    <!-- <icanvas></icanvas> -->
                    <div class="circle1 rotate" :style="{top : `${99 - Number(washDetail.data.persent).toFixed(0)}%`}"></div>
                </div>

                <!-- <div class="rotate circle2"></div> -->
                <p class="wash-percent">{{Number(washDetail.data.persent).toFixed(0)}}<span>%</span></p>
            </div>
            <!-- <p class="start-wash" v-show="!runCircle" @click="startWash()">点击启动</p> -->
            <img src="./assets/outer-ring@3x.png" alt="" class="wash_img">

        </div>
        <p class="end-time-name">剩余时间</p>
        <p class="end-time-value" v-if="washDetail.data.washer && !washDetail.data.washer.errorState">00:{{computedTime()}}</p>
        <p class="end-time-value error-value" v-if="washDetail.data.washer &&  washDetail.data.washer.errorState">{{errorList[washDetail.data.washer.errorState]}}</p>
        <p class="address-code-name">地址/宿舍</p>
        <p class="address-code-value">{{(washDetail.data && washDetail.data.hasTask) ? washDetail.data.washer.address  : '--'}}</p>
        <div class="show-small" @click="showSmallCircle()">
            <img src="./assets/showSmallCircle.png">
            <p>收起</p>
        </div>


    </div>
    <!-- <div class="common-wash-circle"
            v-else-if="showSmall"
            @touchstart.stop="dragStart($event)"
            @touchmove.stop.prevent="dragMove($event)"
            @touchend.stop="dragEnd"
            @click="showBigCircle"
            id="common-circle">
            <img src="./assets/outer-ring@3x.png" alt="" class="outer-ring">
            <img src="./assets/wash-ball@3x.png" alt="" class="wash-ball">
            <div class="ball-wrap">
                <div class="rotate circle11" id="circle11"></div>
                <p class="wash-little-percent">80<span>%</span></p>
            </div>
    </div> -->
</template>

<style lang="scss" src="./index.scss"></style>
<script src="./index.js"></script>
