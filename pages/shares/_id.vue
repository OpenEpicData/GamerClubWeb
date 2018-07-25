<template>
  <v-card>
    <div>
      <v-container fluid>
        <div v-for="(item, i) in appdetails" :key="i">
          <v-container grid-list-md elevation-6>
            <v-layout row wrap>

              <v-flex xs12 sm8 md6>
                <h3 class="title mt-3">{{ item.data.name }}</h3>
              </v-flex>

              <v-flex xs12 sm4 md6>
                <div class="text-xs-right">
                  <v-btn class="mx-0 white--text" color="black" large :href="'//SteamHub.cn/apps/' + id" target="_black">
                    在 SteamHub 上查看
                  </v-btn>
                </div>
              </v-flex>
            </v-layout>
          </v-container>
        </div>
      </v-container>
    </div>
  </v-card>
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
      axios
        .get(`https://api.steamhub.cn/api/v1/steam/app/appdetails/` + this.id, {
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