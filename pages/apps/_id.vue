<template>
  <div class="mt-5">
    <v-card
      flat
      v-if="appdetails[appid]"
    >
      <div
        flat
        class="header_video"
      >
        <video
          :src="appdetails[appid].data.movies[0].webm.max | moviePath"
          height="100%"
          width="100%"
          autoplay="autoplay"
          loop
          style="object-fit:fill"
          muted
        ></video>
      </div>

      <v-layout
        align-start
        justify-center
        row
        fill-height
        class="grey lighten-4"
      >
        <v-flex xs12>
          <v-container
            fluid
            class="index-main-container"
          >
            <v-card class="card--flex-toolbar grey lighten-4">
              <v-layout
                align-start
                justify-space-between
                fill-height
                class="mx-5 py-5"
              >
                <div class="mt-2">
                  <h1 class="display-2 font-weight-black">{{ title }}</h1>
                  <div>
                    <div class="my-1">
                      <span
                        v-for="(item,k) in appInfos"
                        :key="k"
                      >
                        <span v-if="item.Key === 154"> {{ item.Value }} · </span>
                        <span v-if="item.Key === 155"> {{ apps[0].app_type.DisplayName }} </span>
                      </span>
                    </div>
                    <v-layout
                      v-layout
                      align-start
                      justify-start
                      fill-height
                    >
                      <div class="mt-1">
                        ({{ rating }})
                      </div>
                      <div>
                        <v-rating
                          v-model="rating"
                          small
                          hover
                          class="mx-0"
                        ></v-rating>
                      </div>
                    </v-layout>
                  </div>
                  <div class="my-2">
                    <v-layout
                      row
                      warp
                    >
                      <v-flex
                        xs12
                        md8
                      >
                        <span
                          v-for="(item,k) in appdetails"
                          :key="k"
                          v-if="item.data.short_description"
                        >
                          <span v-html="item.data.short_description"></span>
                        </span>
                        <div>
                          <v-dialog
                            v-model="dialogReadMore"
                            width="1000"
                          >
                            <a slot="activator">
                              更多
                            </a>

                            <v-card>
                              <v-toolbar
                                class="grey lighten-2 mt-5"
                                fixed
                              >
                                <v-layout
                                  align-center
                                  justify-center
                                  row
                                  fill-height
                                >
                                  <div class="headline text-xs-center">{{ title }}</div>
                                </v-layout>
                              </v-toolbar>

                              <v-card-text class="my-5">
                                <span
                                  v-for="(item,k) in appdetails"
                                  :key="k"
                                >
                                  <span
                                    v-if="item.data.detailed_description"
                                    v-html="item.data.detailed_description"
                                  ></span>
                                </span>
                              </v-card-text>

                              <v-divider></v-divider>

                              <v-card-actions style="position:fixed;bottom:45px;margin:0 auto;left:0;right:0;" class="grey lighten-2">
                                  <div style="margin:0 auto;left:0;right:0;">
                                    <v-btn
                                      color="primary"
                                      @click="dialogReadMore = false"
                                    >
                                      关闭
                                    </v-btn>
                                  </div>
                              </v-card-actions>
                            </v-card>
                          </v-dialog>
                        </div>
                      </v-flex>
                    </v-layout>
                  </div>
                </div>
                <div class="hidden-sm-and-down"></div>
                <div class="hidden-sm-and-down">
                  <v-layout
                    wrap
                    row
                  >
                    <v-flex xs12>
                      <h4 class="display-1 font-weight-bold">￥{{ appPrices[0].现价 }}</h4>
                      <span v-for="(item,k) in appInfos" :key="k">
                        <div v-if="item.Value === 'prerelease'">
                          游戏尚未发售
                        </div>
                      </span>
                      <div v-if="details">
                        <v-menu full-width top left offset-y>
                          <v-btn
                            slot="activator"
                            block
                            large
                            outline
                          >
                            {{ title }}
                            <v-icon right>
                              fas fa-chevron-down
                            </v-icon>
                          </v-btn>
                          <v-list>
                            <v-list-tile
                              v-for="(item, index) in packages"
                              :key="index"
                              :href="'https://store.steampowered.com/sub/' + item.packageid"
                              target="_black"
                            >
                              <v-list-tile-title v-html="item.option_text"></v-list-tile-title>
                            </v-list-tile>
                          </v-list>
                        </v-menu>
                      </div>
                      <v-btn
                        dark
                        large
                        block
                        :href="'https://store.steampowered.com/app/' + appid"
                        target="_balck"
                        class="mx-0"
                      >购买</v-btn>
                    </v-flex>
                  </v-layout>
                </div>
              </v-layout>
            </v-card>
          </v-container>
        </v-flex>
      </v-layout>
    </v-card>
    <v-container
      fluid
      grid-list-sm
      class="index-main-container"
    >
      <div class="page-main">
        <div>
          <v-container fluid>
            <div>
              <v-tabs
                centered
                color="grey lighten-4"
                v-model="tabActice"
              >
                <v-tabs-slider color="black"></v-tabs-slider>

                <v-layout
                  align-center
                  justify-center
                  row
                  fill-height
                >
                  <v-tab href="#tab-1">
                    浏览
                  </v-tab>
                  <v-tab href="#tab-2">
                    系统要求
                  </v-tab>
                  <v-tab href="#tab-3">
                    用户评价
                  </v-tab>
                  <v-tab href="#tab-4">
                    相似应用
                  </v-tab>
                </v-layout>

                <v-tab-item
                  id="tab-1"
                  class="mt-5 ml-1"
                >
                  <v-layout
                    align-start
                    justify-start
                    column
                    fill-height
                  >
                    <div class="mr-5">
                      <div class="mb-3">
                        <h2>可用于</h2>
                      </div>
                      <v-chip
                        class="elevation-1"
                        v-for="(item, i) in appSystem"
                        :key="i"
                      >
                        <v-avatar>
                          <v-icon
                            small
                            v-if="item === 'windows'"
                          >fab fa-microsoft</v-icon>
                          <v-icon
                            small
                            v-else-if="item === 'macos'"
                          >fab fa-apple</v-icon>
                          <v-icon
                            small
                            v-else
                          >fab fa-linux</v-icon>
                        </v-avatar>
                        {{ item }}
                      </v-chip>
                    </div>
                    <div>
                      <div class="mb-3 mt-5">
                        <h2>功能</h2>
                      </div>
                      <span
                        v-if="appdetails[appid]"
                        v-for="(item, i) in appdetails"
                        :key="i"
                      >
                        <v-chip
                          class="elevation-1"
                          v-for="(data, i) in item.data.categories"
                          :key="i"
                        >
                          <span>
                            {{ data.description }}
                          </span>
                        </v-chip>
                      </span>
                    </div>
                  </v-layout>
                  <div class="mt-5">
                    <h2>游戏介绍</h2>
                    <p class="mt-3">
                      <span
                        v-for="(item,k) in appdetails"
                        :key="k"
                      >
                        <span
                          v-if="item.data.detailed_description"
                          v-html="item.data.detailed_description.slice(0, 600)"
                        ></span>...
                      </span>
                    </p>
                    <p>
                      <a @click="dialogReadMore = true">更多</a>
                    </p>
                  </div>
                  <div class="mt-5">
                    <h2>游戏相册</h2>

                    <div class="mt-3">
                      <v-tabs
                        grow
                        v-if="appdetails[appid]"
                        mobile-break-point="0"
                        height="338"
                        hide-slider
                        class="grey lighten-4 screenshot"
                        next-icon="fas fa-arrow-circle-right"
                        prev-icon="fas fa-arrow-circle-left"
                      >
                        <v-tab
                          v-for="(item,i) in appdetails[appid].data.screenshots"
                          :key="i"
                        >
                          <v-img
                            :aspect-ratio="16/9"
                            height="338"
                            :src="item.path_thumbnail"
                            :lazy-src="'/unknow.jpg'"
                          ></v-img>
                        </v-tab>
                      </v-tabs>
                    </div>
                  </div>
                  <div class="mt-5">
                    <h2>宣传片</h2>
                    <div class="mt-3">
                      <v-tabs
                        grow
                        v-if="appdetails[appid]"
                        height="164"
                        mobile-break-point="0"
                        hide-slider
                        class="grey lighten-4 video"
                        next-icon="fas fa-arrow-circle-right"
                        prev-icon="fas fa-arrow-circle-left"
                      >
                        <v-tab
                          v-for="(item,i) in appdetails[appid].data.movies"
                          :key="i"
                        >
                          <v-img
                            @click="dialogOpenVideo(item.webm.max)"
                            style="cursor:pointer"
                            :aspect-ratio="16/9"
                            :src="item.thumbnail"
                            v-if="i <= 3"
                            :lazy-src="'/unknow.jpg'"
                            gradient="to top right, rgba(100,115,201,.33), rgba(25,32,72,.7)"
                          >
                            <v-layout
                              align-center
                              justify-center
                              row
                              fill-height
                              class="lightbox"
                            >
                              <v-icon
                                center
                                large
                                class="white--text"
                              >fas fa-play-circle</v-icon>
                            </v-layout>
                          </v-img>
                        </v-tab>
                        <v-dialog
                          v-model="dialogVideo"
                          width="1024px"
                        >
                          <video
                            id="videoElement"
                            :src="videoUrl"
                            autoplay
                            controls="controls"
                            width="100%"
                            height="100%"
                            :aspect-ratio="16/9"
                          ></video>
                        </v-dialog>
                      </v-tabs>
                    </div>
                  </div>
                </v-tab-item>

                <v-tab-item
                  id="tab-2"
                  class="mt-5 ml-1"
                >
                  <v-layout
                    align-start
                    justify-start
                    column
                    fill-height
                    v-if="appdetails[appid]"
                  >
                    <div v-if="appdetails[appid].data.pc_requirements">
                      <h2>Windows: </h2>
                      <div class="mt-2">
                        <p v-html="appdetails[appid].data.pc_requirements.minimum"></p>
                      </div>
                    </div>
                    <div
                      class="mt-5"
                      v-if="appdetails[appid].data.mac_requirements"
                    >
                      <h2>Mac: </h2>
                      <div class="mt-2">
                        <p v-html="appdetails[appid].data.mac_requirements.minimum"></p>
                      </div>
                    </div>
                    <div
                      class="mt-5"
                      v-if="appdetails[appid].data.linux_requirements"
                    >
                      <h2>Linux: </h2>
                      <div class="mt-2">
                        <p v-html="appdetails[appid].data.linux_requirements.minimum"></p>
                      </div>
                    </div>
                  </v-layout>
                </v-tab-item>

                <v-tab-item
                  id="tab-3"
                  class="mt-5 ml-1"
                >
                  <v-layout
                    align-start
                    justify-start
                    column
                    fill-height
                  >
                    <div>
                      <h2>评分及评价</h2>
                      <v-layout
                        align-space-around
                        justify-start
                        row
                        fill-height
                      >
                        <div>
                          <h2 class="display-4">0.0</h2>
                          <v-rating
                            v-model="rating"
                            readonly
                            small
                            color="pink"
                            class="mx-0"
                          ></v-rating>
                        </div>
                      </v-layout>
                    </div>
                    <div class="mt-5">
                      <v-divider
                        light
                        color="black"
                      ></v-divider>
                      <div class="mt-3">
                        <h3>所有用户评价</h3>
                        <h4>功能开发中</h4>
                      </div>
                    </div>
                  </v-layout>
                </v-tab-item>

                <v-tab-item
                  id="tab-4"
                  class="mt-5 ml-1"
                >
                  <v-layout
                    align-start
                    justify-start
                    column
                    fill-height
                  >
                    <div>
                      <h2>人们同样喜欢</h2>
                    </div>
                  </v-layout>
                </v-tab-item>
              </v-tabs>
            </div>
          </v-container>
          <v-container
            fluid
            dark
            v-if="chartData"
          >
            <div>
              <div
                class="my-3"
                id="gamePrice"
              >
                <h2>游戏价格 - Beta</h2>
                <v-layout
                  row
                  wrap
                  id="today"
                >
                  <v-flex xs12>
                    <div
                      v-for="(item,k) in appInfos"
                      :key="k"
                    >
                      <div v-if="item.Value === 'released'">
                        <div v-if="isDiscount">
                          <h4 class="mt-3">
                            <span>正在打折中</span>
                            <v-chip><span
                                v-if="discountPrice === minPriceFinal"
                                class="mx-1"
                              >史低</span> {{ discountPrice }} 元 </v-chip>
                          </h4>
                          <h4
                            class="mt-3"
                            v-if="discountPrice !== minPriceFinal"
                          >
                            历史最低价格:
                            <v-chip> {{ minPriceFinal }} 元 </v-chip>
                          </h4>
                        </div>
                        <div v-else>
                          <h4 class="mt-3">
                            暂无折扣, 历史最低价格:
                            <v-chip> {{ minPriceFinal }} 元 </v-chip>
                          </h4>
                        </div>
                      </div>
                      <div v-if="item.Value === 'prerelease'">
                        游戏尚未发售
                      </div>
                    </div>

                  </v-flex>
                </v-layout>
                <div class="mt-3">
                  <ve-line :data="chartData"></ve-line>
                </div>
              </div>
            </div>
          </v-container>
          <v-data-table
            :headers="tableHeaders"
            :items="appInfos"
            class="elevation-1"
            align="center"
            :rows-per-page-items="[20, 30]"
            disable-initial-sort
            style="display:none"
          >
            <template
              slot="items"
              slot-scope="props"
            >
              <td
                class="text-xs-center"
                v-if="props.item.KeyNames"
              > {{ props.item.KeyNames[0].DisplayName | appInfoDisplayName }} </td>
              <td class="text-xs-left">{{ props.item.Value }}</td>
            </template>
            <template
              slot="pageText"
              slot-scope="props"
            >
              第 {{ props.pageStart }} 项 - {{ props.pageStop }} 项 共 {{ props.itemsLength }} 项
            </template>
          </v-data-table>
        </div>
      </div>
    </v-container>
  </div>
