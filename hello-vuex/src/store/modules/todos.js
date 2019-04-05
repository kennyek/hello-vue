import axios from 'axios';

const state = {
  todos: [],
};

const getters = {
  allTodos: passedState => passedState.todos,
};

const actions = {
  async fetchTodos({ commit }) {
    const response = await axios.get('https://jsonplaceholder.typicode.com/todos');
    commit('setTodos', response.data);
  },
  async addTodo({ commit }, title) {
    const response = await axios.post(
      'https://jsonplaceholder.typicode.com/todos',
      {
        title,
        completed: false,
      },
    );

    commit('newTodo', response.data);
  },
};

const mutations = {
  setTodos: (passedState, todos) => {
    passedState.todos = todos;
  },
  newTodo: (passedState, todo) => {
    passedState.todos.unshift(todo);
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
