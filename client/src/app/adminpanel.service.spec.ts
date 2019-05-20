import { TestBed } from '@angular/core/testing';

import { AdminpanelService } from './adminpanel.service';

describe('AdminpanelService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdminpanelService = TestBed.get(AdminpanelService);
    expect(service).toBeTruthy();
  });
});
