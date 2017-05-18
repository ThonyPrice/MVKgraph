import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import { PopoverModule } from "ngx-popover";

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
    loading: boolean;
    nrResults: number;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private translationService: TranslationService,
        private searchService: SearchService
    ) { }
    
    ngOnInit() {

        this.loading = true;
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
                this.loading = false;
                this.searchResult = courses
                if (!courses[0] && this.lastQuery != null) {
                    this.emptyResult = true;
                } else {
                    this.emptyResult = false;
                    this.nrResults = courses.length;
                }
            });
    }

    searchCourse(course: string) {
        this.loading = true;
        this.nrResults = 0;
        this.searchResult = [];
        if (course != "") {
            this.searchService.searchCourse(course)
                .subscribe(
                courses => {
                    this.loading = false;
                    if (courses[0]) {
                        this.searchResult = courses;
                        this.emptyResult = false;
                        this.nrResults = courses.length;
                    } else {
                        this.emptyResult = true;
                    }
                },
                error => this.errorMessage = <any>error
                );
        } else {
            this.loading = false;
            this.emptyResult = true;
        }
    }

    
    changeLanguage() {
        this.texts = this.translationService.switchLanguage();
        this.selectedLanguage = this.translationService.getLanguage();
    }

    reroute(course: string) {
        this.router.navigate(['/start', course]);
    }
}
