<template>
    <div class="comment-list"
         v-if="commentListData && commentListData.data.total > 0 && list.length > 0">
        <van-list v-model="loading"
                  :finished="finished"
                  @load="onLoad">
            <div v-for="item in list"
                 class="each-comment">
                <div class="top">
                    <div class="logo">
                        <img :src="item.logo+'?x-oss-process=image/resize,m_fill,h_120,w_120'"
                             alt="">
                    </div>
                    <div class="user">
                        <p>{{item.userName}}</p>
                        <div class="star">
                            <img src="./assets/yellow-star.png"
                                 alt=""
                                 v-for="n in item.star">
                            <div class="star-level">
                                {{starList[item.star]}}
                            </div>
                        </div>
                    </div>
                    <div class="comment-time">
                        {{item.createTime.split(' ')[0]}}
                    </div>
                </div>
                <div class="content">
                    {{item.content}}
                </div>
                <div class="comment-imgs">
                    <img :src="url+'?x-oss-process=image/resize,m_fill,h_320,w_320'"
                         alt=""
                         v-for="url in item.imgs">
                </div>
            </div>
        </van-list>
    </div>
    <div v-else-if="commentListData && list.length > 0"
         class="comment-list">
        <div class="empty-data">
            暂无评价数据
        </div>
    </div>

</template>

<style lang="scss" src="./index.scss"></style>
<script src="./index.js"></script>
