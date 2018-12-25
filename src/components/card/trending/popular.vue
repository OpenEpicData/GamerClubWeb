<template>
  <v-card
    height="160px"
    class="text-xs-left"
    :href="`https://store.steampowered.com/app/${popular.AppID}`"
    target="_blank"
  >
    <div>
      <v-img
        :src="`https://cdn.steamstatic.com.8686c.com/steam/apps/${popular.AppID}/header.jpg`"
        height="160px"
      >
        <v-layout
          align-start
          justify-space-between
          column
          fill-height
        >
          <div class="text-xs-right">
            <v-chip
              small
              class="grey lighten-2"
            >
              <v-avatar>
                <v-icon small>
                  fas fa-users
                </v-icon>
              </v-avatar>
              当前在线: {{ popular.Now }}
            </v-chip>
          </div>
        </v-layout>
      </v-img>
    </div>
    <div>
      <v-layout
        align-start
        justify-start
        row
        style="margin: 0 5px;"
      >
        <div>
          <h4 class="body-2 font-weight-bold">
            {{ popular.Title }}
          </h4>
          <h5 class="caption">
            {{ popular.LastUpdated }}
          </h5>
        </div>
      </v-layout>
    </div>
  </v-card>
</template>

<script>
export default {
  props: {
    popular: {
      type: null,
      default: null,
      required: true
    },
  }
}
</script>
