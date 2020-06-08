import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ROUTES } from '@core/consts';
import { IGroup } from '@core/interfaces/group.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent implements OnDestroy {
  private sub$: Subscription;
  searchForm: FormGroup;
  results: IGroup[];
  next: string;

  constructor(private route: ActivatedRoute, private router: Router) {
    this.sub$ = new Subscription();
    this.searchForm = new FormGroup({
      phrase: new FormControl(null, Validators.required),
    });
    const route$ = this.route.params.subscribe((param) => {
      const phrase = param.phrase;
      if (phrase.length > 0) {
        this.phrase.setValue(phrase);
      }
    });
    this.sub$.add(route$);
  }

  get phrase() {
    return this.searchForm.get('phrase');
  }

  search() {
    if (this.phrase.value) {
      this.router.navigate([ROUTES.search.path + this.phrase.value]);
    }
  }

  ngOnDestroy(): void {
    this.sub$.unsubscribe();
  }
}
