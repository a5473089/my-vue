<template>
  <div id="video">
    <!-- 列表 -->
    <div id="videoList">
      <van-grid :column-num="3" :gutter="10" :border="false">
        <van-grid-item
          v-for="(img,idx) in imgList"
          :key="idx"
          :text="img.title"
          @click="dialogWindow(img)"
        >
          <van-image :src="img.src">
            <template v-slot:loading>
              <van-loading type="spinner" size="20" />
            </template>
          </van-image>
          <span class="title">{{img.title}}</span>
        </van-grid-item>
      </van-grid>
    </div>
    <!-- 筛选 -->
    <div id="search" :class="{'search-show':searchShow,'search-hidden':!searchShow}">
      <span id="searchBottom" @click="searchShow = !searchShow">
        <van-icon v-show="searchShow" name="arrow" />
        <van-icon v-show="!searchShow" name="arrow-left" />
      </span>

      <van-row type="flex" v-for="(tagType,index) in tagTypeList" :key="index" gutter="20">
        {{tagType.title}}：
        <van-col v-for="(tag,tIndex) in tagType.tagList" :key="tIndex">
          <van-tag
            :color="tag.active ? '#ee0a24':'#667380'"
            @click="tabClick(tag,tagType.tagList)"
          >{{tag.name}}</van-tag>
        </van-col>
      </van-row>

      <van-row>
        <van-search
          show-action
          action-text="搜索"
          background="#4a4b4d"
          shape="round"
          placeholder="请输入搜索关键词"
        />
      </van-row>
    </div>

    <!-- dialog -->
    <van-dialog
      :title="dialogTitle"
      v-model="dialogShow"
      cancel-button-text="关闭"
      show-cancel-button
      @cancel="dialogCancel"
      :show-confirm-button="false"
    >
      <van-loading v-if="loading" color="#1989fa" />
      <div v-else>
        <video-player
          class="video-player vjs-custom-skin"
          ref="videoPlayer"
          :playsinline="true"
          :options="playerOptions"
        />
        <!-- playList -->
        <div id="playList">
          <van-button
            v-for="(obj,index) in playList"
            :key="index"
            round
            size="small"
            :plain="obj.title === playActiveTitle?false:true"
            @click="changeVideo(obj)"
            type="primary"
          >{{obj.title}}</van-button>
        </div>
      </div>
    </van-dialog>

    <div id="hiddenPage"></div>
  </div>
</template>


