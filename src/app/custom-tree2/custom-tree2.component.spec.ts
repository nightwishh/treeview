import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomTree2Component } from './custom-tree2.component';

describe('CustomTree2Component', () => {
  let component: CustomTree2Component;
  let fixture: ComponentFixture<CustomTree2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomTree2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomTree2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
