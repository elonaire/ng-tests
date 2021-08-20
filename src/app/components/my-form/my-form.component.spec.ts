import {ComponentFixture, TestBed} from '@angular/core/testing';
import {FormBuilder, FormsModule, ReactiveFormsModule} from '@angular/forms';

import {MyFormComponent} from './my-form.component';

describe('MyFormComponent', () => {
  let component: MyFormComponent;
  let fixture: ComponentFixture<MyFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MyFormComponent],
      providers: [{provide: FormBuilder, useClass: FormBuilder}],
      imports: [FormsModule, ReactiveFormsModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // should render the form
  it('should render the form', () => {
    const compiled = fixture.debugElement.nativeElement;
    const userNameInput = compiled.querySelector('#username');
    const passwordInput = compiled.querySelector('#password');
    const loginButton = compiled.querySelector('#login-button');

    expect(userNameInput).toBeTruthy();
    expect(passwordInput).toBeTruthy();
    expect(loginButton).toBeTruthy();
  });

  // should fill the form to be valid
  it('should fill the form to be valid', () => {
    const form = component.form;
    const nameInput = form.controls.username;
    const passwordInput = form.controls.password;
    expect(form.valid).toBeFalsy();

    // set form field values to be valid
    nameInput.setValue('tenka'); // min 3 chars
    passwordInput.setValue('tenka95'); // min 3 chars max 10 chars

    expect(form.valid).toBeTruthy();
  });

  // should submit the form
  it('should submit the form', () => {
    const compiled = fixture.debugElement.nativeElement;
    const form = component.form;
    const loginButton = compiled.querySelector('#login-button');
    const nameInput = form.controls.username;
    const passwordInput = form.controls.password;

    nameInput.setValue('tenka');
    passwordInput.setValue('tenka95');
    fixture.detectChanges(); // trigger change detection

    // spy on the login method through the button's click event
    spyOn(component, 'login').and.callThrough();
    loginButton.click();

    expect(component.login).toHaveBeenCalled();
  });
});
