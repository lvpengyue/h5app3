<template>
    <div class="charge" v-if="chargeDetail && chargeDetail.data">
        <div class="charge-title">
            <p class="money">账户余额(元)</p>
            <p class="money-detail" @click="toMoneyDetail">收支明细</p>
        </div>
        <p class="charge-value">{{chargeDetail.data.user.totalBalance.toFixed(2)}}</p>
        <p class="charge-money">充值金额</p>
        <div class="charge-list">
            <div v-for="item in chargeDetail.data.couponList"
                 class="charge-each"
                 :class="{fire: item.hot == 1, checked_charge: item.id == checked.id}"
                 @click="checkCharge(item)">
                {{item.des}}
            </div>
        </div>
        <button class="to-charge" @click.prevent="wxPay">立即充值</button>
        <div class="to-recharge-des" @click="toRechargeDes">查看充值说明 ></div>
    </div>
</template>

<style lang="scss" src="./index.scss"></style>
<script src="./index.js"></script>
