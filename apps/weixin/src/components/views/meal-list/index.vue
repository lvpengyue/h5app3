<template>
    <div class="my-meal-list" v-if="mealListData && mealListData.data">
        <div v-if="mealListData.data.length < 1" class="empty-card">
            暂无月卡
        </div>
        <template v-else>
            <div v-for="item in mealListData.data"  class="each-card" :class="{working: item.state == 1, no_working: item.state == 2}">
                <img src="./assets/working.png" alt="" v-if="item.state == 1">
                <img src="./assets/no-working.png" alt="" v-else>
                <div class="card-detail">
                    <p>悠洗洗衣·月卡</p>
                    <p>有效至：{{item.endTime.split(' ')[0]}}</p>
                </div>
            </div>
        </template>
    </div>
</template>

<style lang="scss" src="./index.scss"></style>

<script src="./index.js"></script>
