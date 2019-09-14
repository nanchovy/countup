<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>ienage.com</span>
        <span class="font-weight-light">SHOOT OUT</span>
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
    </v-app-bar>

    <v-content>
      <v-layout>
        <v-row>
          <v-col cols="12" md="6">
            <dart-board
              @clicked="clicked"
              :bullConfig="bullConfig"
              :validAreaHitHistory="validAreaHitHistory"
            />
          </v-col>
          <v-col cols="12" md="6">
            <magnification-board
            :magnification="magnification"
            />
            <score-board
              @deleteLastHistory="deleteLastHistory"
              :history="history"
              :over="over"
            />
          </v-col>
        </v-row>
      </v-layout>
    </v-content>
  </v-app>
</template>

<script>
import DartBoard from '@/components/DartBoardForShootOut.vue'
import ScoreBoard from '@/components/ScoreBoard.vue'
import MagnificationBoard from '@/components/MagnificationBoard.vue'

export default {
  name: 'ShootOut',
  components: {
    DartBoard,
    ScoreBoard,
    MagnificationBoard,
  },
  data: () => ({
    dialogRule: false,
    history: [],
    validAreaHitHistory: [],
    dialogRule: false,
    magnification: 1,
    over: false,
    bullConfig: "separate"
  }),
  methods: {
    clicked (number, times) {
      if (this.history.length >= 24) return
      console.log(number)
      if (number !== 0 && this.isValidArea(number)) {
        // 有効エリアにhitした場合、
        // 点数を追加
        // 倍率を更新
        // VAHHにエリアを追加
        this.history.push({
          number: number,
          times: times,
          score: number*times*this.magnification,
        })
        this.magnification++
        this.validAreaHitHistory.push(number)
      } else {
        // 向こうエリアにhitした場合、
        // 0点を追加
        // VAHHに0を追加
        this.history.push({
          number: number,
          times: 0,
          score: 0,
        })
        this.validAreaHitHistory.push(0)
      }
      this.history[this.history.length-1]["order"] = this.history.length
      this.isOver()
    },
    isValidArea (number) {
      if (this.validAreaHitHistory.findIndex(area => area === number) === -1) {
        // 数字がすでに存在=>area無効
        // console.log("true")
        return true
      } else {
        // 数字が存在していない=>area有効
        // console.log("false")
        return false
      }
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
    isGameGoing () {
      if (this.history.length > 0 && this.history.length < 24) {
        return true
      } else {
        return false
      }
    },
    resetHistory () {
      this.history = []
      this.over = false
    },
    deleteLastHistory () {
      if (this.history.length <= 0) return
      var lastHistory = this.history.pop()
      if (lastHistory["times"] !== 0) {
        this.validAreaHitHistory = this.validAreaHitHistory.filter(n => n !== lastHistory["number"])
        this.magnification--
      } else {
        this.validAreaHitHistory.pop()
      }
    }
  },
  watch: {
    history: function (newVal, oldVal) {
      this.gameOnGoing = this.isGameGoing()
    }
  }
}
</script>

<style>

</style>