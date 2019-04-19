<template>
  <v-sheet 
    v-if="hot_games" 
    class="mx-auto hidden-md-and-down secondary">
    <v-slide-group multiple>
      <v-slide-item 
        v-for="(item, n) in hot_games.data" 
        :key="n">
        <v-flex 
          slot-scope="{ active }" 
          :input-value="active" 
          xs12 
          sm6 
          md3 
          xl2>
          <popularWithSmallCard 
            v-if="item" 
            :popular.sync="item" 
            :truncate="true"/>
        </v-flex>
      </v-slide-item>
    </v-slide-group>
  </v-sheet>
</template>

<script>
import popularWithSmallCard from '~/components/card/trending/popular'

export default {
  components: {
    popularWithSmallCard
  },
  data() {
    return {
      hot_games: null,
      slide: {
        active: 1
      },
      game: [
        {
          appid: '646570',
          name: '杀戮尖塔',
          img:
            'https://cdna.artstation.com/p/assets/images/images/008/984/116/large/lysander-xonora-slay-the-spire-wallpaper.jpg?1516473520'
        },
        {
          appid: '294100',
          name: '边缘世界',
          img:
            'https://cdna.artstation.com/p/assets/images/images/010/469/760/large/vadim-sadovski-rimworld.jpg?1524598927'
        },
        {
          appid: '255710',
          name: '城市：天际线',
          img:
            'https://cdna.artstation.com/p/assets/images/images/008/405/610/large/5518-studios-screen-shot-2017-12-06-at-1-23-23-pm.jpg?1512555855'
        }
      ]
    }
  },
  async mounted() {
    const hot_games = await this.$axios.$get(
      `https://v3.steamhub.cn/api/v3/game/hot?order=desc&order_field=created_at&length=16&simple_paginate=1`
    )
    this.hot_games = hot_games
  }
}
</script>

<style>
.v-slide-group__prev {
  display: none;
}
</style>
