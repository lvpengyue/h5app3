<template>
    <div class="fail-reporting" v-if="" id="fail-reporting">
        <p class="title">发现洗衣故障</p>
        <input type="hidden" value="params.washerId">
        <div class="code">
            <van-field v-model="params.washerName"
                           label="洗衣机编码"
                           left-icon="contact"
                           :disabled="canInput" />
        </div>
        <van-checkbox-group v-model="type">
            <van-checkbox v-for="(item, index) in list"
                          :key="index"
                          :name="item">
                {{ item }}
            </van-checkbox>
        </van-checkbox-group>
        <div class="img-list">
            <template v-for="(item, index) in imgList">
                <div class="img-wrap">
                    <img :src="`${item}?x-oss-process=image/resize,m_fill,h_320,w_320`"
                         alt="">
                    <van-icon name="clear" @click="clearImg(index)"></van-icon>
                </div>

            </template>
            <div class="img-wrap upload-wrap" v-show="imgList.length < 3">
                <img src="./assets/add.png" alt="" @click="toUpload">
            </div>
        </div>
        <textarea @focus="scrollTop" id="remarks" cols="5" v-model="params.remarks" placeholder="备注"></textarea>
        <button class="submit" @click.prevent="handleSubmit()">立即提交</button>
    </div>
</template>

<style lang="scss" src="./index.scss"></style>
<script src="./index.js"></script>