</template>

<script>
  import GameHeader from '~/components/GameHeader'
  import axios from 'axios'
  import _ from 'lodash'

  export default {
    async asyncData ({ query, params }) {
      let [apps, appInfos, appPrices] = await Promise.all([
        axios.get('https://rest.steamhub.cn/api/v2/apps/lists/' + params.id),
        axios.get('https://rest.steamhub.cn/api/v2/apps/infos/' + params.id),
        axios.get('https://rest.steamhub.cn/api/v2/apps/prices/' + params.id + '?country=China')
      ])
      let result = appPrices.data.map(function (o) {
        return Object.assign({
          现价: o.PriceFinal / 100,
          原价: o.PriceInitial / 100,
          更新时间: o.LastUpdated
        })
      })
      return {
        apps: apps.data,
        appInfos: appInfos.data,
        appid: params.id,
        title: apps.data[0]['Name'],
        lastUpdated: apps.data[0]['LastUpdated'],
        appPrices: result,
        chartData: {
          columns: ['更新时间', '原价', '现价'],
          rows: _.orderBy(result, ['更新时间'], ['asc'])
        }
      }
    },
    components: {
      GameHeader
    },
    data: () => ({
      appid: '',
      appdetails: '',
      carouselLoading: 6,
      lastUpdated: '',
      headerText: {
        title: '',
        descript: '',
        button: '使用 API',
        dialog: {
          text: '功能开发中',
          progressBar: {
            height: '6'
          }
        }
      },
      rating: 0,
      tableHeaders: [
        { text: '名称', value: 'name' },
        { text: '值', value: 'value' }
      ],
      dialogReadMore: false,
      dialogVideo: false,
      videoUrl: '',
      playVideo: '',
      videoElement: '',
      chartData: {
        columns: '',
        rows: ''
      },
      discountPrice: '',
      minPriceFinal: '',
      isDiscount: '',
      appSystem: '',
      systemRequire: {
        windows: '',
        linux: '',
        macos: ''
      },
      starPL: 0,
      tabActice: 'tab-1'
    }),
    created: function () {
      this.headerText.title = this.title
      this.gameHeader = [
        { icon: 'info', text: '信息', dark: true, link: '/apps/' + this.appid },
        { icon: 'attach_money', text: '价格', outline: true, link: '/apps/prices/' + this.appid },
        { icon: 'subject', text: '软件包', outline: true, disable: true },
        { icon: 'playlist_add', text: '扩充包', outline: true, disable: true },
        { icon: 'home', text: '仓库', outline: true, disable: true },
        { icon: 'history', text: '更新历史', outline: true, disable: true }
      ]
      axios.get('https://rest.steamhub.cn/api/v2/apps/details/' + this.appid)
        .then(response => {
          if (response.data[this.appid].data.package_groups[0].subs) {
            const getDetails = response.data[this.appid].data.package_groups[0].subs
            this.packages = getDetails
            this.details = true
          }
          this.appdetails = response.data
          this.carouselLoading = 0
        })
      axios.get('https://rest.steamhub.cn/api/game/search/app/list/view/' + this.appid + '/price?country=cn&math=min')
        .then(response => {
          this.minPriceFinal = response.data / 100
        })
    },
    mounted: function () {
      let appSystem = ''
      this.appInfos.forEach(element => {
        if (element.Key === 117) {
          appSystem = element.Value
        }
      })
      this.appSystem = appSystem.split(',')
    },
    methods: {
      dialogOpenVideo: function (value) {
        this.videoUrl = value
        this.dialogVideo = true
      }
    },
    filters: {
      moviePath: function (value) {
        return value.replace(/http/, 'https')
      },
      appInfoDisplayName: function (value) {
        switch (value) {
          case 'changenumber':
            return '更改 ID'
          case 'oslist':
            return '支持的系统'
          case 'logo':
            return '游戏 Logo'
          case 'clienticon':
            return '客户端图标'
          case 'logo_small':
            return '游戏小尺寸 Logo'
          case 'clienttga':
            return '客户端 TGA 资源'
          case 'icon':
            return '图标'
          case 'languages':
            return '支持语言'
          case 'community_visible_stats':
            return '社区可见状态'
          case 'community_hub_visible':
            return '社区群组可见状态'
          case 'metacritic_name':
            return 'metacritic 评分名称'
          case 'root_config':
            return '游戏设置'
          case 'controller_support':
            return '控制器支持'
          case 'root_depots':
            return '仓库'
          case 'small_capsule':
            return '小尺寸滚动图'
          case 'header_image':
            return '头部图片'
          case 'exfgls':
            return '是否支持家庭共享'
          case 'store_tags':
            return '商店标签'
          case 'developer':
            return '开发商'
          case 'publisher':
            return '发行商'
          case 'homepage':
            return '官网'
          case 'clienticns':
            return '客户端 icns'
          case 'linuxclienticon':
            return 'linux 客户端图标'
          case 'metacritic_score':
            return 'metacritic 评分'
          case 'gamedir':
            return '游戏文件夹'
          case 'metacritic_fullurl':
            return 'metacritic 完整 url'
          case 'isfreeapp':
            return '是否免费'
          case 'listofdlc':
            return '扩充包列表'
          case 'root_ufs':
            return '全局 ufs'
          case 'workshop_visible':
            return '创意工坊可见状态'
          case 'gamemanualurl':
            return '游戏用户手册链接'
          case 'metacritic_url':
            return 'metacritic 链接'
          case 'developer_url':
            return '开发商链接'
          case 'noservers':
            return '是否单机'
          case 'state':
            return '状态'
          case 'validoslist':
            return '系统支持名单'
          case 'primarycache':
            return '主要缓存'
          case 'sourcegame':
            return '是否是起源引擎'
          case 'serverbrowsername':
            return '服务端浏览器名称'
          case 'vacmacmodulecache':
            return 'VAC 包缓存地址'
          case 'vacmodulecache':
            return 'VAC 包缓存'
          case 'vacmodulefilename':
            return 'VAC 包文件名称'
          case 'root_localization':
            return '本地化'
          case 'icon2':
            return '游戏次级图标'
          case 'loadallbeforelaunch':
            return '发布前是否加载所有内容'
          case 'minclientversion':
            return '最小客户端版本'
          case 'root_sysreqs':
            return '系统要求'
          case 'primarycache_linux':
            return 'Linux 主要缓存'
          case 'requiressse':
            return '游戏次级图标'
          case 'RequiresSSE':
            return 'RequiresSSE'
          case 'releasestate':
            return '发布状态'
          case 'osarch':
            return '系统位数'
          case 'eulas':
            return '最终用户许可协议'
          case 'anti_cheat_support_url':
            return '反作弊支持网站'
          default:
            return value
        }
      }
    },
    watch: {
      dialogVideo: function (value) {
        this.videoElement = document.getElementById('videoElement')
        if (value === false) {
          this.videoElement.pause()
        } else {
          this.videoElement.play()
        }
      }
    },
    head () {
      return {
        title: 'AppID:' + this.appid + ' -- ' + this.title + ' 应用的数据信息  -- SteamHub',
        meta: [
          { hid: 'description', name: 'description', content: '在 SteamHub 中查询使用 ' + 'AppID: ' + this.appid + this.headerText.title + ' 的数据' }
        ]
      }
    }
  }
