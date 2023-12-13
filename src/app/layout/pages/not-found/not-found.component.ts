import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { RegistryIconService } from '@nikosoftware/core-ui';
import { uiIconHome } from '@nikosoftware/core-ui/svg-icons';

@Component({
  selector: 'app-not-found',
  template: `
    <ui-typescale
      class="NotFound-code"
      type="display"
      size="large"
      text="404" />
    <ui-typescale
      class="NotFound-message"
      type="headline"
      size="large"
      [text]="message" />
    <ui-button
      class="NotFound-button"
      variant="outlined"
      type="button"
      icon="home"
      text="Volver al inicio"
      (click)="onClickButton()" />
  `,
  styles: `
    :host {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      color: var(--m3-on-surface);
      height: 100%;

      & .NotFound-code {
        font-weight: 700;
      }

      & .NotFound-message {
        font-weight: 200;
      }

      & .NotFound-button {
        padding-top: 8px;
      }
    }
  `,
})
export class NotFoundComponent implements OnInit {
  readonly #registryIconService = inject(RegistryIconService);
  readonly #router = inject(Router);
  message = 'Esta página no existe';

  ngOnInit(): void {
    this.#registryIconService.registerIcons([uiIconHome]);
  }

  onClickButton() {
    this.#router.navigate(['/']);
  }
}
