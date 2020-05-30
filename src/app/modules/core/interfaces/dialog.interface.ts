import { Observable } from 'rxjs';

export interface IDialogData {
  header: string;
  caption: string;
  loadingSelect: Observable<boolean>;
  onAcceptCallback: () => void;
}
