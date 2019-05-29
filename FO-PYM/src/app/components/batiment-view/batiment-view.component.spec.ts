import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BatimentViewComponent } from './batiment-view.component';

describe('BatimentViewComponent', () => {
  let component: BatimentViewComponent;
  let fixture: ComponentFixture<BatimentViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BatimentViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BatimentViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
