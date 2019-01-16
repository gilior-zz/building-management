import { Injectable } from '@angular/core';
import {DomSanitizer} from "@angular/platform-browser";
import {MatIconRegistry} from "@angular/material";

@Injectable({
  providedIn: 'root'
})
export class IconService {

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon(
      'thumbs-up',
      sanitizer.bypassSecurityTrustResourceUrl('/assets/thumbup-icon.svg'));
    iconRegistry.addSvgIcon(
      'edit',
      sanitizer.bypassSecurityTrustResourceUrl('/assets/edit.svg'));
    iconRegistry.addSvgIcon(
      'smiley',
      sanitizer.bypassSecurityTrustResourceUrl('/assets/smiley.svg'));
    iconRegistry.addSvgIcon(
      'sad',
      sanitizer.bypassSecurityTrustResourceUrl('/assets/sad.svg'));
  }
}
