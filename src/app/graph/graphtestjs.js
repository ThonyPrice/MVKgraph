testData = [{ "_score": 3.459223, "_type": "course", "_id": "68681337", "_source": { "neededBy": ["DH2413", "DD2257", "DD2457", "DH2650", "DD2352", "DD2395", "DD2448", "DD2459", "DD2488", "DH2320", "DD2432", "DD2460", "DD2443"], "name": "DD1337", "hp": 7.0, "eligibility": { "courses": [["SF2520"], ["SF3850"]], "recommend": "", "credits": "" }, "href": "https://www.kth.se/student/kurser/kurs/DD1337", "name_sv": "Programmering", "name_en": "Programming" }, "_index": "courses" }, { "_score": 2.8848257, "_type": "course", "_id": "68681315", "_source": { "name_sv": "Programmeringsteknik och Matlab", "name": "DD1315", "hp": 7.5, "eligibility": { "courses": [[]], "recommend": "", "credits": "" }, "href": "https://www.kth.se/student/kurser/kurs/DD1315", "name_en": "Programming Techniques and Matlab" }, "_index": "courses" }, { "_score": 2.8848257, "_type": "course", "_id": "83703850", "_source": { "name_sv": "Numerisk linj\u00e4rprogrammering", "name": "SF3850", "hp": 7.5, "eligibility": { "courses": [["SF2812"], ["SF2520"]], "recommend": "", "credits": "Master degree including at least 30 university credits (hp) in in Mathematics (Calculus, Linear algebra, Differential equations and transform method), and further at least 6 hp in Mathematical Statistics, 6 hp in Numerical analysis and 6 hp in Optimization. " }, "href": "https://www.kth.se/student/kurser/kurs/SF3850", "name_en": "Numerical Linear Programming" }, "_index": "courses" }, { "_score": 2.8619907, "_type": "course", "_id": "68681310", "_source": { "name_sv": "Programmeringsteknik", "name": "DD1310", "hp": 6.0, "eligibility": { "courses": [[]], "recommend": "", "credits": "" }, "href": "https://www.kth.se/student/kurser/kurs/DD1310", "name_en": "Programming Techniques" }, "_index": "courses" }, { "_score": 2.736606, "_type": "course", "_id": "68681361", "_source": { "name_sv": "Programmeringsparadigm", "name": "DD1361", "hp": 7.5, "eligibility": { "courses": [], "recommend": "", "credits": ". 7,5 hp in mathematics and 6 hp in computer science or programming technics. " }, "href": "https://www.kth.se/student/kurser/kurs/DD1361", "name_en": "Programming Paradigms" }, "_index": "courses" }];
/*Ändra index(0-3) för en annan nod*/	
var dataBaseNode = testData[0]._source;
console.log("HEJSAN");
/*
parent: ett JSON objekt från databasen
childObjArray: en lista med JSON objekt som är kursberoenden till parent som ser ut så här:
{"name" : "KURSKOD"}
*/
function getChildren(parent) {
	var childObjStr = "[";
	if(parent.eligibility.courses[0].length >0){
		for (var i = 0; i < parent.eligibility.courses.length; i++){
			childObjStr = childObjStr + '{"name" : "' + parent.eligibility.courses[i][0] + '"}';
			if(i < parent.eligibility.courses.length -1){
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
function getNeededBy(parent){
	var nbStr = "[";
	if(parent.neededBy != null){
		for(var i = 0; i < parent.neededBy.length; i++){
			nbStr = nbStr + '{"name" : "' + parent.neededBy[i] + '",';
			nbStr = nbStr + '"parent" : "' + parent.name + '"}';
			if(i < parent.neededBy.length - 1){
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
function createGraphNode(course) {
	var courseStr = '{"name" : "' + course.name + '"';
	if (getChildren(course) != "[]"){
		courseStr = courseStr +  ', "children" : ' + getChildren(course);
	}
	if (getNeededBy(course) != "[]"){
		courseStr = courseStr + ', "parents" : ' + getNeededBy(course); 
	}
	var obj = JSON.parse(courseStr + '}');
	obj.courseInfo = course;
	return obj;
};

/*En funktion som returnerar djupet hos grafen*/
function getGraphDepth(node){
	d = 0;
	for(var i = 0; i < node.length; i++){
		if(d < node[i].depth){
			d = node[i].depth;
		}
	}
	return d+2;/*return +2 för att kompensera då man ej har gjort ++ på djupet*/
};	

/*uppdaterar nodernas data så de blir anpassade för neededFor platserna
width är bredden på den canvas som d3 ritas ut på*/
function updateNodesList(nodeList, width){
	var d = getGraphDepth(nodeList)
	for(var i = 0; i < nodeList.length; i++){
		nodeList[i].depth++;
		nodeList[i].y = width*((nodeList[i].depth+1)/d);
	};
};

/*lägger till neededBy noder med dess data i nod-listan
Height är höjden på den canvas som d3 ritas ut på*/
function setParentNodes(nodeList, height){
	for(var i = 0; i<nodeList[0].parents.length; i++){
		var nodeObj = {};
		//console.log(nodeObj);
		nodeObj.depth = 0;
		nodeObj.name = nodeList[0].parents[i].name;
		nodeObj.parent = nodeList[0];
		nodeObj.x = (i+1)*height*(1/(nodeList[0].parents.length+2));
		nodeObj.y = 0;
		nodeList.push(nodeObj);
	}
	return nodeList;
};

/*Skapar länkarna mellan noderna som blir sträcken mellan dem
nodeList är en lista med noderna som sträcken går mellan*/
function setLinks(nodeList){
	var linkList = [];
	for(var i = 1; i < nodeList.length; i++){
		var linkObj  = {};
		linkObj.source = nodeList[i];
		linkObj.target = nodeList[i].parent;
		linkList.push(linkObj);
	}
	return linkList;
};

var testNode = createGraphNode(dataBaseNode);
//var testNode = treeData[0];
/*var testNode = {
	"name" : dataBaseNode.name,
	"children" : getChildren(dataBaseNode),
	"parents" : getNeededBy(dataBaseNode),
	"courseInfo" :dataBaseNode 
};*/
var height = 400;
var width = 400;

var canvas = d3.select("#tree").append("svg")
			.attr("width", 500)
			.attr("height", 500)
			.append("g")
				.attr("transform", "translate(50, 50)");

var tree = d3.layout.tree()
		.size([width, height]);
console.log(testNode);
var nodes = tree.nodes(testNode);
var links = tree.nodes.links(nodes);
/*Om man ska skapa noder för neededBy behövs links och nodes göras om*/
if(testNode.parents != null){
	updateNodesList(nodes, width);
	nodes = setParentNodes(nodes, height);
	links = setLinks(nodes);
}


var node = canvas.selectAll(".node")
	.data(nodes)
	.enter()
	.append("g")
		.attr("class", "node")/* man gör beräkningen i nästa call för att flippa på grafen åt rätt håll*/
		.attr("transform", function(d){ return "translate(" + ((width-d.y)).toString() + "," + d.x + ")"; })

node.append("circle")
	.attr("r", 5)
	.attr("fill", "steelblue");

node.append("text")
	.text( function (d) { return d.name })

var diagonal = d3.svg.diagonal() /* man gör beräkningen i nästa call för att flippa på grafen åt rätt håll*/
	.projection(function (d) { return [((width-d.y)), d.x]; });

canvas.selectAll(".link")
	.data(links)
	.enter()
	.append("path")
	.attr("class", "link")
	.attr("fill", "none")
	.attr("stroke", "grey")
	.attr("d", diagonal);	
