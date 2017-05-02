import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { AlertModule } from 'ng2-bootstrap';
import { D3Service } from 'd3-ng2-service';
import {PopoverModule} from "ngx-popover";

import { AppComponent } from './app.component';
import { StartComponent } from './start/start.component';
import { CourseNodeComponent } from './course-node/course-node.component';
import { TranslationService } from './translation.service';
import { SearchService } from './search.service';
import { GraphComponent } from './graph/graph.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CourseNotFoundComponent } from './course-not-found/course-not-found.component';

const appRoutes: Routes = [
    { path: 'start/:query', component: StartComponent },
    { path: 'start', component: StartComponent },
    { path: 'graph/:courseID', component: GraphComponent },
    {
        path: '',
        redirectTo: '/start',
        pathMatch: 'full'
    },
    { path: '**', component: PageNotFoundComponent }
];

@NgModule({
    declarations: [
        AppComponent,
        StartComponent,
        CourseNodeComponent,
        GraphComponent,
        PageNotFoundComponent,
        CourseNotFoundComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        JsonpModule,
        AlertModule.forRoot(),
        RouterModule.forRoot(appRoutes),
        PopoverModule
    ],
    providers: [
        TranslationService,
        SearchService, 
        D3Service
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
