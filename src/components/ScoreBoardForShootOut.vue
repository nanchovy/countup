<template>
  <div>
    <v-container>
      <v-layout>
        <div class="score_display">
          {{ this.totalScore }}
        </div>
        <v-btn color="warning" @click="this.deleteLastHistory">undo</v-btn>
        <v-dialog
            v-model="dialog"
            width="500"
        >
          <template v-slot:activator="{ on }">
            <v-btn color="error" v-on="on">RESET</v-btn>
          </template>
          <v-card>
            <v-card-text>
              リセットしますか？
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <div class="flex-grow-1"></div>
              <v-btn
                color="primary"
                text
                @click="dialog = false"
              >キャンセル</v-btn>
              <v-btn
                color="primary"
                text
                @click="resetHistory()"
              ><b>リセット</b></v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-layout>
      <v-layout>
        <div v-show="over" class="over">OVER <a target="_blank" :href="tweetURL"><font-awesome-icon :icon="['fab', 'twitter-square']"/></a></div>
        <div v-show="!over" class="nOfThrow">{{ this.history.length + 1 }}投目</div>
      </v-layout>
      <v-layout>
        <v-simple-table dense>
          <thead>
            <tr>
              <th class="text-left">投目</th>
              <th class="text-left">素点</th>
              <th class="text-left">倍率</th>
              <th class="text-left">点数</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="dart in history" v-bind:key="dart.order">
              <td>{{ dart.order }}</td>
              <td>{{ dart.number * dart.times }}</td>
              <td>{{ dart.magnification }}</td>
              <td>{{ dart.score }}</td>
            </tr>
          </tbody>
        </v-simple-table>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
export default {
  data: () => ({
    totalScore: 0,
    tweetURL: '',
    dialog: false
  }),
  props: {
    history: {
      type: Array,
      required: true
    },
    over: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    deleteLastHistory () {
      this.$emit('deleteLastHistory')
    },
    resetHistory () {
      this.$emit('resetHistory')
      this.hiddenDialog()
    },
    hiddenDialog () {
      this.dialog = false
    },
    assembleTweetURL () {
      return (
        'https://twitter.com/intent/tweet?text=' +
        '%08%23%e3%81%8a%e3%81%86%e3%81%a1%e3%81%a7%e3%83%80%e3%83%bc%e3%83%84%0d%0a%e3%82%b2%e3%83%bc%e3%83%a0%3a%20%e3%82%ab%e3%82%a6%e3%83%b3%e3%83%88%e3%82%a2%e3%83%83%e3%83%97%0d%0a%e5%be%97%e7%82%b9%3a%20' + 
        this.history.reduce((sum, dart) => sum + dart.score, 0) +
        '%e7%82%b9%0d%0a' + 
        '&url=https://ienage.com'
      )
    }
  },
  watch: {
    over: function (newVal, oldVal) {
      this.tweetURL = this.assembleTweetURL()
      console.log("watch")
    },
    history: function (newVal, oldVal) {
      this.totalScore = this.history.reduce((sum, dart) => sum + dart.score, 0)
    }
  }
}
</script>

<style>
.score_display {
  font-size: 10rem;
  /* font-weight: bold; */
}
.nOfThrow {
  font-size: 3rem;
}
.over {
  color: red;
  font-size: 3rem;
}
</style>

