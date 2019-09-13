<template>
  <v-container>
    <div class="magnification_board">
      現在の倍率: ×{{ this.magnification }}
    </div>
  </v-container>
</template>

<script>
export default {
props: {
  magnification: {
    type: Number,
    required: false
  }
}
}
</script>

<style>
.magnification_board {
  font-size: 2rem;
}
</style>