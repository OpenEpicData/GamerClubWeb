<template>
  <v-app dark class="secondary">
    <v-toolbar
      fixed
      color="primary"
      dark
      extended
    >
      <v-toolbar-title>
        <v-btn 
          text 
          large 
          to="/"
          color="transparent">
          <logo style="width:150px;height:54px"/>
        </v-btn>
      </v-toolbar-title>
      <v-spacer />
      <div class="hidden-sm-and-down">
        <v-btn
          text
          outline 
          color="accent"
        >
          立即开始
        </v-btn>
      </div>

      <v-tabs
        slot="extension"
        v-model="toolbar.tab.active"
        color="secondary"
        fixed-tabs
      >
        <v-tab
          v-for="(item, i) in toolbar.tab.item"
          :key="i"
          :to="item.path"
        >
          {{ item.name }}
        </v-tab>
      </v-tabs>
    </v-toolbar>
    <v-content>
      <nuxt />
    </v-content>
    <div
      class="mt-5 pt-5 text-xs-center primary"
    >
      <loading />
      <div class="mt-3">
        <h4 class="display-1">
          立即开启你的新旅程
        </h4>
        <h6 class="subheading mt-2">
          加入需要不到一分钟,这将是你一整天中做出的最佳决定.
          <br>SteamHub 是一个非盈利的开源项目,我们也提供开发者付费计划用以支持每月的服务器建设支出.
        </h6>
      </div>
      <div class="py-5">
        <v-layout
          align-center
          justify-center
          fill-height
        >
          <div>
            <v-btn
              slot="append-outer"
               
              large
              dark
              style="top: -12px"
            >
              使用 Steam 登录
            </v-btn>
          </div>
        </v-layout>
      </div>
    </div>
  </v-app>
</template>

<script>
import logo from '~/components/logo'
import loading from '~/components/loading'

export default {
  components: {
    logo,
    loading
  },
  data() {
    return {
      toolbar: {
        tab: {
          active: this.$route.fullPath,
          item: [
            {
              name: '浏览',
              path: '/'
            },
            {
              name: '热门',
              path: '/trending/hot'
            },
            {
              name: '趋势',
              path: '/game/trending'
            }
          ]
        }
      }
    }
  }
}
</script>

<style>
.v-tabs__slider {
  border-bottom: 5px solid #fff;
  border-radius: 9999px;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

.hide-2line {
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.hide-3line {
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}

.hide-4line {
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
}

.grey-gradient {
  background: linear-gradient(90deg, #4b6cb7, #2e4469);
}
.purple-gradient {
  background: linear-gradient(180deg, #8b60ed, #b372bd);
}
.yello-gradient {
  background: linear-gradient(0deg, #f19a1a, #ffc73c);
}
.green-gradient {
  background: linear-gradient(180deg, #6edcc4, #1aab8b);
}
.blue-gradient {
  background: linear-gradient(180deg, #21c8f6, #637bff);
}
.card-blue-gradient {
  background: linear-gradient(90deg, #5fbbfe, #208bd8);
}
.red-gradient {
  background: linear-gradient(180deg, #f44881, #ec454f);
}

@media (min-width: 0) and (max-width: 600px) {
  .display-4 {
    font-size: 30px !important;
  }
  .display-2 {
    font-size: 15px !important;
  }
  .display-1 {
    font-size: 25px !important;
  }
}
@media (min-width: 600px) and (max-width: 960px) {
  .display-4 {
    font-size: 50px !important;
  }
  .display-2 {
    font-size: 25px !important;
  }
}
@media (min-width: 960px) and (max-width: 1264px) {
  .display-4 {
    font-size: 70px !important;
  }
  .display-2 {
    font-size: 35px !important;
  }
}
@media (min-width: 1264px) and (max-width: 1904px) {
  .display-4 {
    font-size: 90px !important;
  }
  .display-2 {
    font-size: 45px !important;
  }
}
</style>
