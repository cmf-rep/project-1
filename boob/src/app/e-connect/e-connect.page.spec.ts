import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EConnectPage } from './e-connect.page';

describe('EConnectPage', () => {
  let component: EConnectPage;
  let fixture: ComponentFixture<EConnectPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EConnectPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
