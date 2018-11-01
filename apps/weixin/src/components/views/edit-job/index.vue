<template>
    <div class="edit-job">
        <van-cell-group>
            <van-field v-model="job"
                       label=""
                       :border="false"
                       :clearable="true"
                       placeholder="请输入职业"
                       :error="error"
                       :error-message="message"/>
        </van-cell-group>
        <div class="tip">职业长度为1-20个字符</div>
        <van-button type="default" size="large" @click.prevent="submit" :loading="loading">保存</van-button>
    </div>
</template>

<style lang="scss" src="./index.scss"></style>

<script src="./index.js"></script>
