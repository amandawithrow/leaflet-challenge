function getData(){
    d3.json("/data").then(function(data){

    //filter data based on criteria above
    var filterMet = selectMet(data);
    var filterAge = selectAge(filterMet);
    var filterEd = selectEd(filterAge);
    var filterKids = selectKids(filterEd);
    var filterRace = selectRace(filterKids);
    var filterSex = selectSexuality(filterRace);
    //returns filtered dataset
    return filterSex;
    });
    //get unique values to build x axis
    var distinct = []
    for (var i = 0; i<filterSex.length; i++){
        if (!(filterSex[i].how_long_relationship in distinct)){
            distinct.push(filterSex[i].how_long_relationship)
        }
    };
    //get counts for y axis
    // empty counters declared
    var counts = []
    var num = 0
    
    //iterate through distinct values
    for (var a = 0; a < distinct.length; a++){
        //compare distinct value to each value in the filtered array of objects
        for (var b = 0; b<filterSex.length; b++){
            if (distinct[a].how_long_relationship === filterSex[b].how_long_relationship){
                num = num + 1;
            }
            b++  
        }
        //add final count to array
        counts.push(num);
        //reset value counter
        num = 0;
        a++
    }
    //code to plot
    var plotting = [
        {
            //x = relationship length
            x:distinct,
            //y = count of each in relationship length
            y:counts,
            type: "bar"
        }
    ];
    Plotly.newPlot("resultDiv", plotting);
    };
