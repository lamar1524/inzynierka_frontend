import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

import { IPost } from '@core/interfaces';

@Component({
  selector: 'app-post-wrapper',
  templateUrl: './post-wrapper.component.html',
  styleUrls: ['./post-wrapper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostWrapperComponent implements OnInit {
  @Input() post: IPost;
  constructor() {}

  ngOnInit(): void {
  }
}
