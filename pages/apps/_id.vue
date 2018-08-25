<template>
  <div>
    <PageHeader :headerText.sync="headerText"></PageHeader>
    <v-container fluid grid-list-sm class="index-main-container">
      <div class="page-main">
        <GameHeader :gameHeader.sync="gameHeader" :lastUpdated.sync="lastUpdated" :appID.sync="appid"></GameHeader>
        <div class="mt-1">
          <v-container fluid>
            <v-layout align-start justify-space-between fill-height>
              <div class="mt-2">
                <h1>{{ title }}</h1>
                <div>
                  <div class="my-1">
                    <span v-for="(item,k) in appInfos" :key="k">
                      <span v-if="item.Key === 154"> {{ item.Value }} · </span> 
                      <span v-if="item.Key === 155"> {{ apps[0].AppsTypes.DisplayName }} </span>
                    </span>
                  </div>
                  <v-layout v-layout align-start justify-start fill-height>
                    <div class="mt-1">
                      ({{ rating }})
                    </div>
                    <div>
                      <v-rating v-model="rating" small hover class="mx-0"></v-rating>
                    </div>
                  </v-layout>
                </div>
                <div class="my-2">
                  <v-layout row warp>
                    <v-flex xs12 md8 hidden-sm-and-down>
                      <span v-for="(item,k) in appdetails" :key="k">
                        <span v-html="item.data.short_description"></span>
                      </span>
                      <div>
                        <v-dialog
                          v-model="dialogReadMore"
                          width="800"
                        >
                          <a
                            slot="activator"
                          >
                            更多
                          </a>

                          <v-card>
                            <v-card-title
                              class="headline grey lighten-2"
                              primary-title
                            >
                              {{ title }}
                            </v-card-title>

                            <v-card-text>
                              <span v-for="(item,k) in appdetails" :key="k">
                                <span v-html="item.data.detailed_description"></span>
                              </span>
                            </v-card-text>

                            <v-divider></v-divider>

                            <v-card-actions>
                              <v-spacer></v-spacer>
                              <v-btn
                                color="primary"
                                flat
                                @click="dialogReadMore = false"
                              >
                                关闭
                              </v-btn>
                            </v-card-actions>
                          </v-card>
                        </v-dialog>
                      </div>
                    </v-flex>
                  </v-layout>
                </div>
              </div>
              <div></div>
              <div>
                <v-layout wrap row>
                  <v-flex xs12>
                    <v-btn dark large block  :href="'https://store.steampowered.com/app/' + appid" target="_balck" class="mx-0">购买</v-btn>
                    <div>
                      <v-btn class="mx-0" block flat small ><v-icon left small class="my-0">fas fa-exclamation-triangle</v-icon>查看系统需求</v-btn>
                    </div>
                  </v-flex>
                </v-layout>
              </div>
            </v-layout>
            <div>
              <v-tabs centered color="grey lighten-4">
                <v-tabs-slider color="black"></v-tabs-slider>

                <v-layout align-center justify-center row fill-height>
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
                
                <v-tab-item id="tab-1" class="mt-5">
                  <v-layout align-start justify-start row fill-height>
                    <div class="mr-5">
                      <div class="mb-3">
                        <h2>可用于</h2>
                      </div>
                      <v-chip class="elevation-1">
                        <v-avatar>
                          <v-icon small>fas fa-desktop</v-icon>
                        </v-avatar>
                      PC</v-chip>
                    </div>
                    <div>
                      <div class="mb-3">
                        <h2>功能</h2>
                      </div>
                      <v-chip class="elevation-1">
                        <v-avatar>
                          <v-icon small>fas fa-trophy</v-icon>
                        </v-avatar>
                      Steam 成就</v-chip>
                    </div>
                  </v-layout>
                  <div class="mt-5">
                    <h2>游戏介绍</h2>
                    <p class="mt-3">
                      <span v-for="(item,k) in appdetails" :key="k">
                        <span v-html="item.data.detailed_description.slice(0, 600)"></span>...
                      </span>
                    </p>
                    <p>
                      <a @click="dialogReadMore = true">更多</a>
                    </p>
                  </div>
                  <div class="mt-5">
                    <h2>游戏相册</h2>

                    <div class="mt-3">
                      <v-tabs grow v-if="appdetails[appid]" height="338" hide-slider class="grey lighten-4 screenshot" next-icon="fas fa-arrow-circle-right" prev-icon="fas fa-arrow-circle-left">
                        <v-tab v-for="(item,i) in appdetails[appid].data.screenshots" :key="i">
                          <v-img :aspect-ratio="16/9" height="338" :src="item.path_thumbnail" :lazy-src="'/unknow.jpg'"></v-img>
                        </v-tab>
                      </v-tabs>
                    </div>
                  </div>
                  <div class="mt-5">
                    <h2>宣传片</h2>
                    <div class="mt-3">
                      <v-tabs grow v-if="appdetails[appid]" height="338" hide-slider class="grey lighten-4 screenshot" next-icon="fas fa-arrow-circle-right" prev-icon="fas fa-arrow-circle-left">
                        <v-tab v-for="(item,i) in appdetails[appid].data.movies" :key="i">
                          <v-img @click="dialogOpenVideo(item.webm.max)" style="cursor:pointer" :aspect-ratio="16/9" :src="item.thumbnail" v-if="i <= 3" :lazy-src="'/unknow.jpg'" gradient="to top right, rgba(100,115,201,.33), rgba(25,32,72,.7)">
                            <v-layout align-center justify-center row fill-height class="lightbox">
                              <v-icon center large class="white--text">fas fa-play-circle</v-icon>
                            </v-layout>
                          </v-img>
                        </v-tab>
                        <v-dialog v-model="dialogVideo" width="1024px">
                          <video id="videoElement" :src="videoUrl" autoplay controls="controls" width="100%" height="100%" :aspect-ratio="16/9"></video>
                        </v-dialog>
                      </v-tabs>
                    </div>
                  </div>
                </v-tab-item>
              </v-tabs>
            </div>
          </v-container>
          <v-data-table :headers="tableHeaders" :items="appInfos" class="elevation-1" align="center" :rows-per-page-items="[20, 30]" disable-initial-sort style="display:none">
            <template slot="items" slot-scope="props">
              <td class="text-xs-center" v-if="props.item.KeyNames"> {{ props.item.KeyNames[0].DisplayName | appInfoDisplayName }} </td>
              <td class="text-xs-left">{{ props.item.Value }}</td>
            </template>
            <template slot="pageText" slot-scope="props">
              第 {{ props.pageStart }} 项 - {{ props.pageStop }} 项 共 {{ props.itemsLength }} 项
            </template>
          </v-data-table>
        </div>
      </div>
    </v-container>
  </div>
