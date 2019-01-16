import {Component, Input, OnInit} from '@angular/core';
import {AbstractControl, FormGroup} from "@angular/forms";
import {Subject} from "rxjs";
import {debounceTime, distinctUntilChanged} from "rxjs/operators";
import {FieldEditorService} from "../../../services/field-editor.service";


@Component({
  selector: 'app-info-form-field',
  templateUrl: './info-form-field.component.html',
  styleUrls: ['./info-form-field.component.scss'],
  providers: [FieldEditorService]
})
export class InfoFormFieldComponent implements OnInit {
  @Input() formGroup: FormGroup
  @Input() userIsTenant: boolean

  isEditing: boolean;
  private searchText$ = new Subject<string>();

  constructor(private fieldEditorService: FieldEditorService) {
  }

  get abstractControl(): AbstractControl {
    return this.fieldEditorService.formField;
  }

  @Input() set abstractControl(ctrl: AbstractControl) {
    this.fieldEditorService.formField = ctrl;
  }

  @Input() set ctrlName(name: string) {
    this.fieldEditorService.ctrlName = name;
  }

  ngOnInit() {
    this.searchText$.pipe(
      debounceTime(500),
      distinctUntilChanged())
      .subscribe(i => {
        console.log(i);
        this.isEditing = false;
        this.fieldEditorService.saveValue();

      })
  }

  onKeyUp(target: HTMLInputElement) {
    this.isEditing = true;
    this.searchText$.next(target.value);
  }

}
