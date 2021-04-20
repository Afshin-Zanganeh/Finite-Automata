class DFA
{
  constructor(states,alphabets,final_states,transitions)
  {

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
   for (var letter of string)
   {
    // in each step flag should be true to be sure thst for each letter we have a way from current state to another state if we dont have DFA rejects esle we continue
    if(!flag)
    {
      break;
    }

    flag = false;
    ways = this.graph[current_state];
    for(var way of ways)
    {
      if(letter ==way[1])
      {
        flag = true;
        current_state = way[0];
        break;
      }
    }
   }
   if(flag == true && this.final_states.includes(current_state))
   {
     return true;
   }
   return false
 }

 MakeSimpleDFA()
 {
   
   Array.prototype.remove = function() {
     var what, a = arguments, L = a.length, ax;
     while (L && this.length) {
         what = a[--L];
         while ((ax = this.indexOf(what)) !== -1) {
             this.splice(ax, 1);
         }
     }
     return this;
   };
   // define difference method for set in js
   Array.prototype.difference = function(otherSet)
   {
       // creating new set to store difference
        var differenceSet = [];

       // iterate over the values
       for(var elem of this)
       {
           // if the value[i] is not present 
           // in otherSet add to the differenceSet
           if(!otherSet.includes(elem))
               differenceSet.push(elem);
       }
     
       // returns values of differenceSet
       return differenceSet;
   }



   var state_set = this.states;
   var final_set = this.final_states;
   var non_final_set = state_set.difference(final_set);
   var state_flag = {};
   var p0 = [non_final_set,final_set];
   var p1 = [];

   

   while(true)
   {

    for(var item of state_set)
    {
      state_flag[item] = false;
    }

     var p0_tmp = [];
     for(var i=0; i<p0.length; i++)
     {
       var tmp_set = [];
       for(var j=0; j<p0[i].length; j++)
       {
         tmp_set.push(p0[i][j]);
       }
       p0_tmp.push(tmp_set);
     }

     for(var partition of p0_tmp)
     {
       for (var item of partition)
       {
         var tmp = [];
         var flag = false;
         for(var item2 of partition.difference(item))
         {
           if((!state_flag[item]) && (!state_flag[item2])  && this.Are_states_same(item,item2,p0))
           {
             flag = true;
             tmp.push(item2);
             state_flag[item2] = true;
           }
         }

         if(!flag && !state_flag[item])
         {
           tmp.push(item);
           state_flag[item] = true;
           p1.push(tmp);
           tmp = [];
         }

         if(tmp.length != 0)
         {
           tmp.push(item);
           state_flag[item] = true;
           p1.push(tmp);
         }
         
       }
     }
     
     if(this.check_2D_arr_same(p1,p0))
     {
       break;
     }
     
     p0 = p1;
     p1 = [];
     
    }
    
    var minimized_states = [];
    var minimized_final_states = [];
    var minimized_transitions = [];
    
    for(var item of p0)
    {
      minimized_states.push(JSON.stringify(item));
    }
    
    for(var final of this.final_states)
    {
      if(minimized_final_states.includes(JSON.stringify(final)))
      {
        continue;
      }
      for(var item of p0)
      {
        if( item.includes(final))
        {
          minimized_final_states.push(JSON.stringify(item));
          break;
        }
      }
    }
    
    for(var trans of this.transitions)
    {
      trans = trans.split(",")
      for(var start of p0)
      {
        if(start.includes(trans[0]))
        {
          for(var dest of p0)
          {
            if(dest.includes(trans[1]))
            {
              var tmp_trans = "";
              tmp_trans += JSON.stringify(start) + ",";
              tmp_trans += JSON.stringify(dest) + ",";
              tmp_trans += trans[2];
              
              if(!minimized_transitions.includes(tmp_trans))
              {
                minimized_transitions.push(tmp_trans);
              }
              
            }
          }
        }
      }
    }
    
    debugger;
    var minimized_graph = {"minimized_states" : minimized_states , "minimized_final_states": minimized_final_states , "minimized_transitions": minimized_transitions};
    return minimized_graph; 
  }
  
  check_2D_arr_same(a,b)
  {
    if(a.length != b.length)
    {
      return false;
    }

    for(var i=0; i<a.length; i++)
    {
      a[i].sort();
      b[i].sort();
      if(JSON.stringify(a[i]) != JSON.stringify(b[i]))
      {
        return false;
      }
    }
    return true;
  }

  Are_states_same(s0,s1,partition)
  {
    var count =0;
    for(var letter of this.alphabets)
    {
      var s0_ways = this.graph[s0];
      var s1_ways = this.graph[s1];
      var q0;
      var q1;

      for (var item of s0_ways)
      {
        if (item[1] == letter)
        {
           q0  = item[0];
           break;
        }
      }

      for(var item2 of s1_ways)
      {
        if (item2[1] == letter)
        {
           q1  = item2[0];
           break;
        }
      }

      for(var subset of partition)
      {
        if(subset.includes(q0) && subset.includes(q1))
        {
          count +=1;
          break;
        }
      }
    }

    if(count == this.alphabets.length)
    {
      return true;
    }

    return false;
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




