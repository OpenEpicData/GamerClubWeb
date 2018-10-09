<template>
  <v-flex d-flex xs12 v-if="list">
    <v-layout row wrap>
      <v-flex d-flex xs12 sm6 md4 lg3 xl2 v-for="(item,i) in list.slice(0, 12)" :key="i" class="game-list-card px-2">
        <v-hover>
          <v-card slot-scope="{ hover }" :class="`elevation-${hover ? 12 : 0}`" flat class="grey lighten-4 my-3" height="320px"
            width="100%">
            <v-img style="cursor:pointer" :src="'https://cdn.steamstatic.com.8686c.com/steam/apps/' + item.appid + '/header.jpg'"
              :lazy-src="'/unknow.jpg'" height="215px" v-on:click="cardTo(item.appid)">
              <v-container fill-height fluid pa-2>
                <v-layout align-start justify-start row fill-height>
                  <v-flex xs12 flexbox class="text-xs-right">
                    <v-btn small color="g-blue-hydrogen" dark @click.stop="dialogAttention = true">
                      {{ $t('Currently online') }}: {{ item.now }}
                    </v-btn>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-img>
            <v-card-title primary-title>
              <v-layout row wrap>
                <v-flex xs12>
                  <nuxt-link :to="$i18n.path('apps/'+ item.appid)" style="text-decoration: none;color: #000">
                    <h3>
                      {{ item.title }}
                    </h3>
                    <h4>
                      {{ $t("Today's peak") }}: {{ item.total }}
                    </h4>
                  </nuxt-link>
                </v-flex>
              </v-layout>
            </v-card-title>
          </v-card>
        </v-hover>
      </v-flex>
    </v-layout>
  </v-flex>
</template>

<style lang="stylus" scoped>
  .v-image__image--preload {
    filter: blur(0);
  }

  .card-right-attention-icon {
    display: none;
  }

  .game-list-card {
    :hover {
      .card-right-icon {
        display: none;
      }

      .card-right-attention-icon {
        display: inline;
      }
    }
  }

  .v-menu__content {
    box-shadow: none;
  }

  @media (max-width: 960px) {
    .card-right-attention-icon {
      display: inline;
    }

    .card-right-icon {
      display: none;
    }
  }
</style>




<script>
import _ from 'lodash'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)

export default {
  props: ['list'],
  data () {
    return {
      dialogAttention: false
    }
  },
  methods: {
    cardTo: function (id) {
      this.$router.push({ path: this.$i18n.path('apps/' + id) })
    }
  },
  watch: {
    dialogAttention (val) {
      if (!val) return
      setTimeout(() => (this.dialogAttention = false), 1000)
    }
  },
  filters: {}
}
</script>