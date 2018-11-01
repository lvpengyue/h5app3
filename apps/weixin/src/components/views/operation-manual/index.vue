<template>
    <div class="operation-manual">
        <van-cell-group>
            <van-cell value="新人指南"
                      :to="{name: 'newman-manual'}"
                      is-link>
            </van-cell>
            <van-cell title="洗衣指南"
                      :to="{name: 'wash-manual'}"
                      is-link />
            <van-cell title="订单异常"
                      :to="{name: 'exception-manual'}"
                      is-link />
        </van-cell-group>
    </div>
</template>

<style lang="scss" src="./index.scss"></style>
<script src="./index.js"></script>
