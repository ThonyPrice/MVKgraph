import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class SearchService {

    private searchBaseUrl = 'http://localhost:8080/search/';
    private getCourseBaseUrl = 'http://localhost:8080/course/';

    constructor(private http: Http) { }

    searchCourse(course: string): any {
        return this.http.get(this.searchBaseUrl.concat(course))
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));

    }

    getCourse(courseID: string): any {
        return this.http.get(this.getCourseBaseUrl.concat(courseID))
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

}