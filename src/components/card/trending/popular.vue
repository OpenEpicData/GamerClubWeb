<template>
  <VCard
    height="160px"
    class="text-xs-left"
    :href="`https://store.steampowered.com/app/${popular.AppID}`"
    target="_blank"
  >
    <div>
      <VImg
        :src="`https://cdn.steamstatic.com.8686c.com/steam/apps/${popular.AppID}/header.jpg`"
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
              <VAvatar>
                <VIcon small>
                  fas fa-users
                </VIcon>
              </VAvatar>
              当前在线: {{ popular.Now }}
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
            {{ popular.Title }}
          </h4>
          <h5 class="caption">
            {{ popular.LastUpdated }}
          </h5>
        </div>
      </VLayout>
    </div>
  </VCard>
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
