import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostListener, Inject, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { IComment, IUser } from '@core/interfaces';
import { selectCommentEditing, PostModuleState } from '../../store';
import * as postsActions from '../../store/posts.actions';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentComponent implements OnInit {
  @Input() comment: IComment;
  @Input() currentUser: IUser;
  @Input() isOwner: boolean;
  @Input() isOwnerOrAdmin: boolean;
  @Input() postId: number;
  dropdownVisible: boolean;
  formVisibility: boolean;
  editForm: FormGroup;
  commentEditing$: Observable<boolean>;

  constructor(@Inject(DOCUMENT) private document: Document, private store: Store<PostModuleState>, private cdRef: ChangeDetectorRef) {
    this.dropdownVisible = false;
    this.commentEditing$ = this.store.select(selectCommentEditing).pipe(
      tap((res) => {
        res ? this.editForm.disable() : this.editForm.enable();
        this.cdRef.markForCheck();
      }),
    );
  }

  ngOnInit(): void {
    this.editForm = new FormGroup({
      content: new FormControl(this.comment.content),
    });
  }

  dropdownToggle(event) {
    event.stopPropagation();
    this.dropdownVisible = !this.dropdownVisible;
  }

  @HostListener('window:click', ['$event']) hideDropdown(event) {
    const dropdown = this.document.querySelector('.dropdown');
    if (this.dropdownVisible && event.target !== dropdown) {
      this.dropdownVisible = false;
    }
  }

  hoverOption(event) {
    event.target.classList.add('u-item--hover');
  }

  unHoverOption(event) {
    event.target.classList.remove('u-item--hover');
  }

  editButton(event) {
    this.formVisibility = true;
  }

  deleteButton(event) {
    event.stopPropagation();
  }

  submitEdit() {
    if (this.editForm.get('content').value !== this.comment.content) {
      this.store.dispatch(
        postsActions.editComment({
          comment: this.editForm.value,
          id: this.comment.id,
          refreshAction: postsActions.loadComments({ url: null, id: this.postId }),
        }),
      );
    }
  }

  cancel() {
    this.editForm.get('content').setValue(this.comment.content);
    this.formVisibility = false;
  }
}
