import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faTwitterSquare } from '@fortawesome/free-brands-svg-icons'

library.add(faTwitterSquare)
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    // iconfont: 'faSvg',
    iconfont: 'mdi'
  },
});
