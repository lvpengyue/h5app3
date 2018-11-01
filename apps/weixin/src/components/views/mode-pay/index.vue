<template>
    <div class="mode-pay" v-if="machineDetail">
        <div class="machine-detail">
            <img src="./assets/use.png"
                 alt="">
            <p class="machine-code">设备号-{{machineDetail.data.washer.deviceId}}</p>
            <p @click="toClean(machineDetail.data.washer.cleanState)" :class="{canuse: machineDetail.data.washer.cleanState == 0, nouse: machineDetail.data.washer.cleanState != 0, keywash: true}">{{machineDetail.data.washer.cleanStateStr}}</p>
            <p class="back-time" v-show="machineDetail.data.washer.surplusTime">倒计时 {{computedSurPlusTime(machineDetail.data.washer.surplusTime)}}</p>
            <hr>
            <p class="address">详细地址-{{machineDetail.data.washer.address}}</p>
            <p class="status">{{machineDetail.data.washer.stateStr}}</p>
        </div>
        <p class="select-mode">选择洗衣模式</p>
        <div class="mode-list">
            <ul>
                <li @click="selectMode(item)"
                    v-for="item in modeList"
                    v-if="modeList"
                    :class="{selected: selectedMode.name === item.name}">
                    <div class="mode-name">
                        <p class="type-name">{{ item.name }}<img src="./assets/red-bag.png" v-show="item.showRedBag"></p>
                        <p class="type-detail">{{ item.detail }}</p>
                    </div>
                    <p class="mode-value" v-if="machineDetail.data.free">￥0.00</p>
                    <p class="mode-value" v-else-if="item.modePrice == item.oriPrice">￥{{ item.modePrice.toFixed(2) }}</p>
                    <div class="mode-value-wrap" v-else>
                        <span class="ori-value">￥{{item.oriPrice.toFixed(2)}}</span>
                        <span class="now-value" v-if="(coupon.model == item.model || coupon.model == 0) && coupon.discount == 0">
                            ￥0.00
                        </span>
                        <span class="now-value" v-else>
                            ￥{{item.modePrice.toFixed(2) < 0.01 ? '0.01' : item.modePrice.toFixed(2)}}
                        </span>
                    </div>
                </li>
            </ul>
            <div class="mode-coupons">
                <p class="coupons-name">优惠券</p>
                <div class="coupons-num" @click="ToMyCoupons()">
                    <p v-if="!coupon.couponName">{{machineDetail.data.couponCount}}个可用</p>
                    <p v-else>{{coupon.couponName}}</p>
                    <van-icon name="arrow" />
                </div>
            </div>
        </div>
        <div class="mode-button" :class="{bagPay: bagMoney >= selectedMode.modePrice && selectedMode, otherPay: bagMoney < selectedMode.modePrice && selectedMode}">
            <van-button v-if = "bagMoney >= selectedMode.modePrice && selectedMode && !machineDetail.data.free" @click="toBagPay()" :loading="btnLoading">
                余额支付（剩余{{ bagMoney.toFixed(2) }}）
            </van-button>
            <van-button v-else-if = "bagMoney < selectedMode.modePrice && selectedMode && !machineDetail.data.free" @click="toOtherPay()" :loading="btnLoading">
                使用微信支付
            </van-button>
            <van-button v-else-if = "machineDetail.data.free && selectedMode" @click="toFreeWash()" :loading="btnLoading">
                月卡支付
            </van-button>
            <van-button v-else @click="toMachineList();">
                选择其他洗衣机
            </van-button>
        </div>
        <van-popup v-model="tipShow" class="tip-show" :close-on-click-overlay="false" v-if="this.machineDetail && this.machineDetail.data">
            <div class="tip-title">
                {{machineDetail.data.useLaterTitle}}
                <van-icon name="close" class="tip-close" @click="hideTipShow"/>
            </div>
            <div class="tip-content" v-html="machineDetail.data.wxUseLaterHtml">
            </div>
            <img src="./assets/heart.png" alt="">
        </van-popup>

        <van-popup v-model="shareShow" class="share-show" :close-on-click-overlay="false" v-if="shareShowObj">
            <div class="share-title">
                <van-icon name="close" class="tip-close" size="2rem" @click="hideShareShow"/>
            </div>
            <img :src="shareShowObj.redpackPic" alt="" @click="showShareTip">
        </van-popup>
        <div class="share-tip"
             @click="hideShare()"
             v-show="shareVisible">
            <img src="./assets/share-register.png"
                 class="share-register">
        </div>
    </div>
</template>

<style lang="scss" src="./index.scss"></style>
<script src="./index.js"></script>
