class NFA {
  constructor() {
    this.states = document.getElementById("States").value.split(",").map(item => item.trim())
    this.initialState = this.states[0]
    this.alphabets = document.getElementById("Alphabets").value.split(",").map(item => item.trim())
    this.finalStates = document.getElementById("FinalStates").value.split(",").map(item => item.trim())
    this.numberOfTransitions = document.getElementById("NumberOfRules").value
    this.transitions = document.getElementById("Transitions").value.split("\n")
    this.createGraph()
  }

  createGraph() {
    this.graph = {}
    for (let i = 0; i < this.states.length; i++) {
      const element = this.states[i];
      this.graph[element] = { isFinal: false, adjs: [] }
    }
    for (let i = 0; i < this.finalStates.length; i++) {
      const element = this.finalStates[i];
      this.graph[element].isFinal = true
    }
    for (let i = 0; i < this.numberOfTransitions; i++) {
      const element = this.transitions[i].split(",").map(item => item.trim());
      let from = element[0]
      let to = element[1]
      let label = element[2]
      if (label == "") {
        label = "lambda"
      }
      this.graph[from].adjs.push([to, label])
    }
    console.log(this.graph)
  }

  isAcceptByNFA(inputString) {
    for (let index = 0; index < inputString.length; index++) {
      const element = inputString[index];

    }
  }

  createEquivalentDFA() {

  }

  findRegExp() {

  }

  showSchematicNFA() {

  }

}
