import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MarkdownService } from 'ngx-markdown';
import { EditorInstance, EditorOption } from '../../lib/angular-markdown-editor';

@Component({
  templateUrl: './reactive.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./reactive.component.scss']
})
export class ReactiveComponent implements OnInit {
  bsEditorInstance: EditorInstance;
  markdownText: string;
  showEditor = true;
  templateForm: FormGroup;
  editorOptions: EditorOption;

  constructor(
    private fb: FormBuilder,
    private markdownService: MarkdownService
  ) {}

  ngOnInit() {
    this.editorOptions = {
      autofocus: false,
      iconlibrary: 'fa',
      savable: false,
      height: window.innerHeight - 60,
      initialstate:'editor',
      fullscreen: {
        enable: false,
        icons: {}
      },
      onShow: (e) => this.bsEditorInstance = e,
      parser: (val) => this.parse(val)
    };

    // put the text completely on the left to avoid extra white spaces
    this.markdownText =`# Welcome to My Markdown Editor!
Hi! this is a demo Markdown file in this web application developed by **Shrey Kumar Jain**.
    
If you want to learn about this app, you can look into the github repository marked on the top right corner of this app. If you want to play with Markdown, you can edit this text.
    
Once you have finished with it, you are required to copy the editor text and place in you **README.md** file or any other file as per required.`;

    this.buildForm(this.markdownText);
    this.onFormChanges();
  }


  buildForm(markdownText) {
    this.templateForm = this.fb.group({
      body: [markdownText],
      isPreview: [true]
    });
  }

  /** highlight all code found, needs to be wrapped in timer to work properly */
  highlight() {
    setTimeout(() => {
      this.markdownService.highlight();
    });
  }

  hidePreview(e) {
    if (this.bsEditorInstance && this.bsEditorInstance.hidePreview) {
      this.bsEditorInstance.hidePreview();
    }
  }

  showFullScreen(isFullScreen: boolean) {
    if (this.bsEditorInstance && this.bsEditorInstance.setFullscreen) {
      this.bsEditorInstance.showPreview();
      this.bsEditorInstance.setFullscreen(isFullScreen);
    }
  }

  parse(inputValue: string) {
    const markedOutput = this.markdownService.compile(inputValue.trim());
    this.highlight();

    return markedOutput;
  }

  onFormChanges(): void {
    this.templateForm.valueChanges.subscribe(formData => {
      if (formData) {
        this.markdownText = formData.body;
      }
    });
  }
}
