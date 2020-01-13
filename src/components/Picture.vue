<template>
  <div id="picture">
    <!-- 列表 -->
    <!-- <transition> -->
    <!-- <keep-alive> -->
    <div id="imgList">
      <waterfall
        :col="col"
        :data="imgList"
        @loadmore="loadMore"
        height="100%"
        :width="itemWidth"
        :gutterWidth="gutterWidth"
        @finish="finish"
      >
        <template>
          <div v-for="(img,index) in imgList" :key="index">
            <van-image :src="img" @click="imgPreview(index)">
              <template v-slot:loading>
                <van-loading type="spinner" size="20" />
              </template>
            </van-image>
          </div>
        </template>
      </waterfall>
      <div style="height:2.5rem"></div>
    </div>
    <!-- </keep-alive> -->

    <!-- </transition> -->
    <div id="tail">
      <ul id="tabUl">
        <!-- 标签 -->
        <li id="tabs">
          <van-tabs animated v-model="active" :border="false" @click="changeTab">
            <van-tab v-for="tab in tabList" :title="tab.name" :key="tab.id" :name="tab.name" />
          </van-tabs>
        </li>
        <!-- 搜索 -->
        <li :class="{'search-shrink':isShrink,'search-unfold':isUnfold}">
          <van-search
            :show-action="isUnfold"
            @click="scaleAnime"
            @cancel="searchCancel"
            @blur="searchBlur"
            @search="onSearch"
            shape="round"
            placeholder="请输入搜索关键词"
            v-model="value"
          />
        </li>
      </ul>
    </div>
  </div>
</template>


<script>
import { ImagePreview } from "vant";
export default {
  name: "Picture",
  data() {
    return {
      col: 2,
      active: "风景",
      value: "",
      isShrink: true,
      isUnfold: false,

      tabList: [
        {
          id: 1,
          name: "风景",
          keyword: "scenery"
        }, 
        {
          id: 3,
          name: "美女",
          keyword: "girl"
        },
        {
          id: 4,
          name: "城市",
          keyword: "city"
        },
        {
          id: 5,
          name: "电影",
          keyword: "movie"
        },
        {
          id: 6,
          name: "动漫",
          keyword: "anime"
        }
      ],

      imgList: [],
      loading: false,
      finished: false,

      searchId: "",
      page: 1,

      versionNo: 1
    };
  },
  // 列表页面
  created() {
    this.onSearch(this.active, this.versionNo);
    this.$axiosUtils.initCategory(() => {
      // this.tabList = result
    });
  },
  computed: {
    itemWidth() {
      return (
        (document.documentElement.offsetWidth * 0.98 - this.gutterWidth) * 0.5 //rem布局 计算宽度
      );
    },
    gutterWidth() {
      return 5; //间距
    }
  },
  methods: {
    changeTab(name) {
      this.onSearch(name, this.versionNo);
    },
    onSearch(searchText, versionNo) {
      searchText = !searchText ? this.value : searchText;

      this.imgList = [];
      this.page = 1;
      this.versionNo++;
      this.$axiosUtils.queryimgUrls(searchText, resultObj => {
        if (versionNo && this.versionNo > versionNo + 1) {
          return;
        }
        this.imgList = resultObj.imgList;
        this.searchId = resultObj.location.substr(
          resultObj.location.indexOf("=") + 1
        );
      });
    },

    imgPreview(index) {
      ImagePreview({
        images: this.imgList,
        startPosition: index
      });
      // push test
    },
    scaleAnime() {
      this.isShrink = false;
      this.isUnfold = true;
    },
    searchCancel() {
      this.isShrink = true;
      this.isUnfold = false;
    },
    // 输入框失焦
    searchBlur() {
      // setTimeout(() => {
      //   window.scrollTo(0, 0);
      // }, 100);
      setTimeout(() => {
        let result = "pc";
        if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
          //判断iPhone|iPad|iPod|iOS
          result = "ios";
        } else if (/(Android)/i.test(navigator.userAgent)) {
          //判断Android
          result = "android";
        }
        if (result == "ios") {
          document.activeElement.scrollIntoViewIfNeeded(true);
        }
      }, 100);
    },
    loadMore() {
      console.log("加载图片中···");

      this.$axiosUtils.nextPage(this.page, this.searchId, imgList => {
        if (imgList.length == 0) {
          this.$toast({
            message: "拉到底啦",
            icon: "fail"
          });
          return;
        }
        this.imgList.push(...imgList);
        this.page++;
      });
    },
    finish() {
      console.log("渲染完成···");
    },
    swipe() {
      console.log("滑动事件···");
    }
  }
};
</script> 

<style scoped>
#picture {
  /* background-color: #e4e4e4; */
  text-align: center;
  display: flex;
  justify-content: center;
  width: 100%;
  height: calc(100vh - 5.5rem);
  -webkit-overflow-scrolling: touch;
}
#imgList {
  width: 98%;
  /* background-color: #e4e4e4; */
  /* opacity: 0.9; */
  /* padding: 5px 0; */
}
#tail {
  position: fixed;
  bottom: 0;
  height: 2.5rem;
  width: 100%;
  overflow: hidden;
}

#tabs {
  width: calc(100% - 2.5rem);
  position: fixed;
  left: 0;
}

.search-shrink {
  width: 2.5rem;
  height: 2.5rem;
  z-index: 99;
  position: fixed;
  right: 0;
  box-shadow: -4px 0 5px -5px;
}
.search-unfold {
  position: fixed;
  z-index: 99;
  height: 2.5rem;
  width: 100%;
  left: 0;
  border: 0;
}
/deep/ .van-tabs__line {
  bottom: 3.5rem;
}
/deep/ .van-tab {
  line-height: 2.5rem;
  height: 2.5rem;
  flex-basis: 18% !important;
}
/deep/ .van-search {
  padding: 0.2rem 0.3rem;
}
/deep/ .van-field__left-icon {
  margin: 0;
  width: 1rem;
  height: 1rem;
}
</style>
