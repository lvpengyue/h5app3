<template>
    <div class="address-list" v-if="addressListDetail">
        <div id="allmap"></div>
        <div class="address-top">
            <p>区域</p>
            <p>楼层</p>
        </div>
        <div class="list-content">
            <ul class="area-list">
                <li v-for="item in areaList"
                    @click="chooseArea(item)"
                    :class="{choosed: item.name === choosedArea.name}">{{ item.name}}</li>
            </ul>
            <ul class="floor-list">
                <li v-for="sitem in choosedArea.areaList" @click="chooseFloor(sitem.id)">{{ sitem.name }}</li>
            </ul>
        </div>
    </div>
</template>

<style lang="scss" src="./index.scss"></style>
<script src="./index.js"></script>
