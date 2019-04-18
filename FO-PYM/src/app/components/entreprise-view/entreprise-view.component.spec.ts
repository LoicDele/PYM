import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntrepriseViewComponent } from './entreprise-view.component';

describe('EntrepriseViewComponent', () => {
  let component: EntrepriseViewComponent;
  let fixture: ComponentFixture<EntrepriseViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntrepriseViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntrepriseViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
