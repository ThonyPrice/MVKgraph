import { Component, OnInit } from '@angular/core';

import { TranslationService } from '../translation.service'

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})

export class StartComponent implements OnInit {

    selectedLanguage: string;
    texts: Object;

    constructor(
        private translationService: TranslationService
    ) { }

    ngOnInit() {
        this.selectedLanguage = "eng";
        this.texts = this.translationService.getEngText();
    }

    searchCourse(course: string) {
        console.log(course);
    }

    
    changeLanguage() {
        if (this.selectedLanguage == "eng") {
            this.texts = this.translationService.getSweText();
            this.selectedLanguage = "swe";
        } else {
            this.texts = this.translationService.getEngText();
            this.selectedLanguage = "eng";
        }
    }
}
