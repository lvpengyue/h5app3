<template>
    <div class="meal"
         v-if="mealData && mealData.data">
         <div class="my-card" @click="toMealList">我的月卡</div>
        <template v-if="mealData.data.mealList.length == 1">
            <div class="card">
                <p class="card-title">
                    <span class="card-name">悠洗洗衣</span>
                    <span>月卡</span>
                </p>
                <div class="card-detail">
                    <p class="price">价值<span>{{currentMeal.amount / 100}}</span>元</p>
                    <p class="days">有效期
                        <span>{{currentMeal.day}}</span>天</p>
                </div>
            </div>

            <h3 class="title">{{currentMeal.day}}天免费洗衣</h3>

            <ul class="rule">
                <li v-for="item in mealData.data.rules">
                    {{item}}
                </li>
            </ul>

            <div class="buy" @click="toBuy">
                立即购买
            </div>
        </template>

        <template v-if="mealData.data.mealList.length > 1">
            <div class="card many-card">
                <p class="card-title">
                    <span class="card-name">悠洗洗衣</span>
                    <span>月卡</span>
                </p>
                <p class="start-and-end">有效日期{{startAndEndTime}}</p>
                <p class="day">{{currentMeal.day}}天</p>
            </div>

            <h3 class="title">{{currentMeal.day}}天免费洗衣</h3>

            <div class="card-list">
                <template v-for="item in mealData.data.mealList">
                    <div class="each-card" v-if="item.amount == item.oriAmount" :class="{active: item.id == currentMeal.id}"  @click="selectedCurrent(item)">
                        <!--原价和现在相等，只显示现价-->
                        <span class="now-account">{{(item.amount / 100).toFixed(1)}}元</span>
                    </div>
                    <div class="each-card" v-else :class="{active: item.id == currentMeal.id}"  @click="selectedCurrent(item)">
                        <div>
                            <span class="now-account">{{(item.amount / 100).toFixed(1)}}元</span>
                            <span class="ori-amount">{{(item.oriAmount / 100).toFixed(0)}}元</span>
                        </div>
                    </div>
                </template>

            </div>

            <ul class="rule">
                <li v-for="item in mealData.data.rules">
                    {{item}}
                </li>
            </ul>

            <div class="many-buy">
                <div class="pay-price">{{(currentMeal.amount / 100).toFixed(2)}}<span>元</span></div>
                <div class="buy-btn" @click="toBuy">购买</div>
            </div>
        </template>

    </div>
</template>

<style lang="scss" src="./index.scss"></style>

<script src="./index.js"></script>
