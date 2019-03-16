<template>
  <v-layout 
    align-center 
    justify-center 
    class="white--text">
    <v-img
      :aspect-ratio="16/9"
      src="https://i.loli.net/2018/11/15/5bed603019f22.png"
      height="100vh"
      gradient="to top left, rgba(0,0,0,.7), rgba(67,67,67,.7)"
    >
      <v-layout 
        align-space-between 
        justify-space-between 
        fill-height 
        column>
        <div/>
        <div>
          <v-item-group>
            <v-container grid-list-md>
              <h2 class="text-xs-left headline">
                <v-icon 
                  large 
                  color="accent">fas fa-glass-cheers</v-icon>特别推荐
              </h2>
              <v-layout 
                wrap 
                class="mt-3">
                <v-flex 
                  v-for="n in 3" 
                  :key="n" 
                  xs12 
                  md4>
                  <v-item>
                    <v-card
                      slot-scope="{ active, toggle }"
                      :color="active ? 'secondary' : 'primary'"
                      :class="{ 'scale-1-1': n === 2, 'z-index-2': n === 2 }"
                      :to="game[n - 1].appid"
                      class="d-flex align-center"
                      dark
                      height="300"
                      @click="toggle"
                    >
                      <v-scroll-y-transition>
                        <v-img
                          :aspect-ratio="16/9"
                          :src="game[n - 1].img"
                          gradient="to top right, rgba(0,0,0,.5), rgba(67,67,67,.5)"
                          height="300"
                        >
                          <v-layout 
                            wrap 
                            column 
                            fill-height 
                            justify-center 
                            align-center>
                            <div class="gradient-border pa-3">
                              <span :class="{ 'display-2': n === 2 }">{{ game[n - 1].name }}</span>
                            </div>
                            <div 
                              v-if="n === 2" 
                              class="py-2">EPICDATA: 不玩吃亏</div>
                          </v-layout>
                        </v-img>
                      </v-scroll-y-transition>
                    </v-card>
                  </v-item>
                </v-flex>
              </v-layout>
            </v-container>
          </v-item-group>
        </div>
        <div>
          <v-sheet 
            v-if="hot_games" 
            class="mx-auto hidden-md-and-down secondary" 
            max-width="1400">
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
        </div>
      </v-layout>
    </v-img>
  </v-layout>
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
.scale-1-1 {
  transform: scale(1.1);
}
.z-index-2 {
  z-index: 2;
}
.gradient-border {
  --borderWidth: 3px;
  background: #1d1f20;
  position: relative;
  border-radius: var(--borderWidth);
}
.gradient-border:after {
  content: '';
  position: absolute;
  top: calc(-1 * var(--borderWidth));
  left: calc(-1 * var(--borderWidth));
  height: calc(100% + var(--borderWidth) * 2);
  width: calc(100% + var(--borderWidth) * 2);
  background: linear-gradient(
    60deg,
    #f79533,
    #f37055,
    #ef4e7b,
    #a166ab,
    #5073b8,
    #1098ad,
    #07b39b,
    #6fba82
  );
  border-radius: calc(2 * var(--borderWidth));
  z-index: -1;
  animation: animatedgradient 5s ease alternate infinite;
  background-size: 300% 300%;
}
@keyframes animatedgradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
</style>
