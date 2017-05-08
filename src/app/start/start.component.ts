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

    texts: Object;
    selectedLanguage: string;
    searchResult: any;
    errorMessage: string;
    lastQuery: string;
    emptyResult: boolean;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private translationService: TranslationService,
        private searchService: SearchService
    ) { }
    
    ngOnInit() {

        this.emptyResult = false;

        this.selectedLanguage = this.translationService.getLanguage();
        if (this.selectedLanguage == undefined) {
            this.selectedLanguage = "eng";
            this.translationService.setLanguage(this.selectedLanguage);
        }

        this.texts = this.translationService.getText();

        this.route.params.subscribe((params: Params) =>
            this.lastQuery = params['query']);

        this.route.params
            .switchMap((params: Params) => this.searchService.searchCourse(params['query']))
            .subscribe((courses: any) => {
                this.searchResult = courses
                console.log(courses[0]);
                if (!courses[0] && this.lastQuery != null) {
                    console.log();
                    this.emptyResult = true;
                }
            });
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
        this.texts = this.translationService.switchLanguage();
        this.selectedLanguage = this.translationService.getLanguage();
    }
}
