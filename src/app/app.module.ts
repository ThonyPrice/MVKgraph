import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { AlertModule } from 'ng2-bootstrap';

import { AppComponent } from './app.component';
import { SearchComponent } from './search/search.component';
import { StartComponent } from './start/start.component';
import { CourseNodeComponent } from './course-node/course-node.component';
import { TranslationService } from './translation.service';
import { SearchService } from './search.service';
import { GraphComponent } from './graph/graph.component';

@NgModule({
    declarations: [
        AppComponent,
        SearchComponent,
        StartComponent,
        CourseNodeComponent,
        GraphComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        JsonpModule,
        AlertModule.forRoot()
    ],
    providers: [
        TranslationService,
        SearchService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
