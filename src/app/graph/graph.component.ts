import { Component, OnInit, ElementRef } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { D3Service, D3, Selection } from 'd3-ng2-service';
import { SearchService } from '../search.service';
import { Observable } from 'rxjs/Observable';
//import { Platform } from '@angular/core';

@Component({
    selector: 'app-graph',
    templateUrl: './graph.component.html',
    styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit{

    private d3: any;
    private parentNativeElement: any;
    private svg;
    testNode: any;
    errorMessage: string;
    bla: any;
    currentCourse: string;
    width = 800;
    height = 700;
    loadedCourses: any = [];

    constructor(private element: ElementRef, 
        d3Service: D3Service, 
        private searchService: SearchService, 
        private router: Router, 
        private route: ActivatedRoute
        ) {
        this.d3 = d3Service.getD3(); // <-- obtain the d3 object from the D3 Service
        this.parentNativeElement = element.nativeElement;
        


    }


    ngOnInit() {
    	

        /*
        let callAndMap = (pageNo) => call({page: pageNo}).map(res => {course: pageNo, data: res.json()});  // map, and save the page number for recursion later.

        callAndMap(1)
        .expand(obj => (obj.data.meta.hasMore ? callAndMap(obj.page + 1) : Observable.empty()))
        //.map(obj => obj.data)    // uncomment this line if you need to map back to original response json
        .subscribe(callback);
        */

        this.route.params.subscribe((params: Params) =>
            this.currentCourse = params['courseID']);

        this.route.params
            .switchMap((params: Params) => this.searchService.getCourse(params['courseID']))
            .subscribe(course => {
                this.loadedCourses[this.currentCourse] = course  
                //console.log(course)
                if(course != "Not found"){
                    this.getChildrenRec(course)
                    console.log(course);
                    //this.createGraph(this.createGraphNode(course), true)
                    //console.log(this.loadedCourses);
                    setTimeout(() => { this.createGraph(this.createGraphNode(course), true); }, 3000);
                } else {
                    alert("Kursen fanns inte i databasen");
                }}
                , error => this.errorMessage=error);
       
        //console.log(this.dataBaseNode);
        var waitNode = {"courseID": "Waiting...",
                            "eligibility":{
                                "courses":[[]],
                                "credits": "",
                                "recommend": ""
                            }
                        };
        //console.log(waitNode);
        //this.testNode = this.createGraphNode(waitNode);
        //this.createGraph(null, false);
            

    }



    testData = [{ "neededBy": ["DH2413", "DD2257", "DD2457", "DH2650", "DD2352", "DD2395", "DD2448", "DD2459", "DD2488", "DH2320", "DD2432", "DD2460", "DD2443"], "courseID": "DD1337", "hp": 7.0, "eligibility": { "courses": [["SF2520"], ["SF3850"]], "recommend": "", "credits": "" }, "href": "https://www.kth.se/student/kurser/kurs/DD1337", "name_sv": "Programmering", "name_en": "Programming" }, { "name_sv": "Programmeringsteknik och Matlab", "courseID": "DD1315", "hp": 7.5, "eligibility": { "courses": [[]], "recommend": "", "credits": "" }, "href": "https://www.kth.se/student/kurser/kurs/DD1315", "name_en": "Programming Techniques and Matlab" }, { "name_sv": "Numerisk linj\u00e4rprogrammering", "courseID": "SF3850", "hp": 7.5, "eligibility": { "courses": [["SF2812"], ["SF2520"]], "recommend": "", "credits": "Master degree including at least 30 university credits (hp) in in Mathematics (Calculus, Linear algebra, Differential equations and transform method), and further at least 6 hp in Mathematical Statistics, 6 hp in Numerical analysis and 6 hp in Optimization. " }, "href": "https://www.kth.se/student/kurser/kurs/SF3850", "name_en": "Numerical Linear Programming" }, { "name_sv": "Programmeringsteknik", "courseID": "DD1310", "hp": 6.0, "eligibility": { "courses": [[]], "recommend": "", "credits": "" }, "href": "https://www.kth.se/student/kurser/kurs/DD1310", "name_en": "Programming Techniques" }, { "name_sv": "Programmeringsparadigm", "courseID": "DD1361", "hp": 7.5, "eligibility": { "courses": [], "recommend": "", "credits": ". 7,5 hp in mathematics and 6 hp in computer science or programming technics. " }, "href": "https://www.kth.se/student/kurser/kurs/DD1361", "name_en": "Programming Paradigms" }, {"name_sv": "Numerisk linj\u00e4rprogrammering", "eligibility": {"courses": [["SF2812"], ["SF2520"]], "recommend": "", "credits": "Master degree including at least 30 university credits (hp) in in Mathematics (Calculus, Linear algebra, Differential equations and transform method), and further at least 6 hp in Mathematical Statistics, 6 hp in Numerical analysis and 6 hp in Optimization. "}, "hp": 7.5, "courseID": "SF3850", "href": "https://www.kth.se/student/kurser/kurs/SF3850", "name_en": "Numerical Linear Programming"}];
    /*Ändra index(0-3) för en annan nod*/
    dataBaseNode = this.testData[0];
    /*
    parent: ett JSON objekt från databasen
    childObjArray: en lista med JSON objekt som är kursberoenden till parent som ser ut så här:
    {"name" : "KURSKOD"}
    */
    removeGraph(){
        this.d3.selectAll(".box").remove();
        this.d3.selectAll(".link").remove();
        this.d3.select("svg").remove();
    }

    createGraph(node, afterCall){
        if(afterCall){
        var margin = {top: 40, right: 90, bottom: 50, left: 90},
            width = this.width,
            height = this.height;

        var tree = this.d3.tree()
            .size([width, height]);
       
        
        if(afterCall){
            this.removeGraph()
        }

        console.log(node);
        node = this.createChildNodes(node);
        console.log(node);
        var root = this.d3.hierarchy(node);
        //console.log(root)

        var nodes = tree(root);

        //var links = tree(root).links();
        this.updateNodesList(nodes, width, height);

        var nodeList = nodes.descendants();
        if(nodes.data.parents != null){
            nodeList = this.setParentNodes(nodeList, height);
            //links = this.setLinks(nodeList);
        }
        
            var svg = this.d3.select("#tree").append("svg")
                    .attr("width", width)
                    .attr("height", height)
        
        var link = svg.selectAll(".link")
                .data(nodeList.slice(1))
            .enter().append("path")
                .attr("class", "link")
                .attr("d", function(d) {
                    return "M" + (width - d.y +50) + "," + (d.x+20) 
                         + "l" + ( (width - d.parent.y) - (width - d.y) )/2 + "," + (0)
                         + "l" + ( 0 ) + "," + (d.parent.x - d.x)
                         + "l" + ( (width - d.parent.y) - (width - d.y) )/2 + "," + (0);
                    }); 


                    //[routerLink]="['/graph', course._source.courseID] '<div class = box [routerLink] = "['+"'/graph'," + d.data.name + ']"'"
        var box = this.d3.selectAll(".box")
            .data(nodeList)
            .enter().append("div").attr("class", "box")
            .style("left", function(d) {
                return (width - d.y) + "px" ;
            })
            .style("top", function(d) {
                return d.x + "px"
            });

        box.append("div").attr("class", "courseHeading")
            .append("a").attr("routerLink", function (d) { return ['/graph', d.data.name] })
            .on("click", (d) => {
                this.router.navigate(['/graph', d.data.name]);
                //window.location.reload() 
            })
            .append("p").text(function(d) { return d.data.name }).attr("class", "courseCourse");  
        
        var info = box.append("div").on("click", (d)=> {
            console.log(d.data.name);/*
            this.searchService.getCourse(d.data.name).subscribe(course => console.log(course),
                error => this.errorMessage = error 
                )
        */}).attr("class", "courseContent");


        /*
                this.searchService.getCourse(this.currentCourse)
            .subscribe(course => this.createGraph(this.createGraphNode(course), true)
                , error => this.errorMessage=error);
       
        */

        info.append("p").text(function(d){ if(d.data.courseInfo != null){ return d.data.courseInfo.name_sv } });
        info.append("p").text(function(d){ if(d.data.courseInfo != null){ return d.data.courseInfo.hp + " hp" } })
        info.append("a").attr("href", function(d){ if(d.data.courseInfo != null){ return d.data.courseInfo.href } })
            .text((d) => { if(this.loadedCourses[d.data.name] != null) 
                { return "Course Information" } else {return /*this.searchService.getCourse(d.data.name).subscribe(
                    course => {this.loadedCourses[course.courseID] = course
                        console.log(this.loadedCourses)}  , error => this.errorMessage = error
                    )*/}});
        }
    }

    getChildren(parent) {
        //console.log(parent);
        var childObjStr = "[";
        if (parent.eligibility.courses.length > 0 ) {
            if(parent.eligibility.courses[0].length > 0){
                for (var i = 0; i < parent.eligibility.courses.length; i++) {
                    for (var j = 0; j < parent.eligibility.courses[i].length; j++){
                        if(j == 0){
                            childObjStr = childObjStr + '{"name" : "' + parent.eligibility.courses[i][j] + '"';
                        }else{
                            childObjStr = childObjStr + '"name' + j  + '": "' + parent.eligibility.courses[i][j] + '"';
                        }
                        if (j < parent.eligibility.courses[i].length - 1) {
                            childObjStr = childObjStr + ",";
                        } else {
                            childObjStr = childObjStr + "}";
                        }
                    }
                    if (i < parent.eligibility.courses.length - 1) {
                        childObjStr = childObjStr + ",";
                    }else{
                        childObjStr = childObjStr + "";
                    }
                }
            }
        }        
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
    createGraphNode(course):Observable<any> {
        //console.log(course)
        var courseStr = '{"name" : "' + course.courseID + '"';
        if (this.getChildren(course) != "[]") {
            courseStr = courseStr + ', "children" : ' + this.getChildren(course);
        }
        if (this.getNeededBy(course) != "[]") {
            courseStr = courseStr + ', "parents" : ' + this.getNeededBy(course);
        }
        console.log(courseStr + "}")
        var obj = JSON.parse(courseStr + '}');
        obj.courseInfo = course;
        if (obj.children != null) {
            //console.log(this.createChildNodes(obj.children))
            //obj.children = this.createChildNodes(obj.children);
        }
        //console.log(obj)
        return obj;
    };


    /*kan vara användbar om man ska fösöka med rekursiva calls*/
    // DD2460 och SF2705 kan vara kul att testa på
    createChildNodes(node) {
        //console.log(this.loadedCourses);
        //console.log(arr);
        console.log(node);
        //console.log(node.children);
        if(node){
            if (node.children != null) {
                //console.log("SE hit");
                //console.log(this.loadedCourses[node.children[0]]);
                for (var i in node.children) {
                    if (this.loadedCourses[node.children[i].name] != undefined) {
                        var childrenToAdd = JSON.parse(this.getChildren(this.loadedCourses[node.children[i].name]));
                        if (childrenToAdd.length > 0) {
                            node.children[i]['children'] = childrenToAdd;
                            this.createChildNodes(node.children[i]);
                        }
                    }
                }
            }
        }
        return node;
    }

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
        return d + 1;
    };

    getNodesPerDepth(depth, nodeList): number {
    	var d = 0;
    	for (var i = 0; i < nodeList.length; i++){
    		if(depth == nodeList[i].depth){
    			d++;
    		}
    	}
    	return d;
    }

    /*uppdaterar nodernas data så de blir anpassade för neededFor platserna
    width är bredden på den canvas som d3 ritas ut på*/
    updateNodesList(node, width, height) {
        var d = this.getGraphDepth(node)+1;
        var nodeList = node.descendants(); 
        //this.getNodeList(node, nodeList);
        var nrpDepth = [];
        for (var i = 0; i < nodeList.length; i++){
        	nrpDepth.push(this.getNodesPerDepth(nodeList[i].depth, nodeList))
        }
        var cd = 1;
        for (var i = 0; i < nodeList.length; i++) {
            nodeList[i].depth++;
            nodeList[i].y = width * ((nodeList[i].depth) / d);
            nodeList[i].x = height * (cd / (nrpDepth[i]+1));
            if(cd < nrpDepth[i])
            	cd++;
            else
            	cd = 1; 
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
            nodeObj.x =  height * ((i + 1) / (nodeList[0].data.parents.length +2 ));
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

    /*
                this.searchService.getCourse(this.currentCourse)
            .subscribe(course => this.createGraph(this.createGraphNode(course), true)
                , error => this.errorMessage=error);
       
    */

    getChildrenRec(course){
        //console.log(course.courseID);
        if(course.courseID != undefined){
            if(course.eligibility.courses[0]){
                if (course.eligibility.courses[0].length > 0){
                    for(var i = 0; i < course.eligibility.courses.length; i++){
                        for(var j = 0; j < course.eligibility.courses[i].length; j++){
                            this.searchService.getCourse(course.eligibility.courses[i][j])
                                .subscribe(course => {
                                    //console.log(course);
                                    this.loadedCourses[course.courseID] = course;
                                    this.getChildrenRec(course)
                            }, error => this.errorMessage = error)
                        }
                    }
                }
            }
        }
        //setTimeout(() => { console.log(this.loadedCourses); }, 2000);
        return true;
    }
}	

