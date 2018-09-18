<template>
  <v-app id="inspire" class="grey lighten-4">
    <div class="hidden-sm-and-down">
      <v-toolbar app fixed clipped-left class="white">
        <img src="/logo_64x64.png" alt="SteamHub Logo">
        <span class="title ml-3 mr-5">SteamHub --Search</span>
        <v-toolbar-items class="hidden-sm-and-down">
          <v-btn flat to="/">浏览</v-btn>
          <v-btn flat to="/apps/pages/">游戏</v-btn>
        </v-toolbar-items>
        <v-text-field
          class="mt-2 ml-1 hidden-sm-and-down"
          solo-inverted
          label="搜索功能重做中..."
          append-icon="search"
          v-model="search"
          @click="searchButton"
          disabled
        ></v-text-field>
        <v-spacer></v-spacer>
        <v-toolbar-items class="hidden-sm-and-down">
          <v-btn 
          flat
          :disabled="dialogJoin"
          @click.stop="dialogJoin = true"
          >
            加入社区 <v-icon right>add_circle_outline</v-icon></v-btn>
        </v-toolbar-items>
      </v-toolbar>
    </div>
    <div class="hidden-md-and-up">
      <v-toolbar app tabs fixed clipped-left class="white">
        <img src="/logo_20x20_white.png" alt="SteamHub Logo">
        <span class="title ml-3 mr-5 mt-2">SteamHub -- Search</span>
        <v-toolbar-items class="hidden-sm-and-down">
          <v-btn flat to="/">浏览</v-btn>
          <v-btn flat to="/apps/pages/">游戏</v-btn>
        </v-toolbar-items>
        <v-tabs slot="extension" centered slider-color="black">
          <v-tab to="/">
            浏览
          </v-tab>
          <v-tab to="/infos">
            游戏
          </v-tab>
        </v-tabs>
      </v-toolbar>
    </div>
    <div class="grey lighten-4">
      <v-container fluid grid-list-sm class="index-main-container">
        <div class="page-main">
          <nuxt />
        </div>
      </v-container>
    </div>
    <v-dialog
      v-model="dialogJoin"
      width="300"
    >
      <v-card
        color="primary"
        dark
      >
        <div>
          <v-container class="text-xs-center" style="padding-bottom: 0">
            <h2 class="headline">加入社区</h2>
            <h6 class="body-1">SteamHub 是针对游戏和创意社区的数据交流平台</h6>
            <div class="mt-5">
              <v-btn disabled><v-icon left>fas fa-gamepad</v-icon>登录方式：InBuff</v-btn> <br>
              <span class="body-1 font-weight-bold">没有账户？<a href="#!" class="white--text">创建一个账户</a></span>
            </div>
            <v-divider class="mt-5" color="grey"></v-divider>
            <div>
              <v-btn flat disabled><v-icon left>fas fa-caret-down</v-icon>其他登录方式</v-btn>
            </div>
          </v-container>
          <v-layout row wrap>
            <v-flex xs6>
              <v-btn block color="blue" style="margin: 9px 0 0 0;box-shadow: none;-webkit-box-shadow:none ">服务条款</v-btn>
            </v-flex>
            <v-flex xs6>
              <v-btn block color="blue" style="margin: 9px 0 0 0;box-shadow: none;-webkit-box-shadow:none">隐私政策</v-btn>
            </v-flex>
          </v-layout>
        </div>
      </v-card>
    </v-dialog>
    <v-bottom-nav
      class="hidden-md-and-up"
      :active.sync="bottomNav"
      color="white"
      :value="true"
      fixed
      shift
    >
      <v-btn to="/search">
        <span>搜索</span>
        <v-icon>search</v-icon>
      </v-btn>

      <v-btn to="/">
        <span>浏览</span>
        <v-icon>list</v-icon>
      </v-btn>

      <v-btn 
      :disabled="dialogJoin"
      @click.stop="dialogJoin = true"
      >
        <span>加入社区</span>
        <v-icon>add_circle_outline</v-icon>
      </v-btn>

    </v-bottom-nav>
  </v-app>
</template>

<script>
  export default {
    data: () => ({
      dialogJoin: false,
      bottomNav: 1,
      search: '',
      headerText: {
        title: '强大快速的搜索功能',
        descript: 'SteamHub 提供丰富的搜索选项以供全世界范围内的开发者及用户进行深度挖掘',
        button: '使用 API',
        dialog: {
          text: '功能开发中',
          progressBar: {
            height: '6'
          }
        }
      }
    }),
    props: {
      source: String
    },
    methods: {
      searchButton: function () {
        if (this.search === 'undefined' || this.search === '') {
          this.$router.push({path: '/search/'})
        } else {
          this.$router.push({path: '/search/q/' + this.search})
        }
      }
    },
    created: function () {
      if (this.$route.name === 'search-q-q') {
        this.search = this.$route.params.q
      }
    },
    watch: {
      dialogJoin (val) {
      },
      search (value) {
        if (value === 'undefined' || value === '') {
          this.$router.push({path: '/search/'})
        } else {
          this.$router.push({path: '/search/q/' + value})
        }
      }
    }
  }
</script>

<style>
  #keep main .container {
    height: 660px;
  }
  .v-navigation-drawer__border {
    display: none;
  }
  .text {
    font-weight: 400;
  }
  .v-overlay--active:before {
    opacity: 1;
  }
  .v-overlay:before {
    background-color: #fff;
  }
  @media (min-width: 1264px) {
    .index-main-container {
      width: 1700px;
      max-width: 90%;
    }
  }
  @media (max-width: 960px) {
    .page-main {
      margin: 114px 0 40px 0
    }
  }
  @media (max-width: 600px) {
    .page-main {
      margin: 66px 0 40px 0
    }
    .v-toolbar__content {
      height: 0 !important;
    }
  }
</style>