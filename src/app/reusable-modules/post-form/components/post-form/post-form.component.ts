import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostFormComponent implements OnInit {
  @Input() postProcessing$: Observable<boolean>;
  @Input() postId: number;
  @Input() startContent: string;
  @Output() submitPost: EventEmitter<{ data: FormData }>;
  @Output() hideForm: EventEmitter<void>;
  postProcessing: boolean;
  form: FormGroup;
  file: File;
  image: File;
  sub: Subscription;

  constructor(@Inject(DOCUMENT) private document: Document, private cdRef: ChangeDetectorRef) {
    this.submitPost = new EventEmitter<{ data: FormData; id: number }>();
    this.hideForm = new EventEmitter<void>();
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      content: new FormControl(this.startContent, Validators.required),
    });
    this.sub = this.postProcessing$.subscribe((res) => {
      res ? this.form.disable() : this.form.enable();
      this.postProcessing = res;
      this.cdRef.markForCheck();
    });
  }

  chooseImage() {
    const input = this.document.querySelector('.image__input');
    input.dispatchEvent(new MouseEvent('click'));
  }

  chooseFile() {
    const input = this.document.querySelector('.file__input');
    input.dispatchEvent(new MouseEvent('click'));
  }

  get content() {
    return this.form.get('content');
  }

  get data(): FormData {
    const fd = new FormData();
    fd.append('content', this.content.value);
    if (this.image) {
      fd.append('image', this.image);
    }
    if (this.file) {
      fd.append('file', this.file);
    }
    return fd;
  }

  imageChange($event) {
    this.image = $event.target.files[0];
  }

  fileChange($event) {
    this.file = $event.target.files[0];
  }
}
