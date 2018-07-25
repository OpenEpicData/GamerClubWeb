<template>
  <div>
    <PageHeader :headerText.sync="headerText"></PageHeader>
      <v-container fluid grid-list-sm class="index-main-container">
        <div class="page-main">
          <v-layout row wrap>
            <v-flex xs8>
              <v-btn color="deep-purple lighten-1" dark>
                <v-icon left class="mt-1">apps</v-icon>资讯
              </v-btn>
            </v-flex>
            <v-flex xs4>
              <div class="text-xs-right mt-3">
                <h3>第 {{ list.page }} 页</h3>
              </div>
            </v-flex>
          </v-layout>
          <v-container fluid>
            <div v-for="(item, i) in list.data" :key="i" class="my-3">
              <v-layout row wrap class="px-3 py-3">
                
                <v-flex xs10>
                  <h3 class="title mb-3"> {{ item.title }} </h3>
                  <span v-html="item.content" class="content"></span>
                </v-flex>

                <v-flex xs2>
                  <div class="text-xs-right">
                    <v-chip>{{ item.author }}</v-chip>
                  </div>
                </v-flex>
              </v-layout>
              <v-divider class="my-2"></v-divider>
            </div>
          </v-container>
        </div>
      </v-container>
  </div>
</template>

<script>
  import axios from 'axios'
  import PageHeader from '~/components/PageHeader'

  export default {
    async asyncData () {
      return axios.get(`https://api.steamhub.cn/api/v1/articles/?type=`, {
        headers: {
          'Access-Control-Allow-Origin': '*'
        }
      })
        .then(function (response) {
          return { list: response.data }
        })
    },
    components: {
      PageHeader
    },
    data: () => ({
      headerText: {
        title: `最新最全面的游戏资讯`,
        descript: `在 SteamHub 上你的查找到最新最全的游戏资讯,业内新闻等`,
        button: `使用 API`,
        dialog: {
          text: `功能开发中`,
          progressBar: {
            height: `6`
          }
        }
      }
    }),
    head () {
      return {
        title: ' 游戏资讯 -- SteamHub',
        meta: [
          { hid: 'description', name: 'description', content: '在 SteamHub 上查询使用最新最全的游戏资讯,业内新闻等' }
        ]
      }
    }
  }
</script>

<style>
 .content .ql-video {
   width: 100%;
 }
 .content img {
   max-width: 200px
 }
</style>
