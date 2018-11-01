<template>
    <div class="hand-input">
        <van-cell-group>
            <van-field v-model="code"
                       placeholder="请输入洗衣机编号" />
        </van-cell-group>
        <button @click="toBind">立即使用</button>
        <p class="title">温馨提示：</p>
        <p class="content">输入洗衣机编号或二维码旁15位数字编码进行绑定，洗衣机编号位于洗衣机显示板左侧</p>
    </div>
</template>

<style lang="scss" src="./index.scss"></style>
<script src="./index.js"></script>
