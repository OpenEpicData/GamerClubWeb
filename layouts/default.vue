<template>
  <VApp>
    <VToolbar
      flat
      absolute
      color="transparent"
      dark
    >
      <VToolbarTitle>
        <nuxt-link to="/">
          <logo />
        </nuxt-link>
      </VToolbarTitle>
      <v-alert
        :value="true"
        color="white"
        icon="info"
        outline
      >
        我们正在迁移数据至 API V3,页面展示数据可能与实际不同
      </v-alert>
      <VSpacer />
      <div class="hidden-sm-and-down">
        <VBtn flat>
          注册
        </VBtn>
        <VBtn
          flat
          outline
          round
        >
          立即开始
        </VBtn>
      </div>
    </VToolbar>
    <VContent>
      <nuxt />
    </VContent>
    <div
      class="white--text mt-5 pt-5 text-xs-center"
      style="background: radial-gradient(circle at 1% 1%,#328bf2,#1644ad)"
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
        <VLayout
          align-center
          justify-center
          fill-height
        >
          <div>
            <VTextField
              label="您的邮件地址"
              append-icon="email"
              type="email"
              solo
              color="white"
              background-color="transparent"
              dark
            >
              <VBtn
                slot="append-outer"
                round
                style="top: -12px"
              >
                或使用 Steam 登录
              </VBtn>
            </VTextField>
          </div>
        </VLayout>
      </div>
    </div>
  </VApp>
</template>

<script>
import logo from '~/components/logo'
import loading from '~/components/loading'

export default {
  components: {
    logo,
    loading
  }
}
</script>


<style>
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
  background: linear-gradient(90deg, #5FBBFE, #208BD8);
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
