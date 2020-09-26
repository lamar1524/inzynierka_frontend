import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { DialogService } from '@core/services';
import { IComment, IUser } from '../../../../interfaces';
import { selectCommentDeleting, selectCommentEditing, PostsModuleState } from '../../store';
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
  commentDeleting$: Observable<boolean>;

  constructor(private store: Store<PostsModuleState>, private cdRef: ChangeDetectorRef, private dialogService: DialogService) {
    this.dropdownVisible = false;
    this.commentEditing$ = this.store.select(selectCommentEditing).pipe(
      tap((res) => {
        res ? this.editForm.disable() : this.editForm.enable();
        this.cdRef.markForCheck();
      }),
    );
    this.commentDeleting$ = this.store.select(selectCommentDeleting);
  }

  ngOnInit(): void {
    this.editForm = new FormGroup({
      content: new FormControl(this.comment.content),
    });
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

  editButton(event) {
    this.formVisibility = true;
  }

  deleteButton(event) {
    this.dialogService.showDialog({
      header: 'Jesreś pewien?',
      caption: 'Tej operacji nie da się cofnąć',
      loadingSelect: this.commentDeleting$,
      onAcceptCallback: () => {
        this.store.dispatch(
          postsActions.deleteComment({ id: this.comment.id, refreshAction: postsActions.loadComments({ url: null, id: this.postId }) }),
        );
      },
    });
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
