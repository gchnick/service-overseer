import { Component, OnInit, inject } from '@angular/core';
import { RegistryIconService, Section } from '@nikosoftware/core-ui';
import {
  uiIconAdd,
  uiIconMap,
  uiIconMapFill,
} from '@nikosoftware/core-ui/svg-icons';

const MENU: ReadonlyArray<Section> = [
  {
    headline: 'Superintendente de servicio',
    destinations: [
      {
        label: 'Territorios',
        router: ['/', 'territory'],
        icon: { active: 'map_fill', inactive: 'map' },
      },
    ],
  },
];

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.base.css', './layout.component.css'],
})
export class LayoutComponent implements OnInit {
  readonly #registryIconService = inject(RegistryIconService);
  menu = MENU;

  ngOnInit(): void {
    this.#registryIcons();
  }

  #registryIcons() {
    this.#registryIconService.registerIcons([
      uiIconMap,
      uiIconMapFill,
      uiIconAdd,
    ]);
  }
}
