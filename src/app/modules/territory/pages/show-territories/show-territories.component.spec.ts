import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowTerritoriesComponent } from './show-territories.component';

describe('ShowTerritoriesComponent', () => {
  let component: ShowTerritoriesComponent;
  let fixture: ComponentFixture<ShowTerritoriesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowTerritoriesComponent],
    });
    fixture = TestBed.createComponent(ShowTerritoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
