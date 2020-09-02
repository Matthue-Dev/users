import { State } from './../../models/login-state.enum';
import { Component, OnInit } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss']
})
export class LoginDialogComponent implements OnInit {
  @Output() emitter = new EventEmitter<State>();

  form: FormGroup;

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      remember: [false]
    });
  }

  public get state(): typeof State { return State; }
  public get email(): AbstractControl { return this.form.get('email'); }
  public get password(): AbstractControl { return this.form.get('password'); }
  public get remember(): AbstractControl { return this.form.get('remember'); }

  login(): void {
    console.log(this.form.value);
  }

  emitState(state: State): void { this.emitter.emit(state); }
}
