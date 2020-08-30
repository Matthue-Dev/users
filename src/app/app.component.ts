import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'users';

  constructor(
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer
  ) {
    iconRegistry.addSvgIcon('apple', sanitizer.bypassSecurityTrustResourceUrl('../assets/logo-apple.svg'));
    iconRegistry.addSvgIcon('facebook', sanitizer.bypassSecurityTrustResourceUrl('../assets/logo-facebook.svg'));
    iconRegistry.addSvgIcon('google', sanitizer.bypassSecurityTrustResourceUrl('../assets/logo-google.svg'));
  }
}