</script>

<style>
  .v-datatable th {
    text-align: center !important;
  }

  .screenshot .v-responsive__content {
    width: 400px;
  }

  .screenshot .v-tabs__bar {
    background-color: transparent;
  }

  .screenshot .v-tabs__icon--prev {
    left: 30px;
  }

  .screenshot .v-tabs__icon--next {
    right: 30px;
  }

  .screenshot .v-tabs__icon--next,
  .screenshot .v-tabs__icon--prev {
    font-size: 32px;
    z-index: 99;
    color: #fff;
    line-height: 338px;
  }

  .screenshot .v-tabs__wrapper--show-arrows {
    margin: 0;
  }

  .screenshot .v-tabs__item {
    padding-left: 0
  }

  .video .v-responsive__content {
    width: 400px;
  }

  .video .v-tabs__bar {
    background-color: transparent;
  }

  .video .v-tabs__icon--prev {
    left: 30px;
  }

  .video .v-tabs__icon--next {
    right: 30px;
  }

  .video .v-tabs__icon--next,
  .video .v-tabs__icon--prev {
    font-size: 32px;
    z-index: 99;
    color: #fff;
    line-height: 164px;
  }

  .video .v-tabs__wrapper--show-arrows {
    margin: 0;
  }

  .video .v-tabs__item {
    padding-left: 0
  }

  .accent--text {
    color: #000 !important;
    caret-color: #000 !important;
  }

  .card--flex-toolbar {
    margin-top: -20vh;
  }

  .header_video {
    height: 100vh
  }

  .discount_original_price {
    text-decoration:line-through
  }

  @media screen and (max-width: 1264px) {
    .header_video {
      height: 80vh;
    }
  }

  @media screen and (max-width: 960px) {
    .header_video {
      height: 75vh;
    }
  }

  @media screen and (max-width: 600px) {
    .header_video {
      height: 50vh;
    }
  }
</style>