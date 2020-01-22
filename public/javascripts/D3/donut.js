function makeDonut(dataset,id,clr){
 
    /*
    var dataset = [
            { name: 'IE', percent: 39.10 },
            { name: 'Chrome', percent: 32.51 },
            { name: 'Safari', percent: 13.68 },
            { name: 'Firefox', percent: 8.71 },
            { name: 'Others', percent: 6.01 }
        ];
    */
        var pie=d3.layout.pie()
                .value(function(d){return d.percent})
                .sort(null)
                .padAngle(.03);
    
        var w=300,h=300;
    
        var outerRadius=w/2;
        var innerRadius=100;
    
        var color = d3.scale.category10();
    
        var arc=d3.svg.arc()
                .outerRadius(outerRadius)
                .innerRadius(innerRadius);
    
        var svg=d3.select(id)
                .append("svg")
                .attr({
                    width:w,
                    height:h,
                }).append('g')
                .attr({
                    transform:'translate('+w/2+','+h/2+')'
                });
        var path=svg.selectAll('path')
                .data(pie(dataset))
                .enter()
                .append('path')
                
                .attr({
                    d:arc,
                    fill:function(d,i){
                        return color(d.data.actual);
                    }
                });
    
        path.transition()
                .duration(1000)
                .attrTween('d', function(d) {
                    var interpolate = d3.interpolate({startAngle: 0, endAngle: 0}, d);
                    return function(t) {
                        return arc(interpolate(t));
                    };
                });
    
    
        var restOfTheData=function(){
            var text=svg.selectAll('text')
                    .data(pie(dataset))
                    .enter()
                    .append("text")
                    .transition()
                    .duration(200)
                    .attr("transform", function (d) {
                        return "translate(" + arc.centroid(d) + ")";
                    })
                    .attr("dy", ".4em")
                    .attr("text-anchor", "middle")
                   
                    .text(function(d){
                        return d.data.wName;
                    })
                    
                    .style({
                        fill:'#fff',
                        'font-size':'1em'
                    });
    
            var legendRectSize=20;
            var legendSpacing=7;
            var legendHeight=legendRectSize+legendSpacing;
    
    
            var legend=svg.selectAll('.legend')
                    .data(color.domain())
                    .enter()
                    .append('g')
                    .attr({
                        class:'legend',
                        transform:function(d,i){
                            //Just a calculation for x & y position
                            //return 'translate(-35,' + ((i*legendHeight)-65) + ')';
                            return 'translate(0,0)';
                        }
                    });
           
    
            legend.append('text')
            .attr("text-anchor", "middle")
                    .text(function(d){
                        return d;
                    }).style({
                        fill:'white',
                        'font-size':'3em'
                    });
        };
    
        setTimeout(restOfTheData,1000);
};

