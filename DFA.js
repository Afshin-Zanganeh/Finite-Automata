class DFA
{
  constructor(states,alphabet,final_states,grammer)
  {
    debugger;
    this.states = states;
    this.alphabet = alphabet;
    this.final_states = final_states;
    this.grammer = grammer;
    this.graph = this.CreateGraph();
  }

  CreateGraph()
  {
    var graph = {};
    for(var x in this.grammer)
    {
      var rule = this.grammer[x].split(",")
      if(this.final_states.includes(rule[1]))
      {
        try
        {
          graph[rule[0]].push([rule[1],rule[2],1]);
        }
        catch(err)
        {
          graph[rule[0]] =[ [rule[1],rule[2],1] ];
        }
      }
      else
      {
        try
        {
          graph[rule[0]].push([rule[1],rule[2],0]);
        }
        catch(err)
        {
          graph[rule[0]] =[ [rule[1],rule[2],0] ];
        }
      }
    }
    return graph;
  }

  IsAcceptedByDFA(string)
  {
    var current_state = this.states[0];
    for (var i in string)
    {
      var flag = false;
      var ways = this.graph[current_state];
      for(var j in ways)
      {
        if(string[i] == ways[j][1])
        {
          flag = true;
          current_state = ways[j][0];
          break;
        }
      }
    }

    if(flag == true)
    {
      return true;
    }

    return false
  }

  MakeSimpleDFA()
  {
    return true
  }

  ShowSchematicDFA()
  {
    draw();
  }

}
