function main()
{
  var data = document.forms["form"];
  var string = data["String"].value;
  var dfa = new DFA(data["states"].value.split(","), data["alphabet"].value.split(","), data["FinalStates"].value.split(","), data["GrammerRules"].value.split("\n"));
  dfa.ShowSchematic();
  // console.log(dfa.graph);
  // alert(dfa.states);
  // alert(dfa.IsAcceptedByDFA(string));
  
}
