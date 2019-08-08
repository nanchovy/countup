<template>
    <div>
        <!--{{ history }}-->
        {{ history.reduce((sum, dart) => sum + dart.score, 0) }}
        <v-btn color="warning" @click="this.deleteLastHistory">undo</v-btn>
        <v-simple-table>
            <thead>
            <tr>
                <th class="text-left">投目</th>
                <th class="text-left">点数</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="dart in history">
                <td>{{ dart.order }}</td>
                <td>{{ dart.score }}</td>
            </tr>
            </tbody>
        </v-simple-table>
    </div>
</template>

<script>
    export default {
        data: () => ({
            totalScore: 0
        }),
        props: {
            history: {
                type: Array,
                required: true
            }
        },
        methods: {
            deleteLastHistory () {
                this.$emit('deleteLastHistory')
            }
        }
    }
</script>

