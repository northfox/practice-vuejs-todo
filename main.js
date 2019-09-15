const STORAGE_KEY = 'todos-vuejs-demo'
const todoStorage = {
  fetch: () => {
    let todos = JSON.parse(
      localStorage.getItem(STORAGE_KEY) || '[]'
    )
    todos.forEach((todo, index) => {
      todo.id = index
    })
    todoStorage.uid = todos.length
    return todos
  },
  save: function(todos) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  }
}

new Vue({
  el: '#app',
  data: {
    todos: [],
    current: -1,
    options: [
      { value: -1, label: 'all' },
      { value: 0, label: 'doing' },
      { value: 1, label: 'done' }
    ]
  },
  
  methods: {
    doAdd: function(event, value) {
      console.log(this.$refs)
      let comment = this.$refs.comment
      if (!comment.value.length) {
        return
      }
      this.todos.push({
        id: todoStorage.uid++,
        comment: comment.value,
        state: 0
      })
      comment.value = ''
    },
    doChangeState: function(item) {
      item.state = item.state ? 0: 1
    },
    doRemove: function(item) {
      let index = this.todos.indexOf(item)
      this.todos.splice(index, 1)
    }
  },
  
  created() {
    this.todos = todoStorage.fetch()
  },
  
  watch: {
    todos: {
      handler: function(todos) {
        todoStorage.save(todos)
      },
      deep: true
    }
  },

  computed: {
    computedTodos: function() {
      console.log(this.todos)
      if (!this.todos) this.todos = []
      return this.todos.filter(function (el) {
        return this.current < 0 ? true : this.current === el.state
      }, this)
    },
    
    labels() {
      return this.options.reduce((a, b) => {
        return Object.assign(a, { [b.value]: b.label })
      })
    }
  }
})

