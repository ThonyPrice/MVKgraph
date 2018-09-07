import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseNodeComponent } from './course-node.component';

describe('CourseNodeComponent', () => {
  let component: CourseNodeComponent;
  let fixture: ComponentFixture<CourseNodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseNodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseNodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
