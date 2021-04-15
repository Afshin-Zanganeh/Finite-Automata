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
  }

  isAccept(inputString, currentState, charPos) {
    if (charPos == inputString.length){
      if(this.graph[currentState].isFinal){
        return true
      }else{
        return false
      }
    }
    let acceptFlag = false
    let nextStates = []
    let char = inputString[charPos]
    this.graph[currentState].adjs.forEach(element => {
      if (element[1] == char || element[1] == "lambda") {
        nextStates.push(element)
      }
    });
    if (nextStates.length == 0) {
      return false
    }
    nextStates.forEach(element => {
      if (element[1] == "lambda") {
        acceptFlag = acceptFlag || this.isAccept(inputString, element[0], charPos)
      }else{
        acceptFlag = acceptFlag || this.isAccept(inputString, element[0], charPos+1)
      }
    });
    return acceptFlag
  }

  isAcceptByNFA(inputString) {
    if (inputString == "lambda") {
      return this.graph[this.initialState].isFinal
    }
    return this.isAccept(inputString, this.initialState, 0)
  }

  createEquivalentDFA() {

  }

  findRegExp() {

  }

  showSchematicNFA() {

  }

}