</template>

<script>
  import PageHeader from '~/components/PageHeader'
  import GameHeader from '~/components/GameHeader'
  import axios from 'axios'

  export default {
    async asyncData ({ query, params }) {
      let [apps, appInfos] = await Promise.all([
        axios.get(`https://api.steamhub.cn/api/v1/steam/apps/` + params.id),
        axios.get(`https://api.steamhub.cn/api/v1/steam/app/infos/` + params.id)
      ])
      return {
        apps: apps.data,
        appInfos: appInfos.data,
        appid: params.id,
        title: apps.data[0]['Name'],
        lastUpdated: apps.data[0]['LastUpdated']
      }
    },
    components: {
      PageHeader,
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
        button: `使用 API`,
        dialog: {
          text: `功能开发中`,
          progressBar: {
            height: `6`
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
      videoElement: ''
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
      axios.get(`https://api.steamhub.cn/api/v1/steam/app/appdetails/` + this.appid, {
        headers: {
          'Access-Control-Allow-Origin': '*'
        }
      })
        .then(response => {
          this.appdetails = response.data
          this.carouselLoading = 0
        })
    },
    methods: {
      dialogOpenVideo: function (value) {
        this.videoUrl = value
        this.dialogVideo = true
      }
    },
    filters: {
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
  .screenshot .v-tabs__icon--next, .screenshot .v-tabs__icon--prev {
    font-size: 32px;
    z-index: 99;
    color: #fff;
  }
  .screenshot .v-tabs__wrapper--show-arrows {
    margin: 0;
  }
  .screenshot .v-tabs__item {
    padding-left: 0
  }
</style>