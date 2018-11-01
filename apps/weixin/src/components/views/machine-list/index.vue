<template>
    <div class="machine-list" v-if="machineListDetail">
        <div v-for="item in machineListDetail.data"
             @click="toModePay(item)"
             class="machine"
             :class="{use: item.state < 2, using: (item.state == 1), nouse: item.state >= 2}">
            <img src="./assets/use.png"
                 v-if="item.state < 2"
                 alt="">
            <img src="./assets/no-use.png"
                 v-if="item.state >= 2"
                 alt="">
            <p class="machine-code">{{item.name}}</p>
            <!-- <marquee class="machine-code" behavior="slide" scrollAmount="3">{{item.name}}</marquee> -->
            <p class="address-code">{{item.address}}</p>
            <p class="machine-status">{{item.stateStr}}</p>
        </div>
        <div class="relocation" @click="toAddressList()">
            重新定位地址
        </div>
    </div>
</template>

<style lang="scss" src="./index.scss"></style>
<script src="./index.js"></script>
