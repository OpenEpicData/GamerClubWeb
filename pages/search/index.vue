<template>
  <div>
    <v-app class="g-blue-hydrogen" dark>
      <v-content>
        <v-container fluid fill-height class="index-main-container">
          <v-layout align-center justify-center row>
            <v-flex xs12 sm10 md8 lg6>
              <v-text-field
                solo
                outline
                single-line
                color="white"
                label="搜索游戏, ID..."
                append-icon="search"
                v-model="search"
                full-width
                autofocus
              ></v-text-field>
              <div class="text-xs-center">
                <v-btn large color="white" light @click="searchButton">立即搜索</v-btn>
              </div>
            </v-flex>
          </v-layout>
        </v-container>
      </v-content>
    </v-app>
  </div>
</template>

<script>
  export default {
    layout: 'search',
    data: () => ({
      dialogAttention: false,
      q: '',
      isData: true,
      result: '',
      resultLength: '',
      search: ''
    }),
    methods: {
      searchButton: function () {
        if (this.search === 'undefined' || this.search === '') {
          this.$router.push({ path: '/search/' })
        } else {
          this.$router.push({ path: '/search/q/' + this.search })
        }
      }
    },
    watch: {
      search (value) {
        if (value === 'undefined' || value === '') {
        } else {
        }
      }
    },
    head () {
      return {
        title: 'SteamHub 搜索 -- SteamHub Search',
        meta: [
          {
            hid: 'description',
            name: 'description',
            content:
              ' SteamHub Search 提供丰富的搜索选项以供全世界范围内的开发者及用户进行深度挖掘 '
          }
        ]
      }
    }
  }
</script>
