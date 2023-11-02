import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TerritoryCardComponent } from './territory-card.component';

describe('TerritoryCardComponent', () => {
  let component: TerritoryCardComponent;
  let fixture: ComponentFixture<TerritoryCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TerritoryCardComponent],
    });
    fixture = TestBed.createComponent(TerritoryCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
