function main()
{
  var data = document.forms["form"];
  var string = data["String"].value;
  var nfa = new NFA(data["states"].value.split(","), data["alphabet"].value.split(","), data["FinalStates"].value.split(","), data["GrammerRules"].value.split("\n"));
  
  
  if(document.getElementById("IsAcceptedByDFA").checked)
  {
    alert(nfa.IsAcceptedByDFA(string));
  }

  else if(document.getElementById("MakeSimpleDFA").checked)
  {
    nfa.MakeSimpleDFA();
  }
  else if(document.getElementById("ShowSchematicDFA").checked)
  {
    nfa.ShowSchematic();
  }

  else if(document.getElementById("IsAcceptedByNFA").checked)
  {
    alert(nfa.IsAcceptedByNFA(string));
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

