import Vuex from 'vuex'
import {createStore} from 'vuex'
import todos from './modules/todos'


//Load Vuex
// Vue.use(Vuex)

//Create Store
export const store = createStore({
    modules: {
        todos
    }
});