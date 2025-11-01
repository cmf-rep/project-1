import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EclassPage } from './eclass.page';

describe('EclassPage', () => {
  let component: EclassPage;
  let fixture: ComponentFixture<EclassPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EclassPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
