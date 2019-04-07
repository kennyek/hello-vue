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

  async deleteTodo({ commit }, id) {
    await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);

    commit('removeTodo', id);
  },

  async filterTodos({ commit }, event) {
    const selectValue = event.target.value;
    const limit = Number(selectValue);

    const response = await axios.get(`https://jsonplaceholder.typicode.com/todos?_limit=${limit}`);

    commit('setTodos', response.data);
  },

  async updateTodo({ commit }, updatedTodo) {
    const response = await axios.put(
      `https://jsonplaceholder.typicode.com/todos/${updatedTodo.id}`,
      updatedTodo,
    );

    commit('updateTodo', response.data);
  },
};

const mutations = {
  setTodos: (passedState, todos) => {
    passedState.todos = todos;
  },
  newTodo: (passedState, todo) => {
    passedState.todos.unshift(todo);
  },
  removeTodo: (passedState, id) => {
    passedState.todos = passedState.todos.filter(todo => todo.id !== id);
  },
  filterTodos: (passedState, todos) => {
    passedState.todos = todos;
  },
  updateTodo: (passedState, updatedTodo) => {
    const index = passedState.todos.findIndex(todo => todo.id === updatedTodo.id);

    if (index !== -1) {
      passedState.todos.splice(index, 1, updatedTodo);
    }
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
