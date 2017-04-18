import { Component, OnInit, ElementRef,  } from '@angular/core';
import { D3Service, D3, Selection } from 'd3-ng2-service';
import { SearchService } from '../search.service';

@Component({
    selector: 'app-graph',
    templateUrl: './graph.component.html',
    styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit {

    private d3: any;
    private parentNativeElement: any;
    private svg;
    testNode: any;
    errorMessage: string;
    bla: any;

    constructor(element: ElementRef, d3Service: D3Service, private searchService: SearchService ) {
        this.d3 = d3Service.getD3(); // <-- obtain the d3 object from the D3 Service
        this.parentNativeElement = element.nativeElement;


    }


    ngOnInit() {
    	
        this.searchService.getCourse('SF1625')
        	.subscribe(course => this.bla = course, error => this.errorMessage=error);
        

        this.testNode = this.createGraphNode(this.dataBaseNode);
        //var testNode = treeData[0];
        /*var testNode = {
            "name" : dataBaseNode.name,
            "children" : getChildren(dataBaseNode),
            "parents" : getNeededBy(dataBaseNode),
            "courseInfo" :dataBaseNode 
        };*/

        var margin = {top: 40, right: 90, bottom: 50, left: 90},
            width = 660 - margin.left - margin.right,
            height = 500 - margin.top - margin.bottom;

        /*
        var canvas = this.d3.select("#tree").append("svg")
            .attr("width", 500)
            .attr("height", 500)
            .append("g")
            .attr("transform", "translate(50, 50)");
        */
        var tree = this.d3.tree()
            .size([width, height]);


        /*if (this.testNode.parents != null) {
            this.updateNodesList(nodes, width);
            nodes = this.setParentNodes(nodes, height);
            links = this.setLinks(nodes);
        }*/



        var root = this.d3.hierarchy(this.testNode);
        var nodes = tree(root);
        var links = tree(root).links();


        if (this.testNode.parents != null){
            this.updateNodesList(nodes, width);
        }
        //console.log(this.testNode)

        /*if (this.testNode.parents != null) {
            this.updateNodesList(nodes, width);
            nodes = this.setParentNodes(nodes, height);
            links = this.setLinks(nodes);
        }*/

        var nodeList = nodes.descendants();
        if(nodes.data.parents != null){
            nodeList = this.setParentNodes(nodeList, height);
            links = this.setLinks(nodeList);
        }
        console.log(nodeList);

        var svg = this.d3.select("#tree").append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom),
            g = svg.append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        var link = g.selectAll(".link")
                .data(nodeList.slice(1))
            .enter().append("path")
                .attr("class", "link")
                .attr("d", function(d) {
                    return "M" + (width - d.y) + "," + d.x
                     + "C" + (width - d.y) + "," + (d.x + d.parent.x) / 2
                     + " " + (width -d.parent.y) + "," +  (d.x + d.parent.x) / 2
                     + " " + (width - d.parent.y) + "," + d.parent.x;
                });
        var node = g.selectAll(".node")
                .data(nodeList)
            .enter().append("g")
                .attr("class", function(d){
                    return "node" + 
                        (d.children ? " node--internal" : "node--leaf"); })
                .attr("transform", function(d) { 
                    return "translate(" + (width - d.y) + "," + d.x + ")"; });

        node.append("circle")
            .attr("r", 10);

        node.append("text")
            .attr("dy", ".35em")
            .attr("y", function(d) { return d.children ? -20 : -20;})
            .style("text-anchor", "middle")
            .text(function(d) { return d.data.name});       

    }



    testData = [{ "_score": 3.459223, "_type": "course", "_id": "68681337", "_source": { "neededBy": ["DH2413", "DD2257", "DD2457", "DH2650", "DD2352", "DD2395", "DD2448", "DD2459", "DD2488", "DH2320", "DD2432", "DD2460", "DD2443"], "name": "DD1337", "hp": 7.0, "eligibility": { "courses": [["SF2520"], ["SF3850"]], "recommend": "", "credits": "" }, "href": "https://www.kth.se/student/kurser/kurs/DD1337", "name_sv": "Programmering", "name_en": "Programming" }, "_index": "courses" }, { "_score": 2.8848257, "_type": "course", "_id": "68681315", "_source": { "name_sv": "Programmeringsteknik och Matlab", "name": "DD1315", "hp": 7.5, "eligibility": { "courses": [[]], "recommend": "", "credits": "" }, "href": "https://www.kth.se/student/kurser/kurs/DD1315", "name_en": "Programming Techniques and Matlab" }, "_index": "courses" }, { "_score": 2.8848257, "_type": "course", "_id": "83703850", "_source": { "name_sv": "Numerisk linj\u00e4rprogrammering", "name": "SF3850", "hp": 7.5, "eligibility": { "courses": [["SF2812"], ["SF2520"]], "recommend": "", "credits": "Master degree including at least 30 university credits (hp) in in Mathematics (Calculus, Linear algebra, Differential equations and transform method), and further at least 6 hp in Mathematical Statistics, 6 hp in Numerical analysis and 6 hp in Optimization. " }, "href": "https://www.kth.se/student/kurser/kurs/SF3850", "name_en": "Numerical Linear Programming" }, "_index": "courses" }, { "_score": 2.8619907, "_type": "course", "_id": "68681310", "_source": { "name_sv": "Programmeringsteknik", "name": "DD1310", "hp": 6.0, "eligibility": { "courses": [[]], "recommend": "", "credits": "" }, "href": "https://www.kth.se/student/kurser/kurs/DD1310", "name_en": "Programming Techniques" }, "_index": "courses" }, { "_score": 2.736606, "_type": "course", "_id": "68681361", "_source": { "name_sv": "Programmeringsparadigm", "name": "DD1361", "hp": 7.5, "eligibility": { "courses": [], "recommend": "", "credits": ". 7,5 hp in mathematics and 6 hp in computer science or programming technics. " }, "href": "https://www.kth.se/student/kurser/kurs/DD1361", "name_en": "Programming Paradigms" }, "_index": "courses" }];
    /*Ändra index(0-3) för en annan nod*/
    dataBaseNode = this.testData[0]._source;
    /*
    parent: ett JSON objekt från databasen
    childObjArray: en lista med JSON objekt som är kursberoenden till parent som ser ut så här:
    {"name" : "KURSKOD"}
    */
    getChildren(parent) {
        var childObjStr = "[";
        if (parent.eligibility.courses[0].length > 0) {
            for (var i = 0; i < parent.eligibility.courses.length; i++) {
                childObjStr = childObjStr + '{"name" : "' + parent.eligibility.courses[i][0] + '"}';
                if (i < parent.eligibility.courses.length - 1) {
                    childObjStr = childObjStr + ","
                }
            }
        }
	    /*var childObjArray = JSON.parse(childObjStr + "]");
	    return childObjArray;*/
        return childObjStr + "]";
    };

    /*
    parent: ett JSON objekt från databasen
    nbObjArray: en lista med JSON objekt som har parent som beroende
    */
    getNeededBy(parent) {
        var nbStr = "[";
        if (parent.neededBy != null) {
            for (var i = 0; i < parent.neededBy.length; i++) {
                nbStr = nbStr + '{"name" : "' + parent.neededBy[i] + '",';
                nbStr = nbStr + '"parent" : "' + parent.name + '"}';
                if (i < parent.neededBy.length - 1) {
                    nbStr = nbStr + ", ";
                }
            }
        }
        return nbStr + "]";
    };

    /*
    Skapar ett JSON objekt som kan representeras i graf-form
    name = "KURSKOD"
    children = en lista med JSON objekt som är beroenden
    courseInfo = JSON objektet som informationen hämtades från
    */
    createGraphNode(course) {
        var courseStr = '{"name" : "' + course.name + '"';
        if (this.getChildren(course) != "[]") {
            courseStr = courseStr + ', "children" : ' + this.getChildren(course);
        }
        if (this.getNeededBy(course) != "[]") {
            courseStr = courseStr + ', "parents" : ' + this.getNeededBy(course);
        }
        var obj = JSON.parse(courseStr + '}');
        obj.courseInfo = course;
        return obj;
    };

    /*En funktion som returnerar djupet hos grafen*/
    getGraphDepth(node) {
        var d = 0;
        var parent = node;
        if(parent != null){
            while (parent.children != null){
                d = parent.children[0].depth;
                parent = parent.children[0];

            }
        }
        return d + 1;/*return +2 för att kompensera då man ej har gjort ++ på djupet*/
    };

    /*uppdaterar nodernas data så de blir anpassade för neededFor platserna
    width är bredden på den canvas som d3 ritas ut på*/
    updateNodesList(node, width) {
        var d = this.getGraphDepth(nodeList)+1;
        var nodeList = node.descendants();  
        //this.getNodeList(node, nodeList);
        for (var i = 0; i < nodeList.length; i++) {
            nodeList[i].depth++;
            nodeList[i].y = width * ((nodeList[i].depth    ) / d);
        };
    };

    /*lägger till neededBy noder med dess data i nod-listan
    Height är höjden på den canvas som d3 ritas ut på*/
    setParentNodes(nodeList, height) {
        //this.testNode.parents.length
        for (var i =0; i < nodeList[0].data.parents.length; i++) {
            var nodeObj: any = {};
            var data: any = {};

            data.name = nodeList[0].data.parents[i].name;
            nodeObj.depth = 0;
            nodeObj.data = data;
            nodeObj.parent = nodeList[0];
            nodeObj.x =  height * ((i + 1) / (nodeList[0].data.parents.length -1 ));
            nodeObj.y = 0;
            //console.log(nodeObj);
            nodeList.push(nodeObj);
        }
        return nodeList;
    };

    /*Skapar länkarna mellan noderna som blir sträcken mellan dem
    nodeList är en lista med noderna som sträcken går mellan*/
    setLinks(nodeList) {
        var linkList = [];
        for (var i = 1; i < nodeList.length; i++) {
            var linkObj: any = {};
            linkObj.source = nodeList[i];
            linkObj.target = nodeList[i].parent;
            linkList.push(linkObj);
        }
        return linkList;
    };


}	

