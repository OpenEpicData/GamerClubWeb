<template>
  <div class="container" style="padding-top: 150px">
    <h1 v-if="error.statusCode === 404">{{ $t('Page does not exist') }}</h1>
    <h1 v-else>{{ $t('Application error exception') }}</h1>
    <nuxt-link :to="$i18n.path('')">{{ $t('Homepage') }}</nuxt-link>
  </div>
</template>

<script>
export default {
  props: ['error'],
}
</script>