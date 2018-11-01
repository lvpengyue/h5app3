<template>
    <div class="mall-my-orders">
        <div class="banner">
            <p :class="{active: showCommon}"
               @click="changeShow('normal')">普通订单</p>
            <p :class="{active: !showCommon}"
               @click="changeShow('group')">拼团订单</p>
        </div>
        <div v-show="showCommon" class="list">
            <van-list v-model="loadingNormal"
                      :finished="finishedNormal"
                      v-if="listNormal.length > 0"
                      @load="onLoad">
                <div v-for="item in listNormal"
                     @click="ToOrderDetail(item.id)"
                     class="each-comment">
                    <mall-order-box :data="item"></mall-order-box>
                </div>
            </van-list>
            <div v-else-if="mallMyOrdersData && !listNormal.length" class="empty-data">
                <img src="./assets/empty-data.png" alt="">
                <p>暂无订单数据</p>
                <p>快去看看商品吧~</p>
            </div>
        </div>
        <div v-show="!showCommon" class="list">
            <van-list v-model="loadingGroup"
                      :finished="finishedGroup"
                      v-if="listGroup.length > 0"
                      @load="onLoadGroup">
                <div v-for="item in listGroup"
                     @click="ToOrderDetail(item.id)"
                     class="each-comment">
                    <mall-order-box :data="item"></mall-order-box>
                </div>
            </van-list>
            <div v-else-if="mallMyOrdersData && !listGroup.length" class="empty-data">
                <img src="./assets/empty-data.png" alt="">
                <p>暂无订单数据</p>
                <p>快去看看商品吧~</p>
            </div>
        </div>
    </div>
</template>

<style lang="scss" src="./index.scss"></style>

<script src="./index.js"></script>
