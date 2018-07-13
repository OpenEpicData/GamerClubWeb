<template>
  <div style="background: url(/preview.jpg) 0 0 repeat;">
    <v-container fluid hidden-sm-and-down class="index-main-container" style="padding-top: 150px">
      <v-layout row wrap class="pb-5">
        <v-flex xs10>
          <div class="text-xs-left">
            <h1 class="display-2 font-weight-bold orange--text">{{ headerText.title }}</h1>
            <h3 class="mt-3 font-weight-regular amber--text">
              {{ headerText.descript }}
            </h3>
          </div>
        </v-flex>
        <v-flex xs2>
          <div class="text-xs-right">
            <v-btn large color="orange" round dark :loading="dialogHeader" @click.stop="dialogHeader = true">
              {{ headerText.button }}</v-btn>
          </div>
        </v-flex>
        <v-dialog v-model="dialogHeader" hide-overlay persistent width="300">
          <v-card color="primary" dark>
            <v-card-text>
              {{ headerText.dialog.text }}
              <v-progress-linear indeterminate color="white" class="mb-0" :height="headerText.dialog.progressBar.height"></v-progress-linear>
            </v-card-text>
          </v-card>
        </v-dialog>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
  export default {
    props: ['headerText'],
    data: () => ({
      dialogHeader: false
    }),
    watch: {
      dialogHeader (val) {
        if (!val) return
        setTimeout(() => (this.dialogHeader = false), 1000)
      }
    }
  }
</script>