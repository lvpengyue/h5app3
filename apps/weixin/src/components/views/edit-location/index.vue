<template>
    <div class="edit-location">
        <div class="address-name">
            <div class="name">
                {{currentAddress}}
            </div>
            <div class="tip">
                三个月内只能修改一次，认证后将获得更多福利
            </div>
        </div>
        <div class="relocation" @click="reGetLocation">
            重新定位当前位置
        </div>
        <div class="list-name">
            请选择认证的学校/公司
        </div>
        <div class="school-list"
            v-if="addressListDetail && addressListDetail.data && addressListDetail.data.length > 0 && currentAddress">
            <div v-for="item in addressListDetail.data"
                 @click="chooseSchool(item)"
                 v-if="showDistance(item.lat, item.lng)"
                 :class="{choosed_school: choosedSchool.id === item.id}">
                {{item.name}}
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
                           type="number"
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
