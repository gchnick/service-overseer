import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TerritoryFormComponent } from './territory-form.component';

describe('TerritoryFormComponent', () => {
  let component: TerritoryFormComponent;
  let fixture: ComponentFixture<TerritoryFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TerritoryFormComponent]
    });
    fixture = TestBed.createComponent(TerritoryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
