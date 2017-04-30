import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
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
export class GraphComponent implements OnInit, OnDestroy{

    private d3: any;
    private parentNativeElement: any;
    private svg;
    testNode: any;
    errorMessage: string;
    bla: any;
    currentCourse: string;
    width = 1200;
    height = 700;
    loadedCourses: any = [];
    siblings: any = [];

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

        this.removeGraph();
        this.route.params.subscribe((params: Params) =>
            this.currentCourse = params['courseID']);

        this.route.params
            .switchMap((params: Params) => this.searchService.getCourse(params['courseID']))
            .subscribe(course => {
                this.loadedCourses[this.currentCourse] = course  
                //console.log(course)
                if(course != "Not found"){
                    this.getChildrenRec(course);
                    if(this.checkParents(course)){
                        this.callParents(course);
                    }
                    console.log(course);
                    //this.createGraph(this.createGraphNode(course), true)
                    //console.log(this.loadedCourses);
                    setTimeout(() => { this.createGraph(this.createGraphNode(course), true); }, 3000);
                } else {
                    alert("Kursen fanns inte i databasen");
                }}
                , error => this.errorMessage=error);
    }

    ngOnDestroy() {
        this.removeGraph();
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
        this.d3.selectAll(".cbox").remove();
        this.d3.selectAll(".link").remove();
        this.d3.selectAll(".clink").remove();
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

        node = this.createChildNodes(node);
        var root = this.d3.hierarchy(node);
        //console.log(this.loadedCourses);


        var nodes = tree(root);
        //console.log(nodes);
        var list = this.updateNodesList(nodes, width, height);

        var l = [];
        this.getNodesInDepth(nodes, l)
        var heightScale = this.getMaxNodesInDepth(list)
        
        var widthScale = this.getNodeListDepth(list);
        if(nodes.data.parents != null){
            widthScale = widthScale+3;
            if( heightScale < nodes.data.parents.length){
                heightScale = nodes.data.parents.length;
            }
        }else{
            widthScale = widthScale+2;
        }
        height = heightScale * 80;
        this.height = height;
        width = widthScale * 320;
        this.width = width;
        //var links = tree(root).links();

        
        
        //console.log(this.getGraphDepth(nodes));
        var nodeList = this.updateNodesList(nodes, width, height);
        for(var i = 0; i < nodeList.length; i++){
            nodeList[i].depth--;
        }
        //console.log(nodeList[0].data.courseInfo.eligibility.credits)
        if(nodes.data.parents != null){
            nodeList = this.setParentNodes(nodeList, height);
            //links = this.setLinks(nodeList);
        }
        var credList = [];
        if(nodes.data.courseInfo.eligibility.credits.length > 5){
            credList.push(this.createCreditNode(nodeList[0]));
        }
        console.log(nodeList);
        
            var svg = this.d3.select("#tree").append("svg")
                    .attr("width", width)
                    .attr("height", height)
        
        var color = this.d3.schemeCategory10; /*för andra färger se: https://github.com/d3/d3-scale/blob/master/README.md#schemeCategory20*/

        var clink = svg.selectAll(".clink")
                    .data(credList)
                .enter().append("path")
                    .attr("class", "clink")
                    .attr("d", (d)=>{
                        return "M" + (width - d.y +50) + "," + (d.x+20) 
                             + "l" + 0 + "," + (d.px - d.x);
                    })

        var link = svg.selectAll(".link")
                .data(nodeList.slice(1))
            .enter().append("path")
                .attr("class", (d)=> {
                    if(d.sibling){
                        return "sibLink"
                    }else{
                        return "link";
                    }
                })
                /*.style("stroke", function(d, i){ console.log(d) 
                    return color[d.depth] })*/
                .attr("d", (d) => {
                    if(d.isSibling){
                        return "M" + (width - d.y +50) + ", " + (d.parent.x+20)
                             + "l" + ( ((width - d.parent.y) - (width - d.y)) ) + "," + (0)
                    }
                    else if(d.parent){
                    //console.log(shift);
                    return "M" + (width - d.y +50) + "," + (d.x+20) 
                         + "l" + ( ((width - d.parent.y) - (width - d.y))/2 + d.parent.height * 20 ) + "," + (0)
                         + "l" + ( 0 ) + "," + (d.parent.x - d.x)
                         + "l" + ( ((width - d.parent.y) - (width - d.y) )/2 - d.parent.height * 20) + "," + (0);
                    }else{
                        return "M" + (width - d.y + 100) + "," + (d.x+100)
                             + "L"+ (width - d.sibling.y + 100) + "," + (d.sibling.x -5 )
                    }
                }); 

        var box = this.d3.selectAll(".box")
            .data(nodeList)
            .enter().append("div").attr("class", "box").attr("id", (d)=>{
                if(d.isSibling || d.sibling){
                    //this.siblings.push(1)
                }
            })
            .on("mouseover", function(d){ 
                })
            .style("left", function(d) {
                //console.log(d);
                //if(d.data.)
                return (width - d.y) + "px" ;
            })
            .style("top", function(d) {
                return d.x + "px"
            });

        var cbox = this.d3.selectAll(".cbox")
            .data(credList)
            .enter().append("div").attr("class", "cbox")
            .style("left", function(d) {
                //console.log(d);
                //if(d.data.)
                return (width - d.y) + "px" ;
            })
            .style("top", function(d) {
                return d.x + "px"
            })

            box.append("div").attr("class", (d) => {
                var r  = "courseHeading ";
                if(this.loadedCourses[d.data.name]){
                    console.log(this.loadedCourses[d.data.name])
                    if(this.loadedCourses[d.data.name].eligibility.credits.length > 5 && d.depth != 1){
                        return r + "credReq";
                    }else{
                        return r;
                    }
                }
            }).attr("id", (d)=> { if(d.depth != 1){ return "courseHeading2" } } )
            .append("a").attr("routerLink", (d)=> { if (this.loadedCourses[d.data.name]) return ['/graph', d.data.name]})
            .on("click", (d) => {
                if(this.loadedCourses[d.data.name] != "Not found")
                    this.router.navigate(['/graph', d.data.name]);
                else 
                    alert("Kursen finns ej i databasen");
                //window.location.reload() 
            })
            .append("p").text((d) => { if(this.loadedCourses[d.data.name]){ if(this.loadedCourses[d.data.name] != "Not found"){ 
                return this.loadedCourses[d.data.name].name_sv }
                else{ return d.data.name } 
         }else{return d.data.name}}).attr("class", "courseCourse");  

        box.append("span").attr("class", (d)=>{ 
            if(this.loadedCourses[d.data.name]){
                if(this.loadedCourses[d.data.name].eligibility.credits.length > 5 && d.depth != 1){
                    return "tooltiptext";
                }
            } 
        }).text((d)=>{
            if(this.loadedCourses[d.data.name]){
                if(this.loadedCourses[d.data.name].eligibility.credits.length > 5 && d.depth != 1){
                    return this.loadedCourses[d.data.name].eligibility.credits;
                }
            } 
        })

         cbox.append("div").attr("class", "courseHeading")
             .append("p").text((d)=> { return "EligibilityCredits" })
             .attr("class", "courseCourse");
        
        var info = box.append("div")/*.on("click", (d)=> {
            console.log(d.data.name);
            console.log(d); 
            console.log(this.loadedCourses[d.data.name]);   
              })*/.attr("class", "courseContent").attr("id", "show");

        var cinfo = cbox.append("div").attr("class", "courseContent");

        cinfo.append("p").text ((d)=> { return d.credit })

        info.append("p").text((d)=>{ 
            if(this.loadedCourses[d.data.name]){ return this.loadedCourses[d.data.name].courseID } } );
        
        info.append("p").text((d) => { if(this.loadedCourses[d.data.name]){ return this.loadedCourses[d.data.name].hp + " hp" }else{return "Course not in database"} })
        
        info.append("a").attr("href", (d)=>{ 
            if(this.loadedCourses[d.data.name]){ return this.loadedCourses[d.data.name].href } })
            .text((d) => { if(this.loadedCourses[d.data.name] != null) 
                { return "Course Information" } });
        }
    }

    getNodeListDepth(nodeList){
        var r = 0;
        for (var i = 0; i < nodeList.length; i++) {
            if(nodeList[i].depth > r){
                r = nodeList[i].depth;
            }
        }
        return r;
    }

    /*kan komma till användning*/
    addOrNodes(orNode, deep){
        var tree = this.d3.tree()
            .size([this.width, this.height]);
        //console.log(orNode)
        var node = this.loadedCourses[orNode.data.or[0]]
        var t = tree(this.d3.hierarchy(node)).descendants();
        var resList = [];
        for (var j = 0; j < t.length; j++) {
            var orNode = this.createGraphNode(this.loadedCourses[t[j].data.courseID])
            this.createChildNodes(orNode)
            var orNodeList = tree(this.d3.hierarchy(orNode)).descendants();
            for(var k = 0; k < orNodeList.length; k++){
                orNodeList[k].depth = orNodeList[k].depth +  deep;
                resList.push(orNodeList[k])
            }
        }  
        return resList;
    };
    /*uppdaterar nodernas data så de blir anpassade för neededFor platserna
    width är bredden på den canvas som d3 ritas ut på*/
    updateNodesList(node, width, height) {
        var d = this.getGraphDepth(node)+2;
        console.log(node);
        var nodeList = node.descendants();
        for(var i = 0; i < nodeList.length; i++){
            if(nodeList[i].data.or != null){
                var orNodeList = this.addOrNodes(nodeList[i],nodeList[i].depth );
                orNodeList[0].sibling = nodeList[i];
                //orNodeList[0].parent = nodeList[i].parent;
                nodeList[i].isSibling = true;
            }
        }
        if(orNodeList != undefined){
            for(var i = 0; i < orNodeList.length; i++){
                nodeList.push(orNodeList[i])
            }
        }
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
        }
        return nodeList;
    };


    createCreditNode(node){
        if(node.data.courseInfo.eligibility.credits != ""){
            var objStr = '{"credit" : "' + node.data.courseInfo.eligibility.credits+ '",';
            objStr = objStr + '"px" : ' + node.x + ', "py" : ' + node.y + ', ';
            objStr = objStr + '"y" : ' + node.y + ' ,' + '"x" : ' + (node.x + 150) + '}';
            return JSON.parse(objStr);
        }
    }

    getNodesInDepth(node, l){
        if(node.children != null){
            l.push(node.children.length * 10 ** node.depth)
            for (var i = 0; i < node.children.length; ++i) {
                this.getNodesInDepth(node.children[i], l);
            }
        }
    }
    getMaxNodesInDepth(l){
        var li2 = [];
        for (var i = 0; i < l.length; i++) {
            if(li2[l[i].depth]== null){
                li2[l[i].depth] = 0;
            }
            li2[l[i].depth]++ 
        }
        var r = 0;
        for(var i = 0; i < li2.length; i++){
            if(li2[i]){
                if(li2[i] > r){
                    r = li2[i]
                }
            }
        }
        /*var p = 0;
        var i = 0;
        var li = [0];
        while (l.length > 0) {
            while(i<l.length){
                if(l[i] < 10 ** (p+1)){

                    li[p] = (li[p] + l.splice(i,1)[0])
                }else{i++}  
            }
            i = 0;
            p++;
            li.push(0);
        }
        var m = 0;
        for (var i = 0; i < li.length; ++i) {
            if(m < (li[i]/(10 ** (i)))) {
                m = li[i]/(10 ** (i));
            }
        }
        return m;*/
        return r;
    }

    callParents(course){
        for (var i = 0; i < course.neededBy.length; ++i) {
            this.searchService.getCourse(course.neededBy[i])
                .subscribe(course => {
                    //console.log(course);
                    this.loadedCourses[course.courseID] = course;
            }, error => this.errorMessage = error)
        }
    }    

    checkParents(course){

        if(course.neededBy == null){
            return false;
        }else{
            return true;
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
                            childObjStr = childObjStr + '"or": ["' + parent.eligibility.courses[i][j] + '"';
                        }
                        if (j < parent.eligibility.courses[i].length - 1) {
                            childObjStr = childObjStr + ",";
                        } else if (j > 0) {
                            childObjStr = childObjStr + "]}";
                        }else {
                            childObjStr = childObjStr + "}"
                        };
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
    createGraphNode(course) {
        //console.log(course)
        var courseStr = '{"name" : "' + course.courseID + '"';
        if (this.getChildren(course) != "[]") {
            courseStr = courseStr + ', "children" : ' + this.getChildren(course);
        }
        if (this.getNeededBy(course) != "[]") {
            courseStr = courseStr + ', "parents" : ' + this.getNeededBy(course);
        }
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
        if(node){
            if (node.children != null) {
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

    getChildrenRec(course){
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
        return true;
    }

    searchCourse(course: string) {
        this.router.navigate(['/start', course]);
    }
}	

