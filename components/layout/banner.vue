<template>
  <v-banner 
    :class="banner.class" 
    single-line 
    tile 
    style="margin-top: 64px">
    {{ banner.content }}
    <template #actions>
      <v-btn 
        :href="banner.action.href" 
        text 
        outlined 
        target="_black">{{ banner.action.content }}</v-btn>
    </template>
  </v-banner>
</template>

<script>
export default {
  props: {
    banner: {
      type: Object,
      default: Object,
      required: true
    }
  }
}
</script>
