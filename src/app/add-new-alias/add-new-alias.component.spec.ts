import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewAliasComponent } from './add-new-alias.component';

describe('AddNewAliasComponent', () => {
  let component: AddNewAliasComponent;
  let fixture: ComponentFixture<AddNewAliasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNewAliasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddNewAliasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
