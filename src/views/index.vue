<!-- name -->
<template>
  <div style="background-color: #ececec; min-width: 1600px">
    <header>
      <!-- <headerTop></headerTop> -->
      <Carousel></Carousel>
    </header>
    <article style="" class="pt-8 bg-white">
      <div class="flex justify-center">
        <div class="text-2xl flex items-center" style="margin-right: 35px">
          <span style="color: #ccaa46">
            <span class="iconfont icon-kecheng"></span>
            在线精品课程</span
          >
          <em class="px-4">
            <img
              src="	https://www.szpt.edu.cn/images/tab_icon_fg.png"
              alt=""
              srcset=""
            />
          </em>
          <span class="italic" style="color: #999999; font-size: 14px"
            >online</span
          >
        </div>
        <div class="text-2xl flex items-center" style="margin-right: 35px">
          <span>
            <span class="iconfont icon-ziyuan1"></span>
            财经类专业省级资源库</span
          ><em class="px-4">
            <img
              src="	https://www.szpt.edu.cn/images/tab_icon_fg.png"
              alt=""
              srcset=""
            />
          </em>
          <span class="italic" style="color: #999999; font-size: 14px"
            >resources</span
          >
        </div>
        <div class="text-2xl flex items-center">
          <span>
            <span class="iconfont icon-icon-mianxing_fuzhi_kuozhan"></span>
            尔雅通识拓展课</span
          >
          <em class="px-4">
            <img
              src="	https://www.szpt.edu.cn/images/tab_icon_fg.png"
              alt=""
              srcset=""
            />
          </em>
          <span class="italic" style="color: #999999; font-size: 14px"
            >expand</span
          >
        </div>
        <!-- <div class="text-2xl">高职财经课程思政</div> -->
      </div>
      <div class="w-full flex justify-center mt-6">
        <div style="height: 500px; width: 1440px">
          <div class="flex justify-between" style="height: 300px">
            <div class="border-black flex" style="width: 48%; height: 300px">
              <img
                src="https://www.gench.edu.cn/_upload/article/e8/4d/0195b8f3403aac675f0b3e760342/78524894-0177-46fe-9dd4-062d5300f742.jpg"
                alt=""
                style="width: 65%; object-fit: cover"
                class="h-full"
              />
              <div
                class="h-full p-6 text-white"
                style="width: 35%; background-color: #88c0ee"
              >
                <p class="text-base">参展项目涉及集成电路设计、集成电路封装</p>
                <p
                  class="text-sm mt-6"
                  style="
                    text-align: justify;
                    text-justify: inter-ideograph;
                    text-indent: 2em;
                  "
                >
                  参展项目涉及集成电路设计、集成电路封装光刻胶关键材料、新能源、智能制造、医疗大健康等领域。11月15日至19日...
                </p>
                <p class="text-right text-xs">
                  MORE
                  <span
                    class="iconfont icon-caret-right"
                    style="font-size: 12px"
                  ></span>
                </p>
              </div>
            </div>
            <div class="h-full" style="width: 24%; height: 300px">
              <img
                src="https://www.gench.edu.cn/_upload/article/e8/4d/0195b8f3403aac675f0b3e760342/78524894-0177-46fe-9dd4-062d5300f742.jpg"
                alt=""
                style="object-fit: cover; height: 70%"
                class="w-full"
              />
              <div
                class="w-full text-base p-6 text-white"
                style="
                  background-color: #b4b3f6;
                  height: 30%;
                  text-align: justify;
                  text-justify: inter-ideograph;
                  text-indent: 2em;
                "
              >
                参展项目涉及集成电路设计、集成电路封装、集成电路封装。
              </div>
            </div>
            <div class="h-full" style="width: 24%; height: 300px">
              <img
                src="https://www.gench.edu.cn/_upload/article/e8/4d/0195b8f3403aac675f0b3e760342/78524894-0177-46fe-9dd4-062d5300f742.jpg"
                alt=""
                style="object-fit: cover; height: 70%"
                class="w-full"
              />
              <div
                class="w-full text-base p-6 text-white"
                style="
                  background-color: #e4bf72;
                  height: 30%;
                  text-align: justify;
                  text-justify: inter-ideograph;
                  text-indent: 2em;
                "
              >
                参展项目涉及集成电路设计、集成电路封装、集成电路封装。
              </div>
            </div>
          </div>
          <div class="mt-4 flex justify-between" style="height: 150px">
            <img
              v-for="item in 5"
              src="https://www.gench.edu.cn/_upload/article/e8/4d/0195b8f3403aac675f0b3e760342/78524894-0177-46fe-9dd4-062d5300f742.jpg"
              alt=""
              class="h-full"
              style="width: 19%; object-fit: cover"
            />
          </div>
        </div>
      </div>

      <div class="w-full flex justify-center mt-4 pb-6">
        <div style="height: 270px; width: 1440px" class="flex justify-between">
          <div class="h-full flex justify-between" style="width: 28%">
            <div class="flex flex-col" style="width: 3.5rem">
              <div
                class="iconfont icon-radioBox w-full"
                style="color: #ccaa46"
              ></div>
              <div class="text-2xl px-3 py-3" style="writing-mode: vertical-lr">
                考试中心
              </div>
              <div
                class="iconfont icon-radioBox w-full text-right mt-1"
                style="color: #ccaa46"
              ></div>
            </div>

            <div
              style="width: calc(100% - 5rem); border-color: #ccaa46"
              class="border-dotted border-2 border-black h-full p-4 border-opacity-50"
            >
              <ul style="line-height: 35px">
                <li
                  title="关于做好2023年同等学力人员申请硕士学位外国语水平和学科综合水平全国统一考试工作的通知"
                  v-for="item in 7"
                  class="truncate"
                >
                  关于做好2023年同等学力人员申请硕士学位外国语水平和学科综合水平全国统一考试工作的通知
                </li>
              </ul>
            </div>
          </div>

          <div class="h-full flex justify-between" style="width: 28%">
            <div class="flex flex-col" style="width: 3.5rem">
              <div
                class="iconfont icon-radioBox w-full"
                style="color: #ccaa46"
              ></div>
              <div class="text-2xl px-3 py-3" style="writing-mode: vertical-lr">
                培训考证
              </div>
              <div
                class="iconfont icon-radioBox w-full text-right mt-1"
                style="color: #ccaa46"
              ></div>
            </div>

            <div
              style="width: calc(100% - 5rem); border-color: #ccaa46"
              class="border-dotted border-2 border-black h-full p-4 border-opacity-50"
            >
              <ul style="line-height: 35px">
                <li
                  title="关于做好2023年同等学力人员申请硕士学位外国语水平和学科综合水平全国统一考试工作的通知"
                  v-for="item in 7"
                  class="truncate"
                >
                  关于做好2023年同等学力人员申请硕士学位外国语水平和学科综合水平全国统一考试工作的通知
                </li>
              </ul>
            </div>
          </div>

          <div
            class="h-full flex justify-between"
            style="width: 38%; border: 1px solid #ccaa46"
          >
            <img
              src="https://www.gench.edu.cn/_upload/article/e8/4d/0195b8f3403aac675f0b3e760342/78524894-0177-46fe-9dd4-062d5300f742.jpg"
              alt=""
              style="width: 50%; object-fit: cover"
              class="h-full"
            />
            <div class="p-4 px-6" style="width: 50%">
              <p class="text-center text-2xl pb-4">高职财经课程思政</p>
              <ul style="line-height: 35px">
                <li
                  title="关于做好2023年同等学力人员申请硕士学位外国语水平和学科综合水平全国统一考试工作的通知"
                  v-for="item in 5"
                  class="truncate"
                >
                  关于做好2023年同等学力人员申请硕士学位外国语水平和学科综合水平全国统一考试工作的通知
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </article>
    <footer>
      <Footer></Footer>
    </footer>
    <!-- <el-button type="success" @click="login">登录</el-button> -->
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, toRefs } from "vue";
import { useRouter } from "vue-router";
import headerTop from "@/components/inedx/header/top.vue";
import Carousel from "@/components/inedx/header/carousel.vue";
import Event from "@/components/inedx/article/event.vue";
import Event2 from "@/components/inedx/article/event2.vue";
import Notice from "@/components/inedx/article/notice.vue";
import Information from "@/components/inedx/article/information.vue";
import Video from "@/components/inedx/article/video.vue";
import Photo from "@/components/inedx/article/photo.vue";
import Important from "@/components/inedx/article/important.vue";
import Footer from "@/components/inedx/footer/index.vue";

const router = useRouter();

const login = () => {
  router.push("/login");
};
</script>

<style scoped lang="less">
li {
  position: relative;
  padding-left: 12px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
li:after {
  position: absolute;
  display: block;
  content: "";
  width: 5px;
  height: 5px;
  background: linear-gradient(-55deg, #ff7b7f, #ffbc46);
  border-radius: 50%;
  top: 15px;
  left: 0;
}
</style>
