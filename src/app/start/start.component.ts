import { Component, OnInit } from '@angular/core';

import { TranslationService } from '../translation.service'

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})

export class StartComponent implements OnInit {

    constructor(
        private translationService: TranslationService
    ) { }

    ngOnInit() {
        
    }

    searchCourse(course: string) {
        console.log(course);
    }

    texts = this.translationService.getEngText();

}
