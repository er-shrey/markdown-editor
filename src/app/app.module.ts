import { AppRoutingRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MarkdownModule, MarkedOptions, MarkedRenderer } from 'ngx-markdown';

import { AppComponent } from './app.component';
import { AngularMarkdownEditorModule } from '../lib/angular-markdown-editor/angular-markdown-editor.module';
import { ReactiveComponent } from './reactive/reactive.component';

@NgModule({
  declarations: [
    AppComponent,
    ReactiveComponent
  ],
  imports: [
    AppRoutingRoutingModule,
    BrowserModule,
    FormsModule,
    MarkdownModule.forRoot({
      provide: MarkedOptions,
      useFactory: (): MarkedOptions => {
        return {
          renderer: new MarkedRenderer(),
          gfm: true,
          tables: true,
          breaks: false,
          pedantic: false,
          sanitize: false,
          smartLists: true,
          smartypants: false,
        };
      },
    }),
    ReactiveFormsModule,
    AngularMarkdownEditorModule.forRoot({
      iconlibrary: 'glyph'
    })
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
