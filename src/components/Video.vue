<template>
  <div id="video">
    <!-- 列表 -->
    <div id="videoList">
      <van-list
        v-model="loading"
        :finished="finished"
        error-text="请求失败，点击重新加载"
        finished-text="拉到底啦"
        @load="onLoad"
      >
        <!-- <dev v-for="item in videoList" :key="item.id"> -->
          <video-player class="video-player vjs-custom-skin"
                      ref="videoPlayer"
                      :playsinline="true"
                      :options="playerOptions"
                      
                      >
        </video-player> 
        <!-- </dev> -->
      </van-list>
    </div>
  </div>
</template>


<script>
export default {
  name: "Video",
  data() {
    return {
      loading: false,
      videoList: [
        {
          id: 1,
          videoPath: "",
          title: "周杰伦《告白气球》MV"
        }
      ],
      finished: false,


      playerOptions: {
                    //播放速度
                    playbackRates: [0.5, 1.0, 1.5, 2.0], 
                    //如果true,浏览器准备好时开始回放。
                    autoplay: false, 
                    // 默认情况下将会消除任何音频。
                    muted: false, 
                    // 导致视频一结束就重新开始。
                    loop: false, 
                    // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
                    preload: 'auto', 
                    language: 'zh-CN',
                     // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
                    aspectRatio: '16:9',
                     // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
                    fluid: true,
                    sources: [{
                        //类型
                        type: "video/mp4",
                        //url地址
                        src: 'https://upos-sz-mirrorcos.bilivideo.com/upgcxcode/69/99/94939969/94939969-1-6.mp4?e=ig8euxZM2rNcNbdlhoNvNC8BqJIzNbfq9rVEuxTEnE8L5F6VnEsSTx0vkX8fqJeYTj_lta53NCM=&uipk=5&nbs=1&deadline=1578656407&gen=playurl&os=cosbv&oi=3738458151&trid=2931ee4816b5450a9a82385a4f7a8b28h&platform=html5&upsig=e88cb7cda5b9a3a9197a5c328d346b4d&uparams=e,uipk,nbs,deadline,gen,os,oi,trid,platform&mid=0' 
                    }],
                    //你的封面地址
                    poster: '', 
                     //允许覆盖Video.js无法播放媒体源时显示的默认信息。
                    notSupportedMessage: '此视频暂无法播放，请稍后再试',
                    controlBar: {
                        timeDivider: true,
                        durationDisplay: true,
                        remainingTimeDisplay: false,
                        //全屏按钮
                        fullscreenToggle: true  
                    }
                } 
    };
  },
  // 列表页面
  created() {},
  methods: {
    onLoad() {
      console.log("视频加载中");
    }
  }
};
</script> 

<style scoped>
#video {
  /* background-color: #e4e4e4; */
  text-align: center;
  display: flex;
  justify-content: center;
  width: 100%;
  height: calc(100vh - 5.5rem);
  -webkit-overflow-scrolling: touch;
}
#videoList {
  width: 98%;
}


</style>
