<template>
  <v-app-bar 
    :color="appbar.background" 
     
    tabs 
    fixed>
    <v-toolbar-title>
      <h1>{{ appbar.title }}</h1>
    </v-toolbar-title>
    <v-toolbar-items class="ml-3">
      <v-btn 
        v-for="(item, k) in appbar.left.items" 
        :key="k" 
        :to="item.path" 
        text>{{ item.name }}</v-btn>
    </v-toolbar-items>
    <v-spacer/>
    <v-btn 
      v-for="(item, k) in appbar.right.items" 
      :key="k" 
      icon>
      <v-icon>{{ item.icon }}</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
export default {
  props: {
    appbar: {
      type: Object,
      default: Object,
      required: true
    }
  }
}
</script>
