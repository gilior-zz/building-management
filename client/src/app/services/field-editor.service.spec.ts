import { TestBed } from '@angular/core/testing';

import { FieldEditorService } from './field-editor.service';

describe('FieldEditorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FieldEditorService = TestBed.get(FieldEditorService);
    expect(service).toBeTruthy();
  });
});
