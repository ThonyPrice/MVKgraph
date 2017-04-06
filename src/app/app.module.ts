import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AlertModule } from 'ng2-bootstrap';

import { AppComponent } from './app.component';
import { SearchComponent } from './search/search.component';
import { StartComponent } from './start/start.component';
import { CourseNodeComponent } from './course-node/course-node.component';
import { TranslationService } from './translation.service';

@NgModule({
    declarations: [
        AppComponent,
        SearchComponent,
        StartComponent,
        CourseNodeComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        AlertModule.forRoot()
    ],
    providers: [
        TranslationService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
