import { Component, OnInit, ElementRef } from '@angular/core';
import { D3Service, D3, Selection } from 'd3-ng2-service';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit {

	private d3: D3;
	private parentNativeElement: any;
	private svg;


 	constructor(element: ElementRef, d3Service: D3Service) {
 		this.d3 = d3Service.getD3(); // <-- obtain the d3 object from the D3 Service
    	this.parentNativeElement = element.nativeElement;

 	}


	 ngOnInit() {
		

 	}
}
