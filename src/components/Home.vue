<template>
  <div id="home">
    <van-tabs v-model="active" swipeable sticky>
      <van-tab v-for="tab in tabList" :title="tab.name" :key="tab.id" :name="tab.id">
        <keep-alive>
          <component :is="tab.component"/> 
        </keep-alive>
      </van-tab>
    </van-tabs>
  </div>
</template>


<script>
import Picture from "./Picture.vue";
import Video from "./Video.vue";
export default {
  components :{
    Picture,
    Video
  },  
  name: "Home",
  data() {
    return {
      active: 2,
      tabList: [
        {
          id: 1,
          name: "图片",
          component: Picture
        },
        {
          id: 2,
          name: "视频",
          component: Video
        }
      ]
    };
  }, 
  created() {},
  methods: {}
};
</script> 

<style scoped>
#home {
  background-color: #e4e4e4;
  text-align: center;
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100vh;
  overflow: scroll;
  -webkit-overflow-scrolling: touch;
}

/deep/ .van-tab {
  
}
/deep/ .van-tabs__content {
  height: calc(100% - 5rem);
  width: 100vw;
}
</style>
