<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>

export default {
  name: 'App',

  created() {
    this.$store.dispatch('theme/setThemeStyle', this.$store.getters['theme/theme'].primary);
  },
}
</script>
