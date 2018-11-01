<template>
    <div class="home"
         v-if="homeDetail && homeDetail.data">
        <van-swipe :autoplay="3000">
            <van-swipe-item v-for="item in homeDetail.data.adlist" :key="item.id">
                <img :src="item.aliPic" @click="reLocation(item.link)"/>
            </van-swipe-item>
        </van-swipe>
        <div class="content"
             v-show="homeDetail.data.washerList && homeDetail.data.washerList.length">
            <div class="title">
                <p>洗衣机列表</p>
                <p @click="handleMachine();"
                   v-show="homeDetail.data.showPublicBtn">搜索附近的设备
                    <van-icon name="arrow"></van-icon>
                </p>
            </div>
            <template v-for="item in homeDetail.data.washerList">
                <home-using-box :data="item"
                                :showMyTip="Boolean($groupUser3) && ($groupUser3.id === item.washUserId) && item.washOrderId > 0"></home-using-box>
            </template>
        </div>
        <div class="content-empty"
             v-show="!homeDetail.data.washerList || !homeDetail.data.washerList.length">
            <img src="./assets/empty-data.png"
                 alt="">
            <p v-if="!homeDetail.data.userId" @click="openLogin">
                <span>登录，</span>开启悠生活~</p>
            <p v-else>扫码可直接洗衣哦</p>
        </div>
        <div :class="{bottom: true, show: scanShow}">
            <div class="top"
                 v-if="scanShow"
                 @click="handleScanShow();">
                <img src="./assets/down.png"
                     alt="">
            </div>
            <div class="top"
                 v-else
                 @click="handleScanShow();">
                <img src="./assets/up.png"
                     alt="">
            </div>
            <div class="bottom"
                 v-show="scanShow">
                <div class="scan" @click="scanQRCode">
                    <img src="./assets/scan.png"
                         alt="">
                    <p>扫码使用</p>

                </div>
                <div class="hand_input"
                     @click="handleInput()">
                    手动输入编码
                </div>
            </div>
        </div>
        <div class="feedback"
             @click="redirect('feedback')"
             :class="{feedbackdown: !scanShow}"></div>
        <div class="trouble"
             @click="redirect('trouble-shooting')"
             :class="{troubledown: !scanShow}"></div>
        <div class="people"
             @click="handleShowPerson()"
             :class="{peopledown: !scanShow}">
            <div class="people-inner"></div>
        </div>
        <van-popup v-model="popAd" class="pop-ad">
            <template v-if="homeDetail.data && homeDetail.data.popAd && homeDetail.data.popAd.length > 0">
                <img :src="`${homeDetail.data.popAd[0].aliPic}?x-oss-process=image/resize,m_fill,h_1300,w_900`"
                     alt=""
                     class="popad-img"
                     @click="reLocation(homeDetail.data.popAd[0].link)">
            </template>
        </van-popup>
        <van-popup v-model="showPerson"
                   class="person-popup"
                   :userData="homeUserCenter"
                   position="left"
                   overlay-class="person-over"
                   :overlay="true">
            <person-center :userData="homeUserCenter.data" @showLogin="openLogin"></person-center>
        </van-popup>
        <van-popup v-model="login" class="login-popup">
            <div class="login">
                <img src="./assets/close.png"
                     alt=""
                     @click="closeLogin();">
                <div class="title">登录悠洗</div>
                <form action="">
                    <div class="input-wrap">
                        <img src="./assets/phone.png"
                             alt=""
                             class="phone">
                        <input type="text"
                               v-model="phone"
                               placeholder="账号">
                    </div>
                    <div class="input-wrap">
                        <img src="./assets/mail.png"
                             alt=""
                             class="mail">
                        <input type="text"
                               placeholder="验证码"
                               v-model="code"
                               class="telephone-code">
                        <div class="get-pwd"
                             @click="getCode()"
                             v-if="!getCodeBoolean">
                            获取验证码
                        </div>
                        <div class="get-pwd"
                             v-if="getCodeBoolean">
                            倒计时: {{backSec}}秒
                        </div>
                    </div>
                    <div class="image-captcha-wrap" v-if="loginCodeDetail && loginCodeDetail.data && loginCodeDetail.data.needImageCode">
                        <van-field label="验证码"
                                   v-model="captcha">
                        </van-field>
                        <img :src="`data:image/jpeg;base64,${loginCodeDetail.data.imageBase64String}`"
                             @click="getImgCode()">
                    </div>
                    <van-button type="primary"
                                @click.prevent="handleSubmits()">登录</van-button>
                    <p class="protocol" @click="lookProtocol">点击登录，即表示同意《用户协议》</p>
                </form>
            </div>
        </van-popup>

        <van-popup v-model="couponTip" class="coupon-popup">
            <div class="coupon-wrap" v-if="homeDetail && homeDetail.data &&　homeDetail.data.coupons　&& homeDetail.data.coupons.length > 0">
                <p class="coupon-title">获得<span>{{homeDetail.data.coupons.length}}张</span>洗衣券</p>
                <div class="home-coupon-list">
                    <div class="coupon-each" v-for="item in homeDetail.data.coupons">
                        <div class="coupon-left">
                            <p>{{item.couponName}}</p>
                            <p>{{item.modelStr}}</p>
                            <p>截止到{{item.endDateStr}}</p>
                        </div>
                        <div class="coupon-right">
                            {{item.discountStr}}<span>折</span>
                        </div>
                    </div>
                </div>
                <img src="./assets/couponRed@3x.png" alt="" class="coupon-red" @click="toMyCoupons">
            </div>
        </van-popup>
    </div>
</template>

<style lang="scss" src="./index.scss"></style>
<script src="./index.js"></script>
