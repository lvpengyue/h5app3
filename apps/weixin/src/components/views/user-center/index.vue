<template>
    <div class="operation-manual" v-if="userCenterDetail && userCenterDetail.data">
        <van-cell-group>
            <van-cell title="头像"
                      class="title-cell"
                      value=""
                      :center="true"
                      is-link>
                <img :src="`${userCenterDetail.data.user.aliPic}?x-oss-process=image/resize,m_fill,h_320,w_320`"
                     alt=""
                     v-if = "userCenterDetail.data.user.aliPic"
                     @click="toUpload">
                <img src="./assets/no-login.png"
                     alt=""
                     v-else
                     @click="toUpload">
            </van-cell>
            <van-cell title="昵称"
                      :center="true"
                      :value="userCenterDetail.data.user.name"
                      @click.native="changeName"
                      is-link>
            </van-cell>
            <van-cell title="手机号"
                      :value="userCenterDetail.data.user.phone"
                      :center="true"
                      is-link>
            </van-cell>
        </van-cell-group>

        <van-cell-group>
            <van-cell title="我的学校/企业"
                      value=""
                      :center="true"
                      @click.native="changeLocation"
                      is-link>
                <span v-if="!userCenterDetail.data.userAccount"
                      class="no-location">未认证</span>
                <span v-else>{{userCenterDetail.data.userAccount.parentName}}{{userCenterDetail.data.userAccount.areaName}}{{userCenterDetail.data.userAccount.childName}}{{userCenterDetail.data.userAccount.authRoom}}</span>
            </van-cell>
            <van-cell title="职业"
                      :value="userCenterDetail.data.user.job"
                      :center="true"
                      @click.native="changeJob"
                      is-link>
            </van-cell>
            <van-cell title="年级"
                      :value="userCenterDetail.data.user.grade"
                      @click.native="selectGrades"
                      :center="true"
                      is-link>
            </van-cell>
            <van-cell title="专业"
                      :value="userCenterDetail.data.user.major"
                      :center="true"
                      @click.native="changeMajor"
                      is-link>
            </van-cell>
        </van-cell-group>

        <van-cell-group>
            <van-cell title="性别"
                      :value="sexs[userCenterDetail.data.user.sex]"
                      @click.native="selectSexs"
                      :center="true"
                      is-link>
            </van-cell>
            <van-cell title="生日"
                      :value="userCenterDetail.data.user.birthDay ? userCenterDetail.data.user.birthDay.split(' ')[0] : ''"
                      @click.native="selectBirthday"
                      :center="true"
                      is-link>
            </van-cell>
            <van-cell title="年龄"
                      :value="`${userCenterDetail.data.user.age}`"
                      :center="true"
                      :is-link="false">
            </van-cell>
        </van-cell-group>
        <van-popup v-model="showGrades"
                   position="bottom"
                   :overlay="true">
            <van-picker show-toolbar
                        title="年级"
                        :columns="grades"
                        @cancel="onCancel"
                        @confirm="onConfirm" />
        </van-popup>

        <van-popup v-model="showSexs"
                   position="bottom"
                   :overlay="true">
            <van-picker show-toolbar
                        title="性别"
                        :columns="sexs"
                        @cancel="onCancelSex"
                        @confirm="onConfirmSex" />
        </van-popup>

        <van-popup v-model="showBirthday"
                   position="bottom"
                   :overlay="true">
            <van-datetime-picker v-model="currentDate"
                                 :min-date="new Date('1908/01/01 00:00:00')"
                                 :max-date="new Date()"
                                 @cancel="onCancelBirthday"
                                 @confirm="onConfirmBirthday"
                                 type="date"/>
        </van-popup>
    </div>
</template>

<style lang="scss" src="./index.scss"></style>
<script src="./index.js"></script>
