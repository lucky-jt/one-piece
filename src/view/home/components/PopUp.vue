<template>
  <div class="pop-up">
    <div class="left-area">
      <div
        class="name"
        :class="{ 'name-active': index === friendIndex }"
        v-for="(item, index) in friendsData"
        :key="index"
      >
        {{ item?.name }}
      </div>
    </div>
    <div class="right-area">
      <div class="left">
        <div class="name">
          {{ friendsInfo?.name }}
          <span>{{ `(${friendsInfo?.profession})` }}</span>
        </div>
        <div class="group">
          <span>{{ friendsInfo?.groupBy }}</span>
        </div>
        <div class="hobby">
          爱好：<span>{{ friendsInfo?.hobby }}</span>
        </div>
        <div class="address">
          地址：<span>{{ friendsInfo?.address }}</span>
        </div>
      </div>
      <div class="right">
        <img :src="friendsInfo?.pic" alt="" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onBeforeUnmount } from "vue";

const props = defineProps({
  friendList: Array,
});

const emit = defineEmits(["getNewDataFn", "setOutsideFriendInfoFn"]);
const friendsData = ref([]);
const friendsInfo = ref({});
let friendIndex = 0;
let timer = null;

// 清除定时器的工具函数
const clearTimer = () => {
  if (timer) {
    clearTimeout(timer);
    timer = null;
  }
};

// 处理数据展示的函数
const handleDataDisplay = (data) => {
  // 将数据分组，每组最多7条
  const firstGroup = data.slice(0, 7);
  const remainingData = data.slice(7);

  friendsData.value = firstGroup;
  friendIndex = 0;
  friendsInfo.value = firstGroup[friendIndex];
  emit("setOutsideFriendInfoFn", friendsInfo.value);

  setFriendsInfoFn(firstGroup, remainingData);
};

function setFriendsInfoFn(currentGroup, remainingData = []) {
  clearTimer();

  timer = setTimeout(() => {
    if (friendIndex < currentGroup.length - 1) {
      friendIndex++;
      friendsInfo.value = currentGroup[friendIndex];
      emit("setOutsideFriendInfoFn", friendsInfo.value);
      setFriendsInfoFn(currentGroup, remainingData);
    } else {
      // 当前组播放完毕
      if (remainingData.length > 0) {
        // 还有剩余数据，继续播放
        friendIndex = 0;
        friendsData.value = remainingData.slice(0, 7); // 确保剩余数据也是7条一组
        friendsInfo.value = friendsData.value[friendIndex];
        emit("setOutsideFriendInfoFn", friendsInfo.value);
        setFriendsInfoFn(friendsData.value, remainingData.slice(7));
      } else {
        // 没有剩余数据，请求新数据
        friendIndex = 0;
        emit("getNewDataFn");
      }
    }
  }, 5000);
}

watch(
  () => props.friendList,
  (newValue) => {
    if (!newValue || newValue.length === 0) return;
    handleDataDisplay(newValue);
  },
  {
    deep: true,
    immediate: true,
  }
);

// 组件销毁前清除定时器
onBeforeUnmount(() => {
  clearTimer();
});
</script>

<style lang="less" scoped>
.pop-up {
  display: flex;
  width: 420px;
  height: 300px;
  padding: 20px;
  border-radius: 8px;
  box-shadow: var(--box-shadow);
  background-color: var(--card-background);
  transition: all 0.3s ease;
  // background-image: linear-gradient(
  //   to bottom,
  //   #e5f1fe 0%,
  //   #ecf5fe 0.5%,
  //   #ffffff 100%
  // );
  .left-area {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 80px;
    border-right: 1px solid var(--border-color);
    .name {
      font-size: 18px;
      margin-bottom: 6px;
      cursor: pointer;
      width: 100%;
      padding: 2px;
      border-radius: 8px;
      margin-right: 4px;
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 1; /* 控制显示的行数 */
      -webkit-box-orient: vertical;
      text-overflow: ellipsis;
      white-space: normal;
      text-align: center;
      &:hover {
        color: #307afa;
        background-color: #d0e1fd;
      }
    }
    .name-active {
      color: #307afa;
      background-color: #d0e1fd;
    }
  }
  .right-area {
    flex: 1;
    display: flex;
    padding: 0 20px;

    .left {
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
    .right {
      width: 80px;
      height: 100%;
      margin-left: 20px;
      img {
        width: 100%;
        height: 80px;
        border-radius: 10px;
        overflow: hidden;
      }
    }
  }

  @media (max-width: 768px) {
    width: 90vw;
    max-width: 420px;
    height: auto;
    min-height: 200px;
    padding: 15px;
    margin: 0 15px;

    .left-area {
      width: 60px;

      .name {
        font-size: 14px;
        margin-bottom: 4px;
        padding: 4px 2px;
      }
    }

    .right-area {
      padding: 0 10px;

      .left {
        padding: 5px 0;

        div {
          font-size: 14px;
          margin-bottom: 8px;
        }

        .name {
          font-size: 16px;

          span {
            font-size: 12px;
          }
        }

        .group {
          span {
            padding: 4px 8px;
            font-size: 14px;
          }
        }
      }

      .right {
        width: 60px;
        margin-left: 10px;

        img {
          height: 60px;
        }
      }
    }
  }

  @media (max-width: 480px) {
    width: calc(100vw - 30px);
    padding: 12px;

    .left-area {
      width: 50px;

      .name {
        font-size: 12px;
      }
    }

    .right-area {
      .left {
        div {
          font-size: 12px;
          margin-bottom: 6px;
        }

        .name {
          font-size: 14px;
        }

        .group span {
          font-size: 12px;
          padding: 3px 6px;
        }
      }

      .right {
        width: 50px;

        img {
          height: 50px;
        }
      }
    }
  }
}
</style>
