<template>
    <div class="to-comment">
        <div class="content_img">
            <van-field v-model="params.content"
                       label=""
                       type="textarea"
                       placeholder="请输入评价"
                       rows="5"
                       autosize />
            <div class="imgs">
                <div v-for="(item, index) in imgList"
                     class="img-wrap">
                    <img :src="`${item}?x-oss-process=image/resize,m_fill,h_320,w_320`"
                         alt="">
                    <van-icon name="clear"
                              @click="clearImg(index)"></van-icon>
                </div>
                <van-uploader :after-read="onRead"
                              v-show="imgList.length < 3"
                              accept="image/gif, image/jpeg"
                              type="file"
                              :multiple="false">
                    <!-- <van-icon name="photograph" /> -->
                    <img src="./assets/add.png" alt="">
                </van-uploader>
                <!-- <input type="file" name="image" accept=“image/*” @change='handleInputChange'> -->
            </div>
        </div>
        <div class="stars">
            <div class="each-star">
                <p class="title">商品评价</p>
                <van-rate v-model="params.star" :size="isIOS ? 40 : 20"/>
                <p class="str">{{starStr}}</p>
            </div>
            <div class="each-star">
                <p class="title">物流服务</p>
                <van-rate v-model="params.logisticStar" :size="isIOS ? 40 : 20"/>
                <p class="str">{{logisticStarStr}}</p>
            </div>

            <!-- <div class="btn" @click="push()" v-show="hideButton">发布</div> -->
            <van-button class="btn" type="primary" size="large" :loading="submitLoading" @click="push()" v-show="hideButton">发布</van-button>
        </div>
    </div>
</template>

<script src="./index.js"></script>

<style lang="scss" src="./index.scss"></style>
