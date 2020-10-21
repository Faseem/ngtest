import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesItemConfComponent } from './sales-item-conf.component';

describe('SalesItemConfComponent', () => {
  let component: SalesItemConfComponent;
  let fixture: ComponentFixture<SalesItemConfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesItemConfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesItemConfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
