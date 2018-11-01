<template>
    <div class="perfect-information">
        <div id="allmap"></div>
        <div class="perfect-title">
            <span class="title-one">1</span>选择性别
            <span class="title-two">2</span>选择学校
        </div>
        <div class="perfect-head">
            <img src="./assets/male-checked.png"
                 alt=""
                 v-if="choosedHead === 1">
            <img src="./assets/male.png"
                 alt=""
                 v-else
                 @click="chooseSex(1)">
            <img src="./assets/female-checked.png"
                 alt=""
                 class="female-head"
                 v-if="choosedHead === 2">
            <img src="./assets/female.png"
                 alt=""
                 class="female-head"
                 v-else
                 @click="chooseSex(2)">
        </div>

        <img src="./assets/choose.png"
             alt=""
             v-show="choosedHead"
             class="choose-img"
             :class="{choose_female: choosedHead === 2}">
        <div class="school-list"
             v-show="choosedHead" v-if="addressListDetail && addressListDetail.data">
            <div v-for="item in areaList"
                 @click="chooseSchool(item)"
                 v-show="showDistance(item.lat, item.lng)"
                 :class="{choosed_school: choosedSchool.id === item.id}">
                <p>{{item.name}}</p>
            </div>
        </div>
        <van-popup v-model="show"
                   position="center"
                   :overlay="true">
            <div class="school-name">
                {{choosedSchool.name}}
            </div>
            <div class="floor-wrap">
                <div class="floor-name">
                    <p>楼号</p>
                </div>
                <div class="floor-list">
                    <p v-for="sitem in choosedSchool.areaList"
                       @click="chooseFloor(sitem)"
                       :class="{choosed_floor: choosedFloor.id === sitem.id}">
                        {{sitem.name}}
                        <img src="./assets/choosed-floor.png"
                             v-show="choosedFloor.id === sitem.id">
                    </p>
                </div>
            </div>
            <van-cell-group>
                <van-field v-model="room"
                           type="text"
                           label="宿舍号"
                           placeholder="请输入宿舍号"
                           required />
            </van-cell-group>
            <div class="confirm" @click="confirmFloor()">确认</div>
        </van-popup>
    </div>
</template>

<style lang="scss" src="./index.scss"></style>
<script src="./index.js"></script>
