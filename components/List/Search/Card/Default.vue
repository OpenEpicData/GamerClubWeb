<template>
  <div>
    <v-layout wrap row v-if="result">
      <v-flex xs12 md8 v-for="(item,i) in result.data" :key="i" class="search-list-card">
        <v-hover>
          <v-card slot-scope="{ hover }" :class="`elevation-${hover ? 12 : 0}`" v-if="item.AppType" flat class="grey lighten-4" height="18vh">
            <div>
              <v-card-title primary-title class="grey lighten-4">
                <v-layout align-start justify-start row fill-height>
                  <v-flex>
                    <nuxt-link :to="$i18n.path('apps/'+ item.AppID)" style="color: #000">
                      <h3 class="mb-0 display-1">
                        <span v-if="item.Name && item.ChineseName && language === 'zh-cn'">
                          {{ item.ChineseName }}
                        </span>
                        <span v-else-if="item.Name">{{ item.Name }}</span>
                      </h3>
                    </nuxt-link>
                    <!-- <ve-line :data="chartData[i]" :legend-visible="false"></ve-line> -->
                    <div>
                      <span v-for="(item, i) in item.app_info" :key="i">
                        <span v-if="item.Key === 117">{{ $t('Supported system') }}：{{ item.Value }}</span>
                      </span>
                    </div>

                    <span class="grey--text">{{ $t('Updated on') }}: {{ time(item.LastUpdated) }}</span>
                  </v-flex>
                  <v-flex flexbox class="text-xs-right" v-if="item.AppType">
                    <v-btn class="card-right-attention-icon" small color="g-blue-hydrogen" dark>
                      <v-icon left>
                        add
                      </v-icon>
                      {{ $t('attention') }}
                    </v-btn>
                  </v-flex>
                </v-layout>
              </v-card-title>
            </div>
          </v-card>
        </v-hover>
      </v-flex>
      <v-pagination v-model="result.current_page" :length=result.last_page></v-pagination>
    </v-layout>
  </div>
</template>

<script>
export default {
  props: ['result'],
  data: () => ({
    time: Number
  })
}
</script>

<style>
  .card-right-attention-icon {
    display: none;
  }

  .search-list-card :hover .card-right-icon {
    display: none;
  }

  .search-list-card :hover .card-right-attention-icon {
    display: inline;
  }

  .v-image__image--preload {
    filter: blur(0)
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