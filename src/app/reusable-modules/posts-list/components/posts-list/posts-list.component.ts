import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { USER_ROLE } from '@core/enums';
import { IPost, IUser } from '@core/interfaces';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostsListComponent implements OnInit {
  @Input() postsLoading: boolean;
  @Input() posts: IPost[];
  @Input() currentUser: IUser;
  @Output() sendPostUpdate: EventEmitter<{ id: number; data: FormData }>;
  readonly adminRole: USER_ROLE;

  constructor() {
    this.adminRole = USER_ROLE.ADMIN;
    this.sendPostUpdate = new EventEmitter<{ id: number; data: FormData }>();
  }

  ngOnInit(): void {
    console.log(this.posts);
  }

  getPerm(post: IPost): boolean {
    return post.owner.id === this.currentUser.id || this.currentUser.role === USER_ROLE.ADMIN;
  }

  updatePost(data: { id: number; data: FormData }) {
    this.sendPostUpdate.emit(data);
  }
}
