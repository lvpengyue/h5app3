<template>
    <div class="feedback">
        <textarea name=""
                  v-model="content"
                  maxlength="200"
                  id=""
                  placeholder="请写下您的意见或建议"
                  rows="8"></textarea>
        <p class="title">请选择您的反馈类型</p>
        <van-checkbox-group v-model="type">
            <van-checkbox v-for="(item, index) in list"
                          :key="index"
                          :name="item">
                {{ item }}
            </van-checkbox>
        </van-checkbox-group>
        <p class="title">联系方式</p>
        <input type="text" v-model="contact" @focus="scrollTop" id="contact">
        <button class="submit" @click.prevent="handleSubmit()">立即提交</button>
    </div>
</template>

<style lang="scss" src="./index.scss"></style>
<script src="./index.js"></script>
