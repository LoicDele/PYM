import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SemagHeaderComponent } from './semag-header.component';

describe('SemagHeaderComponent', () => {
  let component: SemagHeaderComponent;
  let fixture: ComponentFixture<SemagHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SemagHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SemagHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
