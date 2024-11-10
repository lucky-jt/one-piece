<template>
  <div class="life-page" :class="{ 'dark-theme': isDark }">
    <NavBar />

    <div class="content-wrapper">
      <div class="main-content">
        <!-- 左侧类型切换 -->
        <div class="left-tabs">
          <div
            v-for="type in types"
            :key="type.value"
            class="tab-item"
            :class="{ active: currentType === type.value }"
            @click="handleTypeChange(type.value)"
          >
            <div class="dot"></div>
            <span>{{ type.label }}</span>
          </div>
        </div>

        <!-- 中间导航列表 -->
        <div class="sidebar">
          <div class="nav-header">
            {{ currentType === "life" ? "目录" : "列表" }}
          </div>
          <div class="nav-list">
            <div
              v-for="item in previewList"
              :key="item.key"
              class="nav-item"
              :class="{ active: selectedKey === item.key }"
              @click="handlePreviewClick(item.key)"
            >
              {{ item.title }}
              <span class="item-date">{{ item.date }}</span>
            </div>
          </div>
        </div>

        <!-- 右侧内容 -->
        <div class="content">
          <div class="article-header">
            <h1>{{ currentArticle.title }}</h1>
            <div class="article-meta">
              <n-tag round type="success" size="small">{{
                currentArticle.date
              }}</n-tag>
            </div>
          </div>

          <div class="article-cover">
            <n-image
              :src="currentArticle.image"
              :alt="currentArticle.title"
              object-fit="cover"
            />
          </div>

          <div class="article-content" v-html="currentArticle.content"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import NavBar from "@/components/NavBar.vue";
import { BookOutline, PeopleOutline } from "@vicons/ionicons5";
import { useThemeStore } from "@/stores/theme";

const route = useRoute();
const router = useRouter();
const currentType = ref("life");
const selectedKey = ref(route.params.id as string);
const themeStore = useThemeStore();
const isDark = computed(() => themeStore.isDark);

// 定义类型选项
const types = [
  { label: "我的大学生活", value: "life" },
  { label: "我的朋友", value: "friend" },
];

// 1. 首先定义 previewList
const previewList = computed(() => {
  if (currentType.value === "life") {
    return [
      {
        key: "military-training",
        title: "军训时光",
        date: "2023年9月",
      },
      {
        key: "club-activity",
        title: "社团活动",
        date: "2023年10月",
      },
      {
        key: "class-party",
        title: "班级聚会",
        date: "2023年12月",
      },
    ];
  } else {
    return [
      {
        key: "xiaoming",
        title: "小明",
        date: "技术控 / 篮球达人",
      },
      // ... 其他朋友预览数据
    ];
  }
});

// 2. 然后定义处理函数
const handlePreviewClick = (key: string) => {
  selectedKey.value = key;
  router.push(`/life/${key}`);
};

const handleTypeChange = (value: string) => {
  currentType.value = value;
  // 获取当前类型的第一个项目
  const firstItem = previewList.value[0];
  if (firstItem) {
    selectedKey.value = firstItem.key;
    router.push(`/life/${firstItem.key}`);
  }
};

// 3. 最后设置 watch
watch(
  () => route.params.id,
  (newId) => {
    if (newId) {
      selectedKey.value = newId as string;
    }
  }
);

// 初始化时如果没有选中项，则选中第一项
watch(
  () => previewList.value,
  (newList) => {
    if (newList.length > 0 && !selectedKey.value) {
      selectedKey.value = newList[0].key;
      router.push(`/life/${newList[0].key}`);
    }
  },
  { immediate: true }
);

