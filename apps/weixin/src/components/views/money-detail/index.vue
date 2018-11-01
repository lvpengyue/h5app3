<template>
    <div class="money-details"
         v-if="moneyDetailData && moneyDetailData.data && list.length > 0">
        <van-list v-model="loading"
                  :finished="finished"
                  @load="onLoad">
            <div v-for="item in list">
                <div class="month">{{item.month}}</div>
                <div v-for="sitem in item.details" class="each-detail">
                    <div class="content">
                        <div class="desc-wrap">
                            <p class="desc">{{sitem.description}}</p>
                            <p class="time">{{sitem.createTime}}</p>
                        </div>
                        <div :class="{money_num: true, add: sitem.type == 1}">
                            {{sitem.type == 1 ? '+' : '-'}}{{sitem.money}}
                        </div>
                    </div>
                </div>
            </div>
        </van-list>
    </div>
    <div v-else
         class="my-coupons">
        <div class="empty-data">
            暂无收支明细
        </div>
    </div>
</template>

<style lang="scss" src="./index.scss"></style>
<script src="./index.js"></script>
