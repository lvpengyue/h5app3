<template>
    <div id="app">
        <div class="page-wrapper">
            <router-view></router-view>
            <div class="common-wash-circle"
                 @touchstart.stop="dragStart($event)"
                 @touchmove.stop.prevent="dragMove($event)"
                 @touchend.stop="dragEnd"
                 @click="showWash"
                 v-if="washDetail && washDetail.data && washDetail.data.hasTask && $appWashCircle.small"
                 id="common-circle">
                 <img src="./assets/outer-ring@3x.png" alt="" class="outer-ring">
                 <img src="./assets/wash-ball@3x.png" alt="" class="wash-ball">
                 <div class="ball-wrap">
                     <!-- <div class="circle11" v-if="this.washDetail.data.freshUI || hasStart" :style="{top : `${99 - Number(this.washDetail.data.persent).toFixed(0)}%`}">
                     </div> -->
                     <p class="wash-little-percent" v-if="washDetail.data.washer &&  washDetail.data.washer.errorState">故障</p>
                     <p class="wash-little-percent" v-else-if="washDetail.data.freshUI || hasStart">{{Number(this.washDetail.data.persent).toFixed(0)}}<span>%</span></p>
                     <p class="wash-little-percent waiting" v-else>待启动</p>
                 </div>
            </div>

            <wash :showBig="showBig" @changeSmall="handleShowSmall" @starting="starting" @ending="ending"></wash>
        </div>
    </div>
</template>

<style lang="scss" src="./index.scss"></style>

<script src="./index.js"></script>
