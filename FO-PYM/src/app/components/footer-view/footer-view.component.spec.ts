import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterViewComponent } from './footer-view.component';

describe('FooterViewComponent', () => {
  let component: FooterViewComponent;
  let fixture: ComponentFixture<FooterViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FooterViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
