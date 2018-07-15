<template>
  <div>
    <PageHeader :headerText.sync="headerText"></PageHeader>
    <v-container fluid grid-list-sm class="index-main-container">
      <div class="hidden-sm-and-down">
        <div class="hidden-sm-and-down" v-for="(item,i) in appdetails" :key="i">
          <v-progress-linear indeterminate color="blue" class="mb-0" :height="carouselLoading"></v-progress-linear>
          <el-carousel :interval="4000" type="card">
            <el-carousel-item v-for="(img,k) in item.data.screenshots" :key="k" class="text-xs-center">
              <img :src="img.path_thumbnail" alt="">
            </el-carousel-item>
          </el-carousel>
        </div>
      </div>
      <div class="page-main">
        <v-layout row wrap id="today">
          <v-flex xs8>
            <v-btn color="deep-purple lighten-1" dark>
              <v-icon left class="mt-1">info</v-icon>信息
            </v-btn>
            <v-btn disabled color="deep-purple lighten-1" outline>
              <v-icon left class="mt-1">attach_money</v-icon>价格
            </v-btn>
            <v-btn disabled color="deep-purple lighten-1" outline>
              <v-icon left class="mt-1">subject</v-icon>软件包
            </v-btn>
            <v-btn disabled color="deep-purple lighten-1" outline>
              <v-icon left class="mt-1">playlist_add</v-icon>扩充包
            </v-btn>
            <v-btn disabled color="deep-purple lighten-1" outline>
              <v-icon left class="mt-1">home</v-icon>仓库
            </v-btn>
            <v-btn disabled color="deep-purple lighten-1" outline>
              <v-icon left class="mt-1">history</v-icon>更新历史
            </v-btn>
          </v-flex>
          <v-flex xs4>
            <div class="text-xs-right mt-3">
              <h3>上次更新: {{ LastUpdated | time }}</h3>
            </div>
          </v-flex>
        </v-layout>
        <div class="mt-3">
          <v-data-table :headers="tableHeaders" :items="appInfos" class="elevation-1" align="center" :rows-per-page-items="[20, 30]" disable-initial-sort>
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
  import axios from 'axios'
  import relativeTime from 'dayjs/plugin/relativeTime'
  import dayjs from 'dayjs'

  import 'dayjs/locale/zh-cn'
  dayjs.extend(relativeTime)

  export default {
    async asyncData ({ query, params }) {
      let [apps, appInfos] = await Promise.all([
        axios.get(`https://api.steamhub.cn/api/v1/steam/apps/` + params.id),
        axios.get(`https://api.steamhub.cn/api/v1/steam/app/infos/` + params.id)
      ])
      return {
        apps: apps.data,
        appInfos: appInfos.data,
        appid: params.id
      }
    },
    components: {
      PageHeader
    },
    data: () => ({
      appdetails: '',
      carouselLoading: 6,
      LastUpdated: '',
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
      tableHeaders: [
        { text: '名称', value: 'name' },
        { text: '值', value: 'value' }
      ]
    }),
    created: function () {
      axios.get(`https://api.steamhub.cn/api/v1/steam/app/appdetails/` + this.appid, {
        headers: {
          'Access-Control-Allow-Origin': '*'
        }
      })
        .then(response => {
          this.appdetails = response.data
          this.carouselLoading = 0
          this.apps.forEach(element => {
            this.headerText.title = element.Name
            this.LastUpdated = element.LastUpdated
          })
        })
    },
    filters: {
      time: function (value) {
        return dayjs().locale('zh-cn').from(dayjs(value))
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
            return '免费游戏'
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
    head () {
      return {
        title: 'AppID:' + this.appid + ' -- ' + this.headerText.title + ' 应用的数据信息  -- SteamHub',
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
</style>