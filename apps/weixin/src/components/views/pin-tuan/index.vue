<template>
    <div class="pin">
        <div class="share-wrap"
             @click="hideShare()"
             v-if="shareVisible">
            <img src="./assets/share-register.png"
                 class="share-register">
        </div>
        <div class="content-wrap"
             v-if="pinDetail.code === 1">
            <shop-description :shopOrder="pinDetail.data.productOrder"></shop-description>
            <div class="people-wrap">
                <people-num :peopleData="pinDetail"></people-num>
                <van-button type="primary"
                            @click="handlePin()"
                            v-show="shareShow">确定拼团</van-button>
                <van-button type="primary"
                            @click="handleToShare()"
                            v-show="toShare">去分享</van-button>
            </div>
            <div class="import-message">
                <span>拼单须知：</span>满4人拼单成功，人不满退款
            </div>
        </div>
        <div class="message-wrap"
             v-if="messageObject.out">
            <div class="login"
                 v-if="messageObject.login">
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
                    <div class="image-captcha-wrap" v-if="pinCodeDetail && pinCodeDetail.data && pinCodeDetail.data.needImageCode">
                        <van-field label="验证码"
                                   v-model="captcha">
                        </van-field>
                        <img :src="`data:image/jpeg;base64,${pinCodeDetail.data.imageBase64String}`"
                             @click="getImgCode()">
                    </div>
                    <van-button type="primary"
                                @click.prevent="handleSubmits()">登录</van-button>
                </form>
            </div>
            <div class="code"
                 v-if="messageObject.code">
                <p>长按识别二维码，关注悠洗洗衣</p>
                <p>关注后继续购买，才能接收发货通知</p>
                <img src="./assets/code.png"
                     alt="这是二维码图片">
            </div>
        </div>
    </div>
</template>

<script src="./index.js"></script>
<style lang="scss" src="./index.scss"></style>
