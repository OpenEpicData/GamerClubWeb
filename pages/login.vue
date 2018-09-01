<template>
    <LoginDialog :LoginDialog.sync="LoginDialog"></LoginDialog>
</template>

<script>
  import LoginDialog from '~/components/Login/Dialog'

  export default {
    components: {
      LoginDialog
    },
    data: () => ({
      LoginDialog: true
    })
  }
</script>

