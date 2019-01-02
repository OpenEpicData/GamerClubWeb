<template>
  <VCard
    height="160px"
    class="text-xs-left"
    :href="`https://store.steampowered.com/app/${latest.AppID}`"
    target="_blank"
  >
    <div>
      <VImg
        :src="`https://cdn.steamstatic.com.8686c.com/steam/apps/${latest.AppID}/header.jpg`"
        height="160px"
      >
        <VLayout
          align-start
          justify-space-between
          column
          fill-height
        >
          <div class="text-xs-right">
            <VChip
              small
              class="grey lighten-2"
            >
              <span v-if="latest.app_price.length === 0 && latest.Free === 1">
                免费
              </span>
              <span v-else-if="latest.app_price[0]">
                ￥ {{ latest.app_price[0].PriceFinal / 100 }}
              </span>
              <span v-else>
                未知
              </span>
            </VChip>
          </div>
        </VLayout>
      </VImg>
    </div>
    <div>
      <VLayout
        align-start
        justify-start
        row
        style="margin: 0 5px;"
      >
        <div>
          <h4 class="body-2 font-weight-bold">
            {{ latest.Name }}
          </h4>
          <h5 class="caption">
            {{ latest.LastUpdated }}
          </h5>
        </div>
      </VLayout>
    </div>
  </VCard>
</template>

<script>
export default {
  props: {
    latest: {
      type: null,
      default: null,
      required: true
    },
  }
}
</script>
