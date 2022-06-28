import axios from "axios";

const state = {
    todos: [
        {
            id: 1,
            title: 'Todo One'
        },
        {
            id: 2,
            title: 'Todo Two'
        }
    ]
};

const getters = {
    allTodos: (state) => state.todos
};

const actions = {
    async fetchTodos({commit}){
        const res = await axios.get('https://jsonplaceholder.typicode.com/todos');
        // console.log(res.data)
        commit('setTodos', res.data) 
    } ,
    async addTodo({commit}, title){
        const res = await axios.post('https://jsonplaceholder.typicode.com/todos', {
            title,
            completed: false
        });
        commit('newTodo', res.data)
    },
    async deleteTodo({commit}, id){
        await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
        commit('removeTodo', id)
    },
    async filterTodos({commit}, e){
        // const val = parseInt(
        //     e.target.options[e.target.options.selectedIndex].innerText
        //   );
        //Alternative:
        const val = e.target.value
        const res = await axios.get(`https://jsonplaceholder.typicode.com/todos/?_limit=${val}`)
        commit('filterNumber', res.data)
    },
    async updateTodo({commit}, updTodo){
        const res = await axios.put(`https://jsonplaceholder.typicode.com/todos/${updTodo.id}`, updTodo)
        const newOb = await res.data
        commit('updTodo', newOb);
    }
};

const mutations = {
    setTodos: (state, todos) => state.todos = todos,
    newTodo: (state, todo) => state.todos.unshift(todo),
    removeTodo: (state, id) => state.todos = state.todos.filter((todo) => todo.id!==id),
    filterNumber: (state, todos) => state.todos = todos,
    updTodo: (state, newOb) => {
        const index = state.todos.findIndex(todo => todo.id == newOb.id)
        if (index !== -1) {
            state.todos.splice(index, 1, newOb);
        }
    }
};

export default{
    state,
    getters,
    actions,
    mutations
}