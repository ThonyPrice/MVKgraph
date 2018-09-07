import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-course-node',
    templateUrl: './course-node.component.html',
    styleUrls: ['./course-node.component.css']
})
export class CourseNodeComponent implements OnInit {

    constructor() { }

    ngOnInit() {
    }

    testData = [{ "_score": 3.459223, "_type": "course", "_id": "68681337", "_source": { "neededBy": ["DH2413", "DD2257", "DD2457", "DH2650", "DD2352", "DD2395", "DD2448", "DD2459", "DD2488", "DH2320", "DD2432", "DD2460", "DD2443"], "courseID": "DD1337", "hp": 7.0, "eligibility": { "courses": [[]], "recommend": "", "credits": "" }, "href": "https://www.kth.se/student/kurser/kurs/DD1337", "name_sv": "Programmering", "name_en": "Programming" }, "_index": "courses" }, { "_score": 2.8848257, "_type": "course", "_id": "68681315", "_source": { "name_sv": "Programmeringsteknik och Matlab", "courseID": "DD1315", "hp": 7.5, "eligibility": { "courses": [[]], "recommend": "", "credits": "" }, "href": "https://www.kth.se/student/kurser/kurs/DD1315", "name_en": "Programming Techniques and Matlab" }, "_index": "courses" }, { "_score": 2.8848257, "_type": "course", "_id": "83703850", "_source": { "name_sv": "Numerisk linj\u00e4rprogrammering", "courseID": "SF3850", "hp": 7.5, "eligibility": { "courses": [["SF2812"], ["SF2520"]], "recommend": "", "credits": "Master degree including at least 30 university credits (hp) in in Mathematics (Calculus, Linear algebra, Differential equations and transform method), and further at least 6 hp in Mathematical Statistics, 6 hp in Numerical analysis and 6 hp in Optimization. " }, "href": "https://www.kth.se/student/kurser/kurs/SF3850", "name_en": "Numerical Linear Programming" }, "_index": "courses" }, { "_score": 2.8619907, "_type": "course", "_id": "68681310", "_source": { "name_sv": "Programmeringsteknik", "courseID": "DD1310", "hp": 6.0, "eligibility": { "courses": [[]], "recommend": "", "credits": "" }, "href": "https://www.kth.se/student/kurser/kurs/DD1310", "name_en": "Programming Techniques" }, "_index": "courses" }, { "_score": 2.736606, "_type": "course", "_id": "68681361", "_source": { "name_sv": "Programmeringsparadigm", "courseID": "DD1361", "hp": 7.5, "eligibility": { "courses": [], "recommend": "", "credits": ". 7,5 hp in mathematics and 6 hp in computer science or programming technics. " }, "href": "https://www.kth.se/student/kurser/kurs/DD1361", "name_en": "Programming Paradigms" }, "_index": "courses" }];

}
