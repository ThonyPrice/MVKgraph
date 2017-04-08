import { Component, OnInit } from '@angular/core';

import { Course } from '../course';
import { TranslationService } from '../translation.service';
import { SearchService } from '../search.service';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})

export class StartComponent implements OnInit {

    selectedLanguage: string;
    texts: Object;
    courses: Course[];
    errorMessage: string;
    mode = 'Observable';

    constructor(
        private translationService: TranslationService,
        private searchService: SearchService
    ) { }

    ngOnInit() {
        this.selectedLanguage = "eng";
        this.texts = this.translationService.getEngText();
    }

    searchCourse(course: string) {
        this.searchService.searchCourse(course)
            .subscribe(
              courses => this.courses = courses,
              error => this.errorMessage = <any>error
        );
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
