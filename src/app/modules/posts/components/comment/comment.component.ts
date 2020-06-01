import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, HostListener, Inject, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { IComment, IUser } from '@core/interfaces';

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
  dropdownVisible: boolean;
  formVisibility: boolean;
  editForm: FormGroup;

  constructor(@Inject(DOCUMENT) private document: Document) {
    this.dropdownVisible = false;
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

  submitEdit() {}

  cancel() {
    this.editForm.get('content').setValue(this.comment.content);
    this.formVisibility = false;
  }
}
