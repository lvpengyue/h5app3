<template>
    <div class="recharge-des">
        <textarea name=""
                  id=""
                  cols="30"
                  rows="10"
                  v-model="refundReason"
                  placeholder="申请内容(限200字符以内)"
                  maxlength="200"></textarea>
        <div class="tip">
            <h4>温馨提示：</h4>
            <p>退款申请审核成功后，系统将自动把订单支付金额转入您的账户余额</p>
        </div>
        <button class="submit" @click="handleSubmit()">提 交</button>
    </div>
</template>

<style lang="scss" src="./index.scss"></style>
<script src="./index.js"></script>
