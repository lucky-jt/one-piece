<template>
  <div class="index-page">
    <NavBar />

    <!-- 轮播图部分 -->
    <div class="carousel-wrapper">
      <n-carousel
        autoplay
        show-arrow
        dot-type="line"
        effect="fade"
        :interval="5000"
        :style="{ height: carouselHeight + 'px' }"
      >
        <n-carousel-item v-for="(item, index) in carouselImages" :key="index">
          <img :src="item.url" :alt="item.title" class="carousel-img" />
          <div class="carousel-caption">
            <h2>{{ item.title }}</h2>
            <p>{{ item.description }}</p>
          </div>
        </n-carousel-item>
      </n-carousel>
    </div>

    <!-- 大学生活部分 -->
    <div class="life-section">
      <n-h1>我的大学生活</n-h1>

      <div class="moments">
        <n-card
          v-for="(moment, index) in lifeHighlights"
          :key="index"
          class="moment-card"
          :bordered="false"
          hoverable
          @click="handleCardClick(moment.id)"
        >
          <template #cover>
            <img :src="moment.image" :alt="moment.title" />
          </template>
          <n-h3>{{ moment.title }}</n-h3>
          <n-p>{{ moment.description }}</n-p>
          <n-tag :bordered="false" type="primary">{{ moment.date }}</n-tag>
        </n-card>
      </div>
    </div>

    <!-- 朋友介绍部分 -->
    <div class="friends-section">
      <n-h1>我的朋友们</n-h1>
      <div class="friends-grid">
        <n-card
          v-for="(friend, index) in friends"
          :key="index"
          class="friend-card"
          :bordered="false"
          hoverable
          @click="handleCardClick(friend.id, 'friend')"
        >
          <template #cover>
            <img
              :src="friend.avatar"
              :alt="friend.name"
              class="friend-avatar"
            />
          </template>
          <n-h3>{{ friend.name }}</n-h3>
          <n-p>{{ friend.description }}</n-p>
          <n-space>
            <n-tag v-for="tag in friend.tags" :key="tag">{{ tag }}</n-tag>
          </n-space>
        </n-card>
      </div>
    </div>

    <!-- 关于部分 -->
    <div class="about-section">
      <div class="about-container">
        <div class="about-cards">
          <div class="about-card">
            <div class="card-icon">
              <n-icon size="36">
                <BookOutline />
              </n-icon>
            </div>
            <h3>记录生活</h3>
            <p>在这里记录每一个精彩瞬间，留下最美好的回忆</p>
          </div>

          <div class="about-card">
            <div class="card-icon">
              <n-icon size="36">
                <PeopleOutline />
              </n-icon>
            </div>
            <h3>分享友情</h3>
            <p>与朋友们分享快乐，共同创造难忘的大学时光</p>
          </div>

          <div class="about-card">
            <div class="card-icon">
              <n-icon size="36">
                <HeartOutline />
              </n-icon>
            </div>
            <h3>珍藏故事</h3>
            <p>每一个故事都独一无二，值得被永远珍藏</p>
          </div>
        </div>

        <div class="about-text-section">
          <n-h2>关于这个网站</n-h2>
          <p>这是一个充满回忆与故事的空间，记录着我们在大学期间的点点滴滴。</p>
          <n-button type="primary" size="large">了解更多</n-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router";
import NavBar from "@/components/NavBar.vue";
import { ref, onMounted, onUnmounted } from "vue";
import swiper1 from "@/assets/images/Index/swiper1.jpg";
import swiper2 from "@/assets/images/Index/swiper2.jpg";
import swiper3 from "@/assets/images/Index/swiper3.jpg";
import pic1 from "@/assets/images/Index/pic1.jpg";
import pic2 from "@/assets/images/Index/pic2.jpg";
import pic3 from "@/assets/images/Index/pic3.jpg";
import { BookOutline, PeopleOutline, HeartOutline } from "@vicons/ionicons5";

interface CarouselImage {
  url: string;
  title: string;
  description: string;
}

interface LifeHighlight {
  id: string;
  image: string;
  title: string;
  description: string;
  date: string;
}

interface Friend {
  id: string;
  avatar: string;
  name: string;
  description: string;
  tags: string[];
}

const router = useRouter();
const carouselHeight = ref(500);

const updateCarouselHeight = () => {
  carouselHeight.value = window.innerWidth <= 768 ? 200 : 500;
};

onMounted(() => {
  updateCarouselHeight();
  window.addEventListener("resize", updateCarouselHeight);
});

onUnmounted(() => {
  window.removeEventListener("resize", updateCarouselHeight);
});

const carouselImages: CarouselImage[] = [
  {
    url: swiper1,
    title: "美丽的校园",
    description: "这是我们生活和学习的地方",
  },
  {
    // 学生活动图片
    url: swiper2,
    title: "精彩的活动",
    description: "记录我们共同参与的难忘时刻",
  },
  {
    // 朋友合影
    url: swiper3,
    title: "珍贵的友情",
    description: "与朋友们一起创造的好回忆",
  },
  // ... 其他轮播图数据
];

