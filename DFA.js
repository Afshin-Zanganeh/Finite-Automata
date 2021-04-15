class DFA
{
  constructor(states,alphabets,final_states,transitions)
  {
    debugger;
    this.states = states;
    this.alphabets = alphabets;
    this.final_states = final_states;
    this.transitions = transitions;
    this.graph = this.CreateGraph();
  }

  CreateGraph()
  {
    var graph = {};
    for(var x in this.transitions)
    {
      var rule = this.transitions[x].split(",")
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
   var flag = true;
   var ways;
   for (var i in string)
   {
    // in each step flag should be true to be sure thst for each letter we have a way from current state to another state if we dont have DFA rejects esle we continue
    if(!flag)
    {
      break;
    }

    flag = false;
    ways = this.graph[current_state];
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

  ShowSchematic()
  {
    this.draw();
  }



  buildDotData(transitions, initialState, finalStates)
  {
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
  
  
  draw() 
  {
    let states = document.getElementById("States").value
    states = states.split(",")
    let initialState = states[0]
    let alphabets = document.getElementById("Alphabets").value
    alphabets = alphabets.split(",")
    let finalStates = document.getElementById("FinalStates").value
    finalStates = finalStates.split(",")
    let numberOfTransitions = document.getElementById("NumberOfRules").value
    let transitions = document.getElementById("Transitions").value
    transitions = transitions.split("\n")
  
  
    let dotData = this.buildDotData(transitions, initialState, finalStates)
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

}




