<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>ienage.com</span>
        <span class="font-weight-light">COUNT UP</span>
      </v-toolbar-title>
      <div class="flex-grow-1"></div>
      <v-dialog
        v-model="dialogRule"
        width="500"
      >
        <template v-slot:activator="{ on }">
          <v-btn text v-on="on">ルール説明</v-btn>
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
      <v-dialog
        v-model="dialogConfig"
        width="500"
      >
        <template v-slot:activator="{ on }">
          <v-btn text v-on="on">設定</v-btn>
        </template>
        <v-card>
          <v-card-title
            class="headline grey lighten-2"
            primary-title
          >
            設定
          </v-card-title>
          <v-card-text>

            <v-radio-group v-model="bullConfig" :mandatory="false">
              <v-radio :disabled=!!(history.length) label="セパレートブル(アウター25点、インナー50点)" value="separate"></v-radio>
              <v-radio :disabled=!!(history.length) label="ファットブル(アウター50点、インナー50点)" value="fat"></v-radio>
            </v-radio-group>
            <p v-show="gameOngoing">ゲーム開始後は変更できません</p>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-app-bar>

    <v-content>
      <v-layout>
        <v-row>
          <v-col cols="12" md="6">
            <dart-board
              @clicked="clicked"
              :bullConfig="bullConfig"
            />
          </v-col>
          <v-col cols="12" md="6">
            <score-board
              :history="history"
              :over="over"
              @deleteLastHistory="deleteLastHistory"
              @resetHistory="resetHistory"
            />
          </v-col>
        </v-row>
      </v-layout>
      <div class="footer">
      <v-footer>
        <v-col
          class="text-center"
          cols="12"
        >
          {{ new Date().getFullYear() }} — <a href="https://twitter.com/nek180"><strong>Nekoyashiki</strong></a>
        </v-col>
      </v-footer>
      </div>
    </v-content>
  </v-app>
</template>

<script>
  import DartBoard from './components/DartBoard.vue'
  import ScoreBoard from './components/ScoreBoard.vue'
  import Footer from './components/Footer.vue'

export default {
  name: 'App',
  components: {
    DartBoard,
    ScoreBoard,
    Footer,
  },
  data: () => ({
    history: [],
    gameOngoing: false,
    over: false,
    // あとでdialogRuleに帰る
    dialogRule: false,
    dialogConfig: false,
    bullConfig: "separate"
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
    isOver () {
      if (this.history.length >= 24) {
        alert("over!")
        this.over = true
        return true
      } else {
        this.over = false
        return false
      }
    },
    isGameOngoing () {
      if (this.history.length > 0 && this.history.length < 24) {
        return true
      } else {
        return false
      }
    }
  },
  watch: {
    history: function (newVal, oldVal) {
      this.gameOngoing = this.isGameOngoing()
    }
  }
};
</script>

<style>
.footer {
  color: black;
}
</style>