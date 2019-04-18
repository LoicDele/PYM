import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SemagViewComponent } from './semag-view.component';

describe('SemagViewComponent', () => {
  let component: SemagViewComponent;
  let fixture: ComponentFixture<SemagViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SemagViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SemagViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
