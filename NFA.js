class NFA {
  constructor() {
    this.states = ["q0", "q1", "q2", "q3", "q4"]
    this.initialState = this.states[0]
    this.alphabets = ["a", "b"]
    this.numberOfEdges = 6
    this.edges = [{ from: "q0", to: "q1", label: "a" }, { from: "q0", to: "q1", label: "a" }, { from: "q0", to: "q1", label: "a" }]
  }
  isAcceptByNFA(inputString) {
    console.log(this.states)
  }
  createEquivalentDFA() {

  }
}

function buildDotData(transitions, initialState, finalStates) {
  let res = `digraph {
    node [shape=circle fontsize=30]
    edge [length=200, color=gray, fontcolor=black]`
  transitions.forEach(element => {
    element = element.split(",")
    let from = element[0]
    let to = element[1]
    let label = element[2]
    if (label == "") {
      label = "lambda"
    }
    res += `
      ${from} -> ${to}[label=${label}]`
  });
  if (finalStates[0] != "") {
    finalStates.forEach(element => {
      res += `
        ${element} [
          label=${element},
          shape="doublecircle",
          color="#ff0000",
        ]`
    });
  }

  res += `
  }`
  return res
}


function draw() {
  let states = document.getElementById("States").value
  states = states.split(",")
  let initialState = states[0]
  let alphabets = document.getElementById("Alphabet").value
  alphabets = alphabets.split(",")
  let finalStates = document.getElementById("FinalStates").value
  finalStates = finalStates.split(",")
  let numberOfTransitions = document.getElementById("NumberOfRules").value
  let transitions = document.getElementById("GrammerRules").value
  transitions = transitions.split("\n")


  let dotData = buildDotData(transitions, initialState, finalStates)
  let container = document.getElementById("graphContainer")
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
  };
  let network = new vis.Network(container, data, options)

}