// currentArticle 的定义...
const currentArticle = computed(() => {
  // 文章数据
  const articles = {
    "military-training": {
      title: "军训时光",
      date: "2023年9月",
      image: "https://via.placeholder.com/800x400/18a058/FFFFFF?text=军训时光",
      content: `
        <h2>难忘的军训岁月</h2>
        <p>在炎炎夏日中，我们经历了为期两周的军训。虽然辛苦，但这段经历让我们收获了许多。</p>
        <ul>
          <li>学会了基本的军姿和队列动作</li>
          <li>培养了坚韧的意志品质</li>
          <li>与同学们建立了深厚的友谊</li>
        </ul>
        <h2>精彩的军训生活</h2>
        <p>除了日常训练，我们还组织了丰富的文艺活动，让军训生活更加多彩。</p>
      `,
    },
    "club-activity": {
      title: "社团活动",
      date: "2023年10月",
      image: "https://via.placeholder.com/800x400/2080f0/FFFFFF?text=社团活动",
      content: `
        <h2>丰富的社团生活</h2>
        <p>加入社团后，我认识了许多志同道合的朋友，一起参与了各种有意义的活动。</p>
        <ul>
          <li>举办了校园文化节</li>
          <li>参与了志愿服务活动</li>
          <li>组织了读书分享会</li>
        </ul>
      `,
    },
    "class-party": {
      title: "班级聚会",
      date: "2023年12月",
      image: "https://via.placeholder.com/800x400/f0a020/FFFFFF?text=班级聚会",
      content: `
        <h2>温馨的班级聚会</h2>
        <p>在期末考试结束后，我们班级组织了一次温馨的聚会，大家一起分享了学习和生活中的点点滴滴。</p>
        <ul>
          <li>分享学习经验</li>
          <li>游戏互动环节</li>
          <li>美食分享时间</li>
        </ul>
      `,
    },
    xiaoming: {
      title: "小明",
      date: "技术控 / 篮球达人",
      image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6",
      content: `
        <h2>关于小明</h2>
        <p>小明是我的室友，也是计算机系的学霸。他不仅技术过硬，还是个篮球高手。</p>
        <ul>
          <li>多次获得编程比赛奖项</li>
          <li>校篮球队主力队员</li>
          <li>乐于助人的好朋友</li>
        </ul>
      `,
    },
  };

  return (
    articles[selectedKey.value] || {
      title: "内容不存在",
      date: "",
      image: "https://via.placeholder.com/800x400/cccccc/FFFFFF?text=Not+Found",
      content: "<p>抱歉，未找到相关内容。</p>",
    }
  );
});
</script>

