<template>
    <div class="address-box"
         v-if="data">
        <div class="shape">
        </div>
        <div class="address-content">
            <div class="people">
                <p>收货人：{{data.userName}}</p>
                <p>{{data.telephone}}</p>
            </div>
            <div class="address">{{data.province}}{{data.city}}{{data.area}}{{data.streetAddress}}</div>
        </div>
        <div class="choose-address"
             v-show="eidtValid"
             @click="handleShow()">
        </div>
    </div>
</template>

<script src="./index.js"></script>
<style lang="scss" src="./index.scss"></style>
