<template>
  <v-app>
    <v-toolbar
      flat
      absolute
      color="transparent"
      dark
    >
      <v-toolbar-title>
        <v-btn
          flat
          round
          to="/"
        >
          SteamHub
        </v-btn>
      </v-toolbar-title>
      <v-spacer />
      <div class="hidden-sm-and-down">
        <v-btn flat>注册</v-btn>
        <v-btn
          flat
          outline
          round
        >立即开始</v-btn>
      </div>
    </v-toolbar>
    <v-content>
      <nuxt />
    </v-content>
    <div
      class="white--text mt-5 pt-5 text-xs-center"
      style="background: radial-gradient(circle at 1% 1%,#328bf2,#1644ad)"
    >
      <div class="mt-3">
        <h4 class="display-1">
          立即开启你的新旅程
        </h4>
        <h6 class="subheading mt-2">
          加入需要不到一分钟,这将是你一整天中做出的最佳决定.<br>
          SteamHub 是一个非盈利的开源项目,我们也提供开发者付费计划用以支持每月的服务器建设支出.
        </h6>
      </div>
      <div class="py-5">
        <v-layout
          align-center
          justify-center
          fill-height
        >
          <div>
            <v-text-field
              label="您的邮件地址"
              append-icon="email"
              type="email"
              solo
              color="white"
              background-color="transparent"
              dark
            >
              <v-btn
                slot="append-outer"
                round
                style="top: -12px"
              >或使用 Steam 登录</v-btn>
            </v-text-field>
          </div>
        </v-layout>
      </div>
    </div>
  </v-app>
</template>

<style>
.grey-gradient {
  background: linear-gradient(90deg,#4b6cb7,#2e4469);
}
.purple-gradient {
  background: linear-gradient(180deg,#8b60ed,#b372bd);
}
.yello-gradient {
  background: linear-gradient(0deg,#f19a1a,#ffc73c);
}
.green-gradient {
  background: linear-gradient(180deg,#6edcc4,#1aab8b);
}
.blue-gradient {
  background: linear-gradient(180deg,#21c8f6,#637bff);
}
.red-gradient {
  background: linear-gradient(180deg,#f44881,#ec454f);
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
