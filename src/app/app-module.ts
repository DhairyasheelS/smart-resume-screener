import { NgModule, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { HomeComponent } from './home/home.component';
import { ScreenerComponent } from './screener/screener.component';
import { JobDescriptionComponent } from './job-description/job-description.component';
import { ResumeUploadComponent } from './resume-upload/resume-upload.component';
import { ResultsComponent } from './results/results.component';

@NgModule({
  declarations: [
    App,
    HomeComponent,
    ScreenerComponent,
    JobDescriptionComponent,
    ResumeUploadComponent,
    ResultsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideClientHydration(withEventReplay())
  ],
  bootstrap: [App]
})
export class AppModule { }
