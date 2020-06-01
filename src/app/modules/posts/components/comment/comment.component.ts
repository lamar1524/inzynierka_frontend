import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

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

  constructor() {}

  ngOnInit(): void {
  }
}
