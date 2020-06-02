import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';

import { USER_ROLE } from '@core/enums';
import { IPost, IUser } from '@core/interfaces';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostsListComponent implements OnInit {
  @Input() isOwner: boolean;
  @Input() posts: IPost[];
  @Input() currentUser: IUser;
  @Input() postsLoading$: Observable<boolean>;
  @Input() postEditing$: Observable<boolean>;
  @Input() postDeleting$: Observable<boolean>;
  @Output() routeToPost: EventEmitter<{ id: number }>;
  @Output() sendPostUpdate: EventEmitter<{ id: number; data: FormData }>;
  @Output() sendPostDelete: EventEmitter<{ id: number }>;
  readonly adminRole: USER_ROLE;

  constructor() {
    this.adminRole = USER_ROLE.ADMIN;
    this.sendPostUpdate = new EventEmitter<{ id: number; data: FormData }>();
    this.sendPostDelete = new EventEmitter<{ id: number }>();
    this.routeToPost = new EventEmitter<{ id: number }>();
  }

  ngOnInit(): void {}

  getDeletePerm(post: IPost): boolean {
    return post.owner.id === this.currentUser.id || this.currentUser.role === USER_ROLE.ADMIN;
  }

  getEditPerm(post: IPost) {
    return post.owner.id === this.currentUser.id;
  }

  updatePost(data: { id: number; data: FormData }) {
    this.sendPostUpdate.emit(data);
  }
}
