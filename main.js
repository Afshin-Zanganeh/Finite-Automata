function main()
{
  var data = document.forms["form"];
  var string = data["String"].value;
  var dfa = new DFA(data["states"].value.split(","), data["alphabet"].value.split(","), data["FinalStates"].value.split(","), data["GrammerRules"].value.split("\n"));
  draw()
  // console.log(dfa.graph);
  // alert(dfa.states);
  // alert(dfa.IsAcceptedByDFA(string));
  
}

