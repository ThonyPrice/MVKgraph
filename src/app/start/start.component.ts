import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import {PopoverModule} from "ngx-popover";

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
    searchResult: any;
    errorMessage: string;
    lastQuery: string;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private translationService: TranslationService,
        private searchService: SearchService
    ) { }

    ngOnInit() {
        this.selectedLanguage = "eng";
        this.texts = this.translationService.getEngText();

        this.route.params.subscribe((params: Params) =>
            this.lastQuery = params['query']);

        this.route.params
            .switchMap((params: Params) => this.searchService.searchCourse(params['query']))
            .subscribe((courses: any) => this.searchResult = courses);
    }

    searchCourse(course: string) {
        this.searchService.searchCourse(course)
            .subscribe(
              courses => this.searchResult = courses,
              error => this.errorMessage = <any>error
        );
        this.router.navigate(['/start', course]);
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
