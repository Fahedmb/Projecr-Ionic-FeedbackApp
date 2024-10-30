import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PresenterhomePage } from './presenterhome.page';

describe('PresenterhomePage', () => {
  let component: PresenterhomePage;
  let fixture: ComponentFixture<PresenterhomePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PresenterhomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
