import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestingconPage } from './testingcon.page';

describe('TestingconPage', () => {
  let component: TestingconPage;
  let fixture: ComponentFixture<TestingconPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TestingconPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
