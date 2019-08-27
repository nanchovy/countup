<template>
  <div>
    <v-container>
      <v-layout>
        <div class="score_display">
          {{ history.reduce((sum, dart) => sum + dart.score, 0) }}
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
        <div v-show="over" class="over">OVER</div>
        <div v-show="!over" class="nOfThrow">{{ this.history.length + 1 }}投目</div>
      </v-layout>
      <v-layout>
        <v-simple-table dense>
          <thead>
            <tr>
              <th class="text-left">投目</th>
              <th class="text-left">点数</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="dart in history" v-bind:key="dart.order">
              <td>{{ dart.order }}</td>
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
    hiddenDialog() {
      this.dialog = false
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

