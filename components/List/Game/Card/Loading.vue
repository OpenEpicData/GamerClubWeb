<template>
  <v-layout row wrap v-if="$store.state.display.loading">
    <v-flex xs12 sm6 md3 lg2 v-for="(item,i) in 6" :key="i" class="game-list-card px-2">
      <v-card flat class="grey lighten-4 my-3">
        <v-card-title primary-title>
          <v-layout row wrap>
            <v-flex xs12>
              <span class="grey--text">
                <v-progress-linear :indeterminate="true" background-color="transparent" color="g-purple-purplin" v-for="i in 2" :key="i"></v-progress-linear>
              </span>
            </v-flex>
          </v-layout>
        </v-card-title>
      </v-card>
    </v-flex>
  </v-layout>
</template>
