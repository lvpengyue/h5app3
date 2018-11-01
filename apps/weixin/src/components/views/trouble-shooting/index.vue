<template>
    <div class="trouble-shooting">
        <div class="content-wrap">
            <h3 class="title">洗衣机故障警报问题处理</h3>
            <hr>

            <div class="section">
                <p class="big">错误代码E0：进水超时</p>
                <p class="small">说明: 洗衣机进水超时30分钟</p>
                <p class="small">解决方案: 请确认是否有水源，检查水龙头开关，并把洗衣机上盖打开再合上</p>
            </div>

            <div class="section">
                <p class="big">错误代码E1：排水超时</p>
                <p class="small">说明: 洗衣机排水超过5分钟</p>
                <p class="small">解决方案: 请确认排水管道是否有堵塞物，再重新打开洗衣机上盖后合上</p>
            </div>

            <div class="section">
                <p class="big">错误代码E2：脱水不平衡</p>
                <p class="small">说明: 脱水桶撞3次</p>
                <p class="small">解决方案：请把洗衣机上盖打开再合上</p>
            </div>

            <div class="section">
                <p class="big">错误代码E3：门盖打开</p>
                <p class="small">说明: 安全开关断开</p>
                <p class="small">解决方案: 请检查洗衣机上盖是否有关好，再把洗衣机上盖合上</p>
            </div>

            <div class="section">
                <p class="big">错误代码E4：水位传感器异常</p>
                <p class="small">说明: 水位传感器松脱</p>
                <p class="small">解决方案: 重启洗衣机，请先断开电源后，再插上</p>
            </div>

            <div class="section">
                <p class="big">错误代码E6：电机故障</p>
                <p class="small">说明: 电机应该转动时没有动作或者电机不动作时发生了动作</p>
                <p class="small">解决方案: 重启洗衣机，请先断开电源后，再插上</p>
            </div>

            <div class="section">
                <p class="big">错误代码E8：存储器故障</p>
                <p class="small">说明: 内部存储器发生故障</p>
                <p class="small">解决方案: 重启洗衣机，请先断开电源后，再插上</p>
            </div>
        </div>

        <button class="toReport"
                @click="toReport">故障报修</button>
    </div>
</template>

<style lang="scss" src="./index.scss"></style>
<script src="./index.js"></script>
