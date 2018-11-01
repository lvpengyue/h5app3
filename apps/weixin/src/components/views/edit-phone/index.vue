<template>
    <div class="edit-phone">
        <!-- <van-cell-group>
            <van-field v-model="name"
                       label=""
                       :border="false"
                       :clearable="true"
                       placeholder="请输入昵称"
                       :error="error"
                       :error-message="message"/>
        </van-cell-group>
        <div class="tip">昵称长度为1-20个字符</div> -->
        <div class="img-wrap">
            <img src="./assets/phone.png"
                 alt="">
        </div>
        <p class="tip">当前手机号为
            <span>{{oldphone}}</span>
        </p>
        <ul>
            <li>
                更换手机号后，当前的账户信息及享有的权益均保持不变
            </li>
            <li>
                更换成功后请使用新手机号进行登录
            </li>
            <li>
                只支持修改到未注册的手机号：更改后无法撤销，请谨慎修改
            </li>
        </ul>
        <input type="text"
               v-model="phone"
               name="phone"
               placeholder="只能修改为未注册手机号"
               class="phone-box">
        <div class="valid-wrap">
            <input type="text"> |
            <span v-if="!getCodeBoolean" @click="getCode()">获取验证码</span>
            <span class="get-pwd"
                    v-if="getCodeBoolean">
                倒计时: {{backSec}}秒
            </span>
        </div>
        <div class="image-captcha-wrap" v-if="loginCodeDetail && loginCodeDetail.data && loginCodeDetail.data.needImageCode">
            <van-field label=""
                       v-model="captcha">
            </van-field>
            <img :src="`data:image/jpeg;base64,${loginCodeDetail.data.imageBase64String}`"
                 @click="getImgCode()">
        </div>
        <van-button type="default"
                    size="large"
                    @click.prevent="submit"
                    :loading="loading">确认修改</van-button>
    </div>
</template>

<style lang="scss" src="./index.scss"></style>

<script src="./index.js"></script>
