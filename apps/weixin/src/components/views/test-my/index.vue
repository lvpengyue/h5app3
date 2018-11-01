<template>
    <div class="wash">
        <van-address-edit :area-list="areaList"
                          show-postal
                          show-delete
                          show-set-default
                          show-search-result
                          :search-result="searchResult"
                          @save="onSave"
                          @delete="onDelete"
                          @change-detail="onChangeDetail" />
    </div>
</template>

<style lang="scss" src="./index.scss"></style>
<script src="./index.js"></script>
