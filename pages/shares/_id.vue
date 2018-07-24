<template>
  <v-jumbotron>
    <v-card>
      <v-container fill-height>
        <v-layout align-center>
          <v-flex xs12 sm12 md12>
            <div v-for="(item, i) in appdetails" :key="i">
              <h3 class="title mb-3">{{ item.data.name }} 的数据分析,价格走势</h3>

              <span class="">{{ item.data.short_description }}</span>
            </div>
            <v-divider class="my-2"></v-divider>

            <div class="text-xs-right">
              <v-btn
                class="mx-0"
                dark
                large
                :href="'//SteamHub.cn/apps/' + id"
                target="_black"
              >
                在 SteamHub 上查看
              </v-btn>
            </div>
            <div class="text-xs-center">
              Build on <a href="//SteamHub.cn" target="_black">SteamHub.cn</a>
            </div>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-jumbotron>
</template>

<script>
  import axios from 'axios'

  export default {
    layout: 'share',
    async asyncData ({ params }) {
      return { id: params.id }
    },
    data: () => ({
      appdetails: ''
    }),
    created: function () {
      axios.get(`https://api.steamhub.cn/api/v1/steam/app/appdetails/` + this.id, {
        headers: {
          'Access-Control-Allow-Origin': '*'
        }
      })
        .then(response => {
          this.appdetails = response.data
        })
    }
  }
</script>
