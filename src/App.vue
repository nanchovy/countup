<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>おうちでダーツ</span>
        <span class="font-weight-light">COUNT UP</span>
      </v-toolbar-title>
      <v-btn
        text
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
      >
        <span class="mr-2">Latest Release</span>
      </v-btn>
    </v-app-bar>

    <v-content>
      <v-layout>
      <dart-board
        @clicked="clicked"
      />
      <score-board
        :history="history"
        :over="over"
        @deleteLastHistory="deleteLastHistory"
        @resetHistory="resetHistory"
      />
      </v-layout>
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
    gameOngoing: true,
    over: false
  }),
  methods: {
    clicked (number, times) {
      if (this.history.length >= 24) return
      this.history.push({ score: number*times })
      this.history[this.history.length-1]["order"] = this.history.length
      this.isOver()
    },
    deleteLastHistory () {
      this.history.pop()
      this.isOver()
    },
    resetHistory () {
      this.history = []
      this.over = false
    },
    isOver() {
      if (this.history.length >= 24) {
        alert("over!")
        this.over = true
        return true
      } else {
        this.over = false
        return false
      }
    }
  }
};
</script>