<style lang="less" scoped>
.life-page {
  min-height: 100vh;
  background: var(--background-color);
  transition: all 0.3s ease;

  .content-wrapper {
    max-width: 1400px;
    margin: 0 auto;
    padding: 80px 0 40px;
    position: relative;
  }

  .main-content {
    display: flex;
    gap: 40px;
    padding: 0 20px;
    margin-left: 140px;
    min-height: 600px;
  }

  // 左侧类型切换
  .left-tabs {
    width: 140px;
    padding: 12px 0;
    position: fixed;
    left: max(20px, calc((100% - 1400px) / 2 + 20px));
    top: 80px;

    .tab-item {
      padding: 12px 24px;
      cursor: pointer;
      color: var(--text-color-secondary);
      font-size: 14px;
      display: flex;
      align-items: center;
      gap: 12px;
      transition: all 0.3s ease;
      position: relative;

      .dot {
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: var(--border-color);
        transition: all 0.3s ease;
      }

      span {
        transition: transform 0.3s ease;
      }

      &:hover {
        color: var(--primary-color);

        .dot {
          background: var(--primary-color);
        }

        span {
          transform: translateX(4px);
        }
      }

      &.active {
        color: var(--primary-color);
        font-weight: 500;

        .dot {
          background: var(--primary-color);
          transform: scale(1.2);
        }

        span {
          transform: translateX(4px);
        }
      }
    }
  }

  // 中间导航列表
  .sidebar {
    width: 240px;
    background: var(--card-background);
    border-radius: 12px;
    box-shadow: var(--box-shadow);
    padding: 16px 0;
    height: fit-content;

    .nav-header {
      padding: 0 20px 12px;
      color: var(--text-color-secondary);
      font-size: 13px;
      text-transform: uppercase;
      letter-spacing: 1px;
      border-bottom: 1px solid var(--border-color);
      margin-bottom: 8px;
    }

    .nav-list {
      .nav-item {
        padding: 12px 20px;
        cursor: pointer;
        color: var(--text-color);
        font-size: 14px;
        transition: all 0.3s ease;
        position: relative;

        .item-date {
          font-size: 12px;
          color: var(--text-color-secondary);
          margin-top: 4px;
          display: block;
        }

        &:hover {
          color: var(--primary-color);
          background: var(--secondary-background);
        }

        &.active {
          color: var(--primary-color);
          background: var(--secondary-background);
          font-weight: 500;

          .item-date {
            color: var(--primary-color);
          }
        }
      }
    }
  }

  // 右侧内容区
  .content {
    flex: 1;
    max-width: 820px;
    background: var(--card-background);
    border-radius: 12px;
    box-shadow: var(--box-shadow);
    overflow: hidden;
    position: relative;

    .article-header {
      padding: 32px 40px;
      margin-bottom: 0;
      position: relative;
      z-index: 1;

      h1 {
        font-size: 26px;
        color: var(--text-color);
        margin-bottom: 12px;
        font-weight: 600;
      }
    }

    .article-cover {
      width: calc(100% + 40px);
      margin-left: 0;
      position: relative;

      &::after {
        content: "";
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 100px;
        background: linear-gradient(
          to bottom,
          transparent,
          var(--card-background)
        );
        pointer-events: none;
      }

      :deep(img) {
        width: 100%;
        height: 380px;
        object-fit: cover;
        display: block;
      }
    }

    .article-container {
      padding: 32px 40px 40px;
      position: relative;
      margin-top: -60px;
      background: var(--card-background);
      border-radius: 20px 20px 0 0;
    }

    .article-content {
      padding: 0 40px 40px;
      color: var(--text-color);
      line-height: 1.8;

      :deep(h2) {
        font-size: 20px;
        color: var(--text-color);
        margin: 32px 0 16px;
        font-weight: 600;
      }

      :deep(p) {
        margin-bottom: 16px;
        font-size: 15px;
        line-height: 1.8;
      }

      :deep(ul) {
        padding-left: 20px;
        margin: 16px 0;

        li {
          margin-bottom: 8px;
          font-size: 15px;
        }
      }
    }
  }
}

// 深色主题特定样式
.dark-theme {
  .sidebar {
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  }

  .content {
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  }

  .nav-item {
    &:hover {
      background: var(--secondary-background) !important;
    }

    &.active {
      background: rgba(24, 160, 88, 0.1) !important;
    }
  }
}

// 响应式设计
@media (max-width: 1200px) {
  .life-page {
    .main-content {
      flex-direction: column;
      gap: 16px;
      margin-left: 120px;
    }

    .left-tabs {
      left: 20px;
    }
  }
}

@media (max-width: 768px) {
  .life-page {
    .content-wrapper {
      padding: 60px 0 20px;
    }

    .main-content {
      flex-direction: column;
      gap: 16px;
      margin-left: 0;
    }

    .left-tabs {
      width: 100%;
      position: static;
      padding: 0 20px;
      display: flex;
      justify-content: flex-start;
      overflow-x: auto;

      .tab-item {
        padding: 8px 16px;
        flex-shrink: 0;

        .dot {
          display: none;
        }

        span {
          transform: none !important;
        }

        &.active {
          color: #18a058;
          background: #e8f5e9;
          border-radius: 4px;
        }
      }
    }

    .content {
      .article-header {
        padding: 24px;
      }

      .article-cover {
        width: calc(100% + 24px);
        margin-left: 0;
      }

      .article-content {
        padding: 0 20px 20px;
      }

      .article-container {
        padding: 24px;
      }
    }
  }
}
</style>
