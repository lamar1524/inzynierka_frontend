import { DOCUMENT } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  HostListener,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ROUTES } from '@core/consts';
import { Observable, Subscription } from 'rxjs';

import { IPost, IRoutes } from '@core/interfaces';
import { DialogService } from '@core/services';

@Component({
  selector: 'app-post-wrapper',
  templateUrl: './post-wrapper.component.html',
  styleUrls: ['./post-wrapper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostWrapperComponent implements OnInit {
  @Input() post: IPost;
  @Input() isOwner: boolean;
  @Input() isOwnerOrAdmin: boolean;
  @Input() postEditing$: Observable<boolean>;
  @Input() postDeleting$: Observable<boolean>;
  @Input() withRoute: boolean;
  @Input() withGroup: boolean;
  @Output() routeToPost: EventEmitter<{ id: number }> | null;
  @Output() sendDelete: EventEmitter<{ id: number }>;
  @Output() sendUpdate: EventEmitter<{ id: number; data: FormData }>;
  dropdownVisible: boolean;
  editForm: FormGroup;
  formVisibility: boolean;
  image: File;
  file: File;
  postEditing: boolean;
  readonly routes: IRoutes;

  constructor(@Inject(DOCUMENT) private document: Document, private dialogService: DialogService, private cdRef: ChangeDetectorRef) {
    this.sendUpdate = new EventEmitter<{ id: number; data: FormData }>();
    this.sendDelete = new EventEmitter<{ id: number }>();
    this.routeToPost = new EventEmitter<{ id: number }>();
    this.dropdownVisible = false;
    this.routes = ROUTES;
  }

  ngOnInit(): void {
    this.editForm = new FormGroup({
      content: new FormControl(this.post.content, Validators.required),
    });
    this.postEditing = false;
  }

  dropdownToggle(event) {
    event.stopPropagation();
    this.dropdownVisible = !this.dropdownVisible;
    if (this.dropdownVisible) {
      window.addEventListener('click', this.hideDropdown);
    }
    this.cdRef.markForCheck();
  }

  hideDropdown = (event) => {
    this.dropdownVisible = false;
    window.removeEventListener('click', this.hideDropdown);
    this.cdRef.markForCheck();
  };

  hoverOption(event) {
    event.target.classList.add('u-item--hover');
  }

  unHoverOption(event) {
    event.target.classList.remove('u-item--hover');
  }

  editButton() {
    this.formVisibility = true;
  }

  deleteButton() {
    this.dialogService.showDialog({
      header: 'Jesteś pewien?',
      caption: 'Tej operacji nie da sie cofnąć',
      onAcceptCallback: () => {
        this.sendDelete.emit({ id: this.post.id });
      },
      loadingSelect: this.postDeleting$,
    });
  }

  hideForm() {
    this.editForm.get('content').setValue(this.post.content);
    this.formVisibility = false;
  }

  updatePost($event: { data: FormData }) {
    this.sendUpdate.emit({ id: this.post.id, data: $event.data });
  }
}
