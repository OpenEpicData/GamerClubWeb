<template>
  <div v-if="list">
    <div>
      <v-layout row wrap>
        <v-flex xs6 sm6 md4 lg3 :xl2="xl2" v-for="(item,i) in list" :key="i" class="game-list-card px-1">
          <div>
            <vs-card actionable class="black my-3">
              <v-layout align-space-between justify-space-between column fill-height>
                <v-flex slot="media">
                  <v-img style="cursor:pointer" :src="'https://cdn.steamstatic.com.8686c.com/steam/apps/' + item.AppID + '/header.jpg'" height="225px"
                    gradient="to top right, rgba(20,30,48,.33), rgba(36,59,85,.33)" :lazy-src="'/unknow.jpg'"
                    v-on:click="cardTo(item.AppID)">
                    <v-container fill-height fluid pt-0 pl-0>
                      <v-layout align-start justify-start row fill-height>
                        <v-flex xs12 flexbox class="text-xs-left cardTip">
                          <vs-button
                            v-if="topColor = i === 0 ? 'orange' : 'purple'"
                            :color="topColor"
                            gradient-color-secondary="red"
                            type="gradient"
                            size="large">
                            <h4>
                              <span>
                                TOP: {{ i + 1 }}
                              </span>
                              <span v-if="totalSwitch === 'totalToday'">
                                今日峰值: {{ item.Total }}
                              </span>
                              <span v-else-if="totalSwitch === 'totalWeek'">
                                本周峰值: {{ item.Total }}
                              </span>
                              <span v-else>
                                {{ $t('Currently online') }}: {{ item.Now }}
                              </span>
                            </h4>
                          </vs-button>
                        </v-flex>
                      </v-layout>
                    </v-container>
                  </v-img>
                </v-flex>
                <v-flex xs12 class="mx-1 mt-2 cardText">
                  <nuxt-link :to="$i18n.path('apps/'+ item.AppID)" style="text-decoration: none;color: #000">
                    <h3 class="title white--text" style="overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">
                      {{ item.Title }}
                    </h3>
                    <h5 class="grey--text text--lighten-1">
                      发生于: {{ item.Created }}
                    </h5>
                  </nuxt-link>
                </v-flex>
              </v-layout>
            </vs-card>
          </div>
        </v-flex>
      </v-layout>
    </div>
  </div>
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
  props: ['list', 'xl2', 'totalSwitch'],
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