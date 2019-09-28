import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PviewComponent } from './pview.component';

describe('PviewComponent', () => {
  let component: PviewComponent;
  let fixture: ComponentFixture<PviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
