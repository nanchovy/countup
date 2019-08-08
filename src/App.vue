<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>おうちでダーツ</span>
        <span class="font-weight-light">COUNT UP</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        text
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
      >
        <span class="mr-2">Latest Release</span>
      </v-btn>
    </v-app-bar>

    <v-content>
      <dart-board
        @clicked="clicked"
      />
      <score-board
        :history="history"
        @deleteLastHistory="deleteLastHistory"
      />

    </v-content>
  </v-app>
</template>

<script>
  import DartBoard from './components/DartBoard.vue'
  import ScoreBoard from './components/ScoreBoard.vue'

export default {
  name: 'App',
  components: {
    DartBoard,
    ScoreBoard
  },
  data: () => ({
    history: [],
    gameOngoing: false
  }),
  methods: {
    clicked (number, times) {
      this.history.push({ score: number*times })
      this.history[this.history.length-1]["order"] = this.history.length
    },
    deleteLastHistory () {
      this.history.pop()
    }
  }
};
</script>