<script>
export default {
  name: "Video",
  data() {
    return {
      playList: [],
      playActiveTitle: "",
      dialogTitle: "",
      dialogShow: false,
      loading: true,
      searchShow: false,
      imgList: [],
      tagTypeList: [
        {
          active: false,
          title: "类型",
          tagList: [
            {
              active: false,
              name: "爱情"
            },
            {
              active: false,
              name: "爱情"
            },
            {
              active: false,
              name: "爱情"
            },
            {
              active: false,
              name: "爱情"
            },
            {
              active: false,
              name: "爱情"
            }
          ]
        },
        {
          id: 2,
          title: "类型",
          tagList: [
            {
              active: false,
              name: "爱情"
            },
            {
              active: false,
              name: "爱情"
            },
            {
              active: false,
              name: "爱情"
            },
            {
              active: false,
              name: "爱情"
            },
            {
              active: false,
              name: "爱情"
            }
          ]
        },
        {
          id: 3,
          title: "类型",
          tagList: [
            {
              active: false,
              name: "爱情"
            },
            {
              active: false,
              name: "爱情"
            },
            {
              active: false,
              name: "爱情"
            },
            {
              active: false,
              name: "爱情"
            },
            {
              active: false,
              name: "爱情"
            }
          ]
        }
      ],
      finished: false,
      playerOptions: {
        //播放速度
        playbackRates: [0.5, 0.75, 1.0, 1.25, 1.5, 2.0],
        //如果true,浏览器准备好时开始回放。
        autoplay: false,
        // 默认情况下将会消除任何音频。
        muted: false,
        // 导致视频一结束就重新开始。
        loop: false,
        // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        preload: "auto",
        language: "zh-CN",
        // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        aspectRatio: "16:9",
        // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        fluid: true,
        sources: [
          {
            //类型
            type: "video/mp4",
            //url地址
            src: ""
            // http://113.142.51.15/mv.music.tc.qq.com/A5pfW1081Cug22YJej4oFJFPVutMZHLKw5mM8QGrghII/149174EB1D866701995A6D47D88E8554BD47FEE1970F95BB2CEF83B44E95992FBCEB1DF809B6D27DB130A869CE484BC9ZZqqmusic_default/1049_M0101902004M3BA53WwsP91001456203.f40.mp4?fname=1049_M0101902004M3BA53WwsP91001456203.f40.mp4
          }
        ],

        //你的封面地址
        poster: "",
        //允许覆盖Video.js无法播放媒体源时显示的默认信息。
        notSupportedMessage: "此视频暂无法播放，请稍后再试",
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
  created() {
    this.$videoAxiosUtils.queryImgUrls("", result => {
      this.imgList = result;
    });
  },
  methods: {
    onLoad() {
      console.log("视频加载中");
    },
    tabClick(tag, tagList) {
      tag.active = !tag.active;
      tagList.forEach(e => {
        if (e !== tag) {
          e.active = false;
        }
      });
    },
    dialogWindow(obj) {
      this.loading = true;
      this.dialogTitle = obj.title;
      this.dialogShow = !this.dialogShow;
      this.playerOptions.sources[0].src = "";

      this.$videoAxiosUtils.queryVideoInfo(obj.href, srcObj => {
        this.playerOptions.sources[0].src = srcObj.src;
        this.playList = srcObj.playList;
        this.playActiveTitle = srcObj.playList[0].title;
        this.loading = false;
      });
    },

    dialogCancel() {
      console.log(this.$refs.videoPlayer);
      this.$refs.videoPlayer.player.pause();
    },
    changeVideo(obj) {
      this.playActiveTitle = obj.title;
      this.playerOptions.sources[0].src = obj.href;
    }
  }
};
</script> 

<style scoped>
#video {
  /* background-color: #24292e; */
  text-align: center;
  display: flex;
  justify-content: center;
  width: 100%;
  height: calc(100vh - 2.5rem);
  -webkit-overflow-scrolling: touch;
}
#videoList {
  width: 100%;
  margin: 0.2rem 0;
}
.title {
  width: 5.5rem;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

#search {
  height: 20vh;
  position: fixed;
  bottom: 0;
  width: 85%;
  padding-left: 1.5rem;
  background-color: #4a4b4d;
  font-size: 0.8rem;
  color: white;
  border-top-left-radius: 0.5rem;
  border-bottom-left-radius: 0.5rem;
  transition: left 0.3s ease-in;
  opacity: 0.85;
}
.search-show {
  left: 10%;
}
.search-hidden {
  left: 100%;
}
#playList {
  margin-top: 1rem;
}

#playList > button {
  margin-left: 0.5rem;
  border: 1px solid rgb(97, 197, 97);
}
#searchBottom {
  position: absolute;
  padding-left: 0.1rem;
  top: 2rem;
  height: 1.5rem;
  line-height: 1.6rem;
  width: 1.3rem;
  left: -1.3rem;
  background-color: #4a4b4d;
  border-top-left-radius: 1.5rem;
  border-bottom-left-radius: 1.5rem;
}
#hiddenPage {
  width: 0;
  height: 0;
}

/deep/ .van-grid-item__content {
  padding: 0;
}
/deep/ .van-row {
  margin-top: 0.5rem;
}
/deep/ .van-search {
  padding: 0.2rem 0.3rem;
}
/deep/ .van-search__action {
  color: white;
  background-color: #4a4b4d;
  border-radius: 2.5rem;
}
/deep/ .van-search__action:active {
  background-color: #333638;
}

</style>
