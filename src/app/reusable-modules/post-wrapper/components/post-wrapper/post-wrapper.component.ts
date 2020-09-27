import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

import { DialogService } from '@core/services';
import { ROUTES } from '../../../../consts';
import { IPost, IRoutes } from '../../../../interfaces';

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
  editForm: FormGroup;
  formVisibility: boolean;
  image: File;
  file: File;
  postEditing: boolean;
  readonly routes: IRoutes;

  constructor(private dialogService: DialogService) {
    this.sendUpdate = new EventEmitter<{ id: number; data: FormData }>();
    this.sendDelete = new EventEmitter<{ id: number }>();
    this.routeToPost = new EventEmitter<{ id: number }>();
    this.routes = ROUTES;
  }

  ngOnInit(): void {
    this.editForm = new FormGroup({
      content: new FormControl(this.post.content, Validators.required),
    });
    this.postEditing = false;
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
