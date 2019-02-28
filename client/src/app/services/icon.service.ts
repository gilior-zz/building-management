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
    iconRegistry.addSvgIcon(
      'done',
      sanitizer.bypassSecurityTrustResourceUrl('/assets/done.svg'));
    iconRegistry.addSvgIcon(
      'saved',
      sanitizer.bypassSecurityTrustResourceUrl('/assets/saved.svg'));
    iconRegistry.addSvgIcon(
      'add_contact',
      sanitizer.bypassSecurityTrustResourceUrl('/assets/add_contact.svg'));
  }
}
