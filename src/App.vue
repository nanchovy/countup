<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>おうちでダーツ</span>
        <span class="font-weight-light">COUNT UP</span>
      </v-toolbar-title>
      <div class="flex-grow-1"></div>
      <v-dialog
        v-model="dialog"
        width="500"
      >
        <template v-slot:activator="{ on }">
          <v-btn v-on="on">ルール説明</v-btn>
        </template>
        <v-card>
          <v-card-title
            class="headline grey lighten-2"
            primary-title
          >
            ルール説明
          </v-card-title>
          <v-card-text>
            1ラウンド3投で8ラウンド、計24投のスコアで競います。
            刺さった場所をクリックするとスコアに加算されます。
          </v-card-text>
        </v-card>
      </v-dialog>
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
    over: false,
    dialog: false
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
