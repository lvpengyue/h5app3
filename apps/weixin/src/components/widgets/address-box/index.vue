<template>
    <div class="address-box"
         v-if="$groupAddress">
        <div class="shape">
        </div>
        <div class="address-content">
            <div class="people">
                <p>收货人：{{$groupAddress.data.userName}}</p>
                <p>{{$groupAddress.data.telephone}}</p>
            </div>
            <div class="address">{{$groupAddress.data.province}}{{$groupAddress.data.city}}{{$groupAddress.data.area}}{{$groupAddress.data.streetAddress}}</div>
        </div>
        <div class="choose-address"
             v-show="eidtValid"
             @click="handleShow()">
        </div>
    </div>
</template>

<script src="./index.js"></script>
<style lang="scss" src="./index.scss"></style>
