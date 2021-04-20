function main()
{
  var data = document.forms["form"];
  var string = data["String"].value;

  //var nfa = new NFA(data["states"].value.split(","), data["Alphabets"].value.split(","), data["FinalStates"].value.split(","), data["Transitions"].value.split("\n"));
  var nfa = new NFA();
  var dfa = new DFA(data["states"].value.split(","), data["Alphabets"].value.split(","), data["FinalStates"].value.split(","), data["Transitions"].value.split("\n"));
  
  if(document.getElementById("IsAcceptedByDFA").checked)
  {
    alert(dfa.IsAcceptedByDFA(string));
  }

  else if(document.getElementById("MakeSimpleDFA").checked)
  {
    dfa.MakeSimpleDFA();
  }
  else if(document.getElementById("ShowSchematicDFA").checked)
  {
    dfa.ShowSchematic();
  }

  else if(document.getElementById("IsAcceptedByNFA").checked)
  {
    alert(nfa.isAcceptByNFA(string));
  }

  else if(document.getElementById("CreateEquivalenceDFA").checked)
  {
    nfa.createEquivalentDFA();
  }

  else if(document.getElementById("FindRegExp").checked)
  {
    alert(nfa.FindRegExp());
  }

  else if(document.getElementById("ShowSchematicNFA").checked)
  {
    nfa.ShowSchematic();
  }



}