const lifeHighlights: LifeHighlight[] = [
  {
    id: "military-training",
    image: pic1,
    title: "工作室508&112",
    description: "挥洒汗水的日子，留下了最初的回忆",
    date: "2023年9月",
  },
  {
    // 社团活动场景
    id: "club-activity", // 添加 id
    image: pic2,
    title: "毕业季",
    description: "在社团中结识志同道合的朋友",
    date: "2023年10月",
  },
  {
    // 聚会场景
    id: "class-party",
    image: pic3,
    title: "吃喝玩乐",
    description: "与同学们其乐融融的欢聚时光",
    date: "2023年12月",
  },
  // ... 其他生活亮点数据
];

const friends: Friend[] = [
  {
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6",
    name: "小明",
    description: "我的室友，计算机系的大神",
    tags: ["技术控", "篮球达人"],
    id: "xiaoming",
  },
  {
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    name: "小红",
    description: "文学社社长，写得一手���文章",
    tags: ["文艺青年", "摄影爱好者"],
    id: "2",
  },
  {
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
    name: "小华",
    description: "学生会主席，活动组织能手",
    tags: ["领导才能", "运动健将"],
    id: "3",
  },
];

const handleCardClick = (id: string, type: string = "life"): void => {
  router.push(`/life/${id}`);
};
</script>

<style scoped>
.index-page {
  min-height: 100vh;
  background-color: var(--background-color);
  color: var(--text-color);
  padding-top: 64px;
}

/* 轮播图样式 */
.carousel-wrapper {
  width: 100%;
  background-color: var(--secondary-background);
  margin-top: 0;
}

.carousel-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.carousel-caption {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 20px;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.7));
  color: white;
  text-align: center;
}

.carousel-caption h2 {
  font-size: 24px;
  margin-bottom: 8px;
  color: white;
}

.carousel-caption p {
  font-size: 16px;
  margin: 0;
  color: rgba(255, 255, 255, 0.9);
}

/* 修改轮播图指示器样式 */
:deep(.n-carousel .n-carousel__dots) {
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
}

:deep(.n-carousel .n-carousel__dot) {
  background-color: rgba(255, 255, 255, 0.5);
}

:deep(.n-carousel .n-carousel__dot--active) {
  background-color: white;
}

/* 修改轮播图箭头样式 */
:deep(.n-carousel .n-carousel__arrow) {
  background-color: rgba(0, 0, 0, 0.3);
  color: white;
  font-size: 24px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

:deep(.n-carousel .n-carousel__arrow:hover) {
  background-color: rgba(0, 0, 0, 0.5);
}

/* 生活部分样式 */
.life-section,
.friends-section {
  padding: 40px 80px;
  background-color: var(--background-color);
}

.moments {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  margin-top: 24px;
}

.moment-card {
  transition: transform 0.3s;
  cursor: pointer;
}

.moment-card:hover {
  transform: translateY(-5px);
}

.moment-card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 4px;
}

/* 朋友部分样式 */
.friends-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  margin-top: 24px;
}

.friend-card {
  transition: transform 0.3s;
  cursor: pointer;
}

.friend-card:hover {
  transform: translateY(-5px);
}

.friend-avatar {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 4px;
}

/* 关于部分样式 */
.about-section {
  padding: 80px 0;
  background-color: #f8f9fa;
}

.about-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.about-cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  margin-bottom: 60px;
}

.about-card {
  background: white;
  padding: 40px 30px;
  border-radius: 16px;
  text-align: center;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

.about-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.card-icon {
  width: 80px;
  height: 80px;
  margin: 0 auto 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--primary-color);
  border-radius: 50%;
  color: white;
}

.about-card h3 {
  font-size: 1.5em;
  margin-bottom: 15px;
  color: var(--text-color);
}

.about-card p {
  color: var(--text-color-secondary);
  line-height: 1.6;
}

.about-text-section {
  text-align: center;
  max-width: 700px;
  margin: 0 auto;
  padding-top: 40px;
}

.about-text-section h2 {
  font-size: 2.5em;
  margin-bottom: 20px;
  color: var(--text-color);
}

.about-text-section p {
  font-size: 1.1em;
  color: var(--text-color-secondary);
  margin-bottom: 30px;
  line-height: 1.8;
}

.about-text-section .n-button {
  padding: 0 40px;
  height: 44px;
  font-size: 1.1em;
  border-radius: 22px;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .about-cards {
    grid-template-columns: 1fr;
  }

  .about-section {
    padding: 40px 0;
  }

  .about-card {
    padding: 30px 20px;
  }

  .about-text-section h2 {
    font-size: 2em;
  }
}

/* Naive UI 组件样式覆盖 */
:deep(.n-card) {
  background-color: var(--card-background);
  color: var(--text-color);
  border: 1px solid var(--border-color);
  transition: all 0.3s;
}

:deep(.n-card:hover) {
  box-shadow: var(--box-shadow);
}

