import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AlertModule } from 'ng2-bootstrap';

import { AppComponent } from './app.component';
import { SearchComponent } from './search/search.component';
import { StartComponent } from './start/start.component';

@NgModule({
    declarations: [
        AppComponent,
        SearchComponent,
        StartComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        AlertModule.forRoot()
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
