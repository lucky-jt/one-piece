<template>
  <div class="home">
    <!-- 添加返回按钮 -->
    <!-- <div class="back-button">
      <n-button
        quaternary
        circle
        size="large"
        @click="router.push('/')"
        class="back-home-btn"
      >
        <template #icon>
          <n-icon size="20">
            <home-icon />
          </n-icon>
        </template>
      </n-button>
      <div class="tooltip">返回首页</div>
    </div> -->
    <NavBar />
    <div class="map-container">
      <div id="map">
        <MMap ref="mapRef" />
      </div>
      <div class="popup-container">
        <PopUp
          :friendList="friendList"
          class="pop-up"
          @getNewDataFn="getNewDataFn"
          @setOutsideFriendInfoFn="setOutsideFriendInfoFn"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, nextTick } from "vue";
import { useRouter } from "vue-router";
import { HomeOutline as HomeIcon } from "@vicons/ionicons5";
import MMap from "@/components/MMap.vue";
import PopUp from "./components/PopUp.vue";

import xghPic from "@/assets/images/xgh.jpg";
import hlnPic from "@/assets/images/hln.jpg";
import dwxPic from "@/assets/images/dwx.jpg";
import cyjPic from "@/assets/images/cyj.jpg";

const router = useRouter();
const mapRef: any = ref(null);
const totalList: any = ref([]);
const friendList: any = ref([]);
const friendInfo: any = ref({});

let aIndex = 0;
nextTick(() => {
  totalList.value = [
    [
      {
        id: 1,
        name: "桂花菌",
        sex: 0,
        address: "北京市朝阳区",
        profession: "前端开发工程师",
        hobby: "打篮球",
        groupBy: "财运滚滚来",
        pic: xghPic,
        location: {
          lat: 39.92,
          lng: 116.508197,
        },
      },
      {
        id: 2,
        name: "猫、咖啡",
        sex: 1,
        address: "广州市天河区",
        profession: "前端开发工程师",
        hobby: "看剧",
        groupBy: "财运滚滚来",
        pic: hlnPic,
        location: {
          lat: 23.160195000000005,
          lng: 113.411701,
        },
      },
      {
        id: 3,
        name: "浠",
        sex: 0,
        address: "广州市黄埔区",
        profession: "全栈开发工程师",
        hobby: "刷b站",
        groupBy: "财运滚滚来",
        pic: dwxPic,
        location: {
          lat: 23.18140900000002,
          lng: 113.48052800000005,
        },
      },
      {
        id: 4,
        name: "垠",
        sex: 1,
        address: "广州市海珠区",
        profession: "设计",
        hobby: "画画",
        groupBy: "财运滚滚来",
        pic: cyjPic,
        location: {
          lat: 23.087575999999995,
          lng: 113.35787400000004,
        },
      },
    ],
    [
      {
        id: 1,
        name: "桂花菌1",
        sex: 0,
        address: "北京市朝阳区",
        profession: "前端开发工程师",
        hobby: "打篮球",
        groupBy: "财运滚滚来",
        pic: xghPic,
        location: {
          lat: 39.92,
          lng: 116.508197,
        },
      },
      {
        id: 2,
        name: "猫、咖啡1",
        sex: 1,
        address: "广州市天河区",
        profession: "前端开发工程师",
        hobby: "看剧",
        groupBy: "财运滚滚来",
        pic: hlnPic,
        location: {
          lat: 23.160195000000005,
          lng: 113.411701,
        },
      },
      {
        id: 3,
        name: "浠1",
        sex: 0,
        address: "广州市黄埔区",
        profession: "全栈开发工程师",
        hobby: "刷b站",
        groupBy: "财运滚滚来",
        pic: dwxPic,
        location: {
          lat: 23.18140900000002,
          lng: 113.48052800000005,
        },
      },
      {
        id: 4,
        name: "垠1",
        sex: 1,
        address: "广州市海珠区",
        profession: "设计",
        hobby: "画画",
        groupBy: "财运滚滚来",
        pic: cyjPic,
        location: {
          lat: 23.087575999999995,
          lng: 113.35787400000004,
        },
      },
    ],
  ];
  friendList.value = totalList.value[aIndex];
  friendInfo.value = friendList.value[0];
  if (mapRef?.value) {
    mapRef?.value?.addCover(friendList.value);
    mapRef?.value?.setPosition(
      friendInfo.value.location.lat,
      friendInfo.value.location.lng
    );
  }
});

function getNewDataFn() {
  if (aIndex < totalList.value.length - 1) {
    aIndex++;
  } else {
    aIndex = 0;
  }
  friendList.value = [...totalList.value[aIndex]];
  friendInfo.value = friendList.value[0];
  nextTick(() => {
    if (mapRef?.value?.setPosition) {
      mapRef?.value?.setPosition(
        friendInfo.value.location.lat,
        friendInfo.value.location.lng
      );
    }
  });
}

function setOutsideFriendInfoFn(data: any) {
  friendInfo.value = data;
  nextTick(() => {
    if (mapRef?.value?.setPosition) {
      mapRef?.value?.setPosition(
        friendInfo.value.location.lat,
        friendInfo.value.location.lng
      );
    }
  });
}
</script>

<style lang="less" scoped>
.home {
  width: 100%;
  height: 100vh;
  background-color: var(--background-color);
  position: relative;
  display: flex;
  flex-direction: column;

  .back-button {
    position: absolute;
    top: 20px;
    left: 20px;
    z-index: 10;
    display: flex;
    align-items: center;
    gap: 10px;

    .back-home-btn {
      background: rgba(255, 255, 255, 0.9);
      backdrop-filter: blur(5px);
      box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
      transition: all 0.3s ease;

      &:hover {
        transform: scale(1.05);
        background: rgba(255, 255, 255, 1);
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);

        & + .tooltip {
          opacity: 1;
          transform: translateX(0);
        }
      }
    }

    .tooltip {
      background: rgba(0, 0, 0, 0.75);
      color: white;
      padding: 6px 12px;
      border-radius: 4px;
      font-size: 14px;
      opacity: 0;
      transform: translateX(-10px);
      transition: all 0.3s ease;
      pointer-events: none;
    }
  }
  .detail {
    position: absolute;
    right: 20px;
    top: 20px;
    width: 380px;
    height: 280px;
    background-color: #fff;
    z-index: 10;
    border-radius: 20px;
    padding: 20px;
    .title {
      font-size: 18px;
      font-weight: 500;
      margin-bottom: 14px;
    }
    .friend-info {
      display: flex;
      width: 100%;
      height: 200px;
      .left-area {
        width: 80px;
        height: 100%;
        margin-right: 20px;
        img {
          width: 100%;
          height: 80px;
          border-radius: 10px;
          overflow: hidden;
        }
      }
      .right-area {
        flex: 1;
        height: 100%;
        padding: 10px 0;
        div {
          font-size: 16px;
          margin-bottom: 10px;
        }
        .name {
          font-weight: 500;
          font-size: 18px;
          span {
            color: #307afa;
            font-size: 14px;
          }
        }
        .group {
          span {
            display: inline-block;
            width: auto;
            padding: 8px;
            background-color: #d0e1fd;
            color: #307afa;
            font-size: 16px;
            border-radius: 8px;
          }
        }
      }
    }
  }
  .map-container {
    width: 100%;
    flex: 1;
    position: relative;
    margin-top: 64px;
  }

  #map {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }

  .popup-container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1000;
  }

  :deep(.leaflet-container) {
    width: 100%;
    height: 100%;
  }
}
</style>