:deep(.n-h1),
:deep(.n-h2),
:deep(.n-h3) {
  color: var(--text-color);
}

:deep(.n-p) {
  color: var(--text-color-secondary);
}

:deep(.n-tag) {
  background-color: var(--primary-color);
  color: white;
}

/* 添加主题变量 */
:root {
  /* 浅色主题 */
  --about-bg: #f8f9fa;
  --card-bg: #ffffff;
  --text-primary: #333333;
  --text-secondary: #666666;
  --card-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  --card-hover-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

:root[theme-mode="dark"] {
  /* 深色主题 */
  --about-bg: #1a1a1a;
  --card-bg: #2a2a2a;
  --text-primary: #ffffff;
  --text-secondary: #b3b3b3;
  --card-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  --card-hover-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
}

.about-section {
  padding: 80px 0;
  background-color: var(--about-bg);
  transition: background-color 0.3s ease;
}

.about-card {
  background: var(--card-bg);
  padding: 40px 30px;
  border-radius: 16px;
  text-align: center;
  transition: all 0.3s ease;
  box-shadow: var(--card-shadow);
}

.about-card:hover {
  transform: translateY(-10px);
  box-shadow: var(--card-hover-shadow);
}

.card-icon {
  width: 80px;
  height: 80px;
  margin: 0 auto 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--primary-color);
  border-radius: 50%;
  color: white;
  transition: background-color 0.3s ease;
}

.about-card h3 {
  font-size: 1.5em;
  margin-bottom: 15px;
  color: var(--text-primary);
  transition: color 0.3s ease;
}

.about-card p {
  color: var(--text-secondary);
  line-height: 1.6;
  transition: color 0.3s ease;
}

.about-text-section h2 {
  font-size: 2.5em;
  margin-bottom: 20px;
  color: var(--text-primary);
  transition: color 0.3s ease;
}

.about-text-section p {
  font-size: 1.1em;
  color: var(--text-secondary);
  margin-bottom: 30px;
  line-height: 1.8;
  transition: color 0.3s ease;
}

/* 添加卡片边框效果（在深色模式下更明显） */
:root[theme-mode="dark"] .about-card {
  border: 1px solid rgba(255, 255, 255, 0.1);
}

/* 深色模式下的图标背景颜色可以稍微调暗一些 */
:root[theme-mode="dark"] .card-icon {
  background: var(--primary-color);
  opacity: 0.9;
}

/* 深色模式下的悬浮效果 */
:root[theme-mode="dark"] .about-card:hover {
  background: #333333;
  border-color: rgba(255, 255, 255, 0.2);
}

/* 添加过渡动画 */
.about-section *,
.about-card *,
.about-text-section * {
  transition: all 0.3s ease;
}

/* 响应式设计 */
@media (max-width: 768px) {
  /* 调整内容区域padding */
  .life-section,
  .friends-section {
    padding: 20px;
  }

  /* 轮播图高度调整 */
  .carousel-img {
    height: 300px;
  }

  .carousel-caption h2 {
    font-size: 20px;
  }

  .carousel-caption p {
    font-size: 14px;
  }

  /* 生活部分卡片布局 */
  .moments {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  /* 朋友部分卡片布局 */
  .friends-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  /* 关于部分调整 */
  .about-cards {
    grid-template-columns: 1fr;
    gap: 20px;
    margin-bottom: 30px;
  }

  .about-section {
    padding: 40px 20px;
  }

  .about-card {
    padding: 30px 20px;
  }

  .about-text-section {
    padding-top: 20px;
  }

  .about-text-section h2 {
    font-size: 24px;
  }

  .about-text-section p {
    font-size: 16px;
    margin-bottom: 20px;
  }

  /* 调整按钮大小 */
  .about-text-section .n-button {
    padding: 0 30px;
    height: 40px;
    font-size: 16px;
  }

  /* 卡片图片高度调整 */
  .moment-card img,
  .friend-avatar {
    height: 180px;
  }
}

/* 添加平板尺寸的响应式布局 */
@media (min-width: 769px) and (max-width: 1024px) {
  .life-section,
  .friends-section {
    padding: 30px;
  }

  .moments {
    grid-template-columns: repeat(2, 1fr);
  }

  .friends-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .about-cards {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* 小型手机屏幕的额外调整 */
@media (max-width: 375px) {
  .carousel-img {
    height: 250px;
  }

  .carousel-caption h2 {
    font-size: 18px;
  }

  .carousel-caption p {
    font-size: 12px;
  }

  .moment-card img,
  .friend-avatar {
    height: 160px;
  }
}

/* 响应式设计 */
@media (max-width: 768px) {
  /* 轮播图高度调整 */
  .carousel-wrapper {
    margin-bottom: 20px;
  }

  .carousel-caption {
    padding: 10px;
  }

  .carousel-caption h2 {
    font-size: 18px;
    margin-bottom: 4px;
  }

  .carousel-caption p {
    font-size: 12px;
  }
}
</style>
