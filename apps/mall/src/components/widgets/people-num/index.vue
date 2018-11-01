<template>
    <div class="people-num" v-if="peopleData">
        <p v-if="canShare">待分享，还差
            <span class="distance-num">{{peopleData.data.groupCount}}</span>人，剩余时间
            <span>{{distTime}}</span>
        </p>
        <p v-else>
            拼团已结束，请参加其他拼团
        </p>
        <div class="image-list">
            <template v-for="(item, index) in peopleData.data.groupUserList">
                <div class="host" v-if="index === 0">
                    <img src="./assets/host@2x.png"
                        alt="">
                    <img :src="`${item.aliPic}?x-oss-process=image/resize,m_fill,h_240,w_240`" v-if="item.aliPic">
                    <img src="./assets/default-head.png" v-else>
                </div>
                <div v-else>
                    <img :src="`${item.aliPic}?x-oss-process=image/resize,m_fill,h_240,w_240`" v-if="item.aliPic" alt="">
                    <img src="./assets/default-head.png" alt="" v-else>
                </div>
            </template>
            <template v-for="n in peopleData.data.groupCount">
                <img src="./assets/adding@2x.png"
                 alt="">
            </template>
        </div>
    </div>
</template>

<script src="./index.js"></script>
<style lang="scss" src="./index.scss"></style>
