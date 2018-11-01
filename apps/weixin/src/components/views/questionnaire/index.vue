<template>
    <div class="recharge-des">
        <form action="">
            <div class="section">
                <p class="title">
                    1、您在使用APP过程中是否遇到体验不好的情况？
                </p>
                <van-radio-group v-model="params.choose">
                    <van-radio name="有">有</van-radio>
                    <van-radio name="没有">没有</van-radio>
                </van-radio-group>
            </div>
            <div class="section">
                <p class="title">
                    2、是什么原因造成APP使用体验不好？
                </p>
                <textarea name=""
                          class="content-textarea"
                          id=""
                          v-model="params.reason"
                          cols="30"
                          placeholder="描述详细情况，有助于我们帮您快速解决"
                          rows="10"></textarea>
            </div>
            <div class="section">
                <p class="title">
                    3、除此之外，您希望我们增加哪些功能或对已有功能有什么意见或建议
                </p>
                <textarea name=""
                          @focus="scrollTop"
                          id="suggestion"
                          class="content-textarea"
                          v-model="params.suggestion"
                          cols="30"
                          rows="10"
                          placeholder="提出您的优化建议，帮助我们做得更好">

                </textarea>
            </div>
            <button class="submit" @click.prevent="handleSubmit()">提交</button>
        </form>
    </div>
</template>

<style lang="scss" src="./index.scss"></style>
<script src="./index.js"></script>
