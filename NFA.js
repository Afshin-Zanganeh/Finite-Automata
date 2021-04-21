class NFA {

  constructor(states, alphabets, finalStates, transitions, numberOfTransitions) {
    this.states = states
    this.initialState = this.states[0]
    this.alphabets = alphabets
    this.finalStates = finalStates
    this.numberOfTransitions = numberOfTransitions
    this.transitions = transitions
    this.createGraph()
    // console.log(this.graph)
  }

  createGraph() {
    this.graph = {}
    this.states.forEach(state => {
      this.graph[state] = { isFinal: false, adjs: [] }
    })
    this.finalStates.forEach(finalState => {
      this.graph[finalState].isFinal = true
    })
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
    if (charPos == inputString.length) {
      if (this.graph[currentState].isFinal) {
        return true
      } else {
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
      } else {
        acceptFlag = acceptFlag || this.isAccept(inputString, element[0], charPos + 1)
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




  deltaStar(currentState, char) {
    if (currentState == "") {
      return [""]
    }
    let nextStates = []
    let nextLambdaStates = []
    this.graph[currentState].adjs.forEach(element => {
      if (element[1] == char) {
        nextStates.push(element[0])
      }
      if (element[1] == "lambda") {
        nextLambdaStates.push(element[0])
      }
    })
    nextStates = new Set(nextStates)
    nextLambdaStates.forEach(nextLambdaState => {
      nextStates = new Set([...nextStates].concat(this.deltaStar(nextLambdaState, char)))
    })
    nextStates.forEach(nextState => {
      nextStates = new Set([...nextStates].concat(this.deltaStar(nextState, "lambda")))
    })
    return [...nextStates]
  }

  createEquivalentDFA() {
    this.graphDFA = {}
    this.initialStateDFA = this.initialState
    let queue = []
    queue.push(this.initialStateDFA)
    while (queue.length != 0) {
      let currentStates = queue.pop()
      this.graphDFA[currentStates] = { "isFinal": false, "adjs": [] }
      currentStates = currentStates.split(" ")
      this.alphabets.forEach(alphabet => {
        let nextStates = []
        currentStates.forEach(currentState => {
          let reachableStates = this.deltaStar(currentState, alphabet)
          reachableStates.forEach(reachableState => {
            if (!nextStates.includes(reachableState)) {
              nextStates.push(reachableState)
            }
          })
        })
        nextStates = nextStates.sort().join(" ")
        this.graphDFA[currentStates.join(" ")].adjs.push([nextStates, alphabet])
        if (!(nextStates in this.graphDFA)) {
          queue.push(nextStates)
        }
      })
    }
    this.transitionsDFA = []
    for (const [ key, value ] of Object.entries(this.graphDFA)) {
      this.graphDFA[key].adjs.forEach(element => {
        this.transitionsDFA.push(`${key}, ${element[0]}, ${element[1]}`)
      })
    }
    this.finalStatesDFA = new Set()
    this.finalStates.forEach(finalState => {
      for (const [ key, value ] of Object.entries(this.graphDFA)) {
        if (key.split(" ").includes(finalState)) {
          this.graphDFA[key].isFinal = true
          this.finalStatesDFA.add(key)
        }
      }
    })
    this.finalStatesDFA = [...this.finalStatesDFA]
    // console.log(this.transitionsDFA)
    // console.log(this.initialStateDFA)
    // console.log(this.finalStatesDFA)
    // console.log(this.graphDFA)
    this.showSchematicNFA(this.transitionsDFA, this.initialStateDFA, this.finalStatesDFA, "graphContainer")
  }

  buildDotData(transitions, initialState, finalStates) {
    let res = `digraph {
      node [shape=circle fontsize=25]
      edge [length=200, color=gray, fontcolor=black]`
    res += `
      hidden -> "${initialState}"[label=""]`
    transitions.forEach(element => {
      element = element.split(",").map(item => item.trim())
      let from = element[0]
      let to = element[1]
      let label = element[2]
      if (label == "") {
        label = "lambda"
      }
      res += `
        "${from}" -> "${to}"[label="${label}"]`
    });
    if (finalStates[0] != "") {
      finalStates.forEach(element => {
        res += `
          "${element}" [
            label="${element}",
            shape="doublecircle",
            color="#ff0000",
          ]`
      })
    }
    res += `
    hidden [
      shape="circle",
      color="#ffffff",
      opacity=0,
      font="1px solid white",
    ]`

    res += `
    }`
    return res
  }

  showSchematicNFA(transitions, initialState, finalStates, containerId) {
    let dotData = this.buildDotData(transitions, initialState, finalStates)
    let container = document.getElementById(containerId)
    let data = vis.parseDOTNetwork(dotData)
    let options = {
      nodes: {
        borderWidth: 2,
        size: 50,
        color: {
          border: "#000000",
          background: "#ffffff",
        },
        font: "1px arial black",
      },
    }
    let network = new vis.Network(container, data, options)
  }

}
>>>>>>> 50ddc5d99ae6a1e3efa99e9444be003f85b5cc17
