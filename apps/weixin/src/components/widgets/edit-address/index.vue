<template>
    <div class="address-picker"
         v-if="editVisible">
        <div class="edit-wrap">
            <div class="close">
                <img src="./assets/hide@2x.png"
                     alt=""
                     @click="handleHide()">
            </div>
            <div class="title">编辑收货地址</div>
            <van-field label="收货人"
                      placeholder=""
                      type="text"
                      v-model="location.username"></van-field>
            <van-field label="联系电话"
                      placeholder=""
                      type="tel"
                      v-model="location.phone"></van-field>
            <!-- <div @click="showSelect()">
                <van-field label="省市区"
                      type="text"
                      @focus="showSelect();"
                      v-model="selectAddress">
                </van-field>
            </div> -->
            <van-field label="省市区"
                      type="text"
                      :disabled="true"
                      v-model="selectAddress">
            </van-field>

            <van-field placeholder="详细地址（如街道，小区，乡镇，村）"
                      type="textarea"
                      rows="2"
                      autosize
                      v-model="location.streetAddress"></van-field>

            <div class="btn-wrap">
                <button class="btn" @click="handleAdd()" :class="{submit: this.location.username && this.location.phone && this.location.streetAddress && this.selectAddress.trim()}">提交</button>
            </div>
        </div>
        <div class="pick-mark"
             v-show="addressFlag">
            <div class="btn-box">
                <a class="btn-cancel"
                   @click="addressFlag = !addressFlag">取消</a>
                <a class="btn-sure"
                   @click="onFillAddress">确定</a>
            </div>
            <van-picker class="select"
                       :slots="slots"
                       value-key="aname"
                       @change="onValuesChange"></van-picker>
        </div>
    </div>
</template>

<script src="./index.js"></script>
<style lang="scss" src="./index.scss"></style>
