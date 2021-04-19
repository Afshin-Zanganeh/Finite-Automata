function main() {
  let states = document.getElementById("States").value.split(",").map(item => item.trim())
  let alphabets = document.getElementById("Alphabets").value.split(",").map(item => item.trim())
  let finalStates = document.getElementById("FinalStates").value.split(",").map(item => item.trim())
  let numberOfTransitions = document.getElementById("NumberOfRules").value
  let transitions = document.getElementById("Transitions").value.split("\n")
  let string = document.getElementById("String").value

  let nfa = new NFA(states, alphabets, finalStates, transitions, numberOfTransitions);
  let dfa = new DFA(states, alphabets, finalStates, transitions, numberOfTransitions);

  if (document.getElementById("IsAcceptedByDFA").checked) {
    alert(dfa.IsAcceptedByDFA(string));
  }

  else if (document.getElementById("MakeSimpleDFA").checked) {
    dfa.MakeSimpleDFA();
  }
  else if (document.getElementById("ShowSchematicDFA").checked) {
    dfa.showSchematicDFA(transitions, states[0], finalStates, "graphContainer")
  }

  else if (document.getElementById("IsAcceptedByNFA").checked) {
    alert(nfa.isAcceptByNFA(string));
  }

  else if (document.getElementById("CreateEquivalenceDFA").checked) {
    nfa.createEquivalentDFA();
  }

  else if (document.getElementById("FindRegExp").checked) {
    alert(nfa.FindRegExp());
  }

  else if (document.getElementById("ShowSchematicNFA").checked) {
    nfa.showSchematicNFA(transitions, states[0], finalStates, "graphContainer")
  }



}

