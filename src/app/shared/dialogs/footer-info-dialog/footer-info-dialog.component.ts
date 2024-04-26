import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-footer-info-dialog',
  templateUrl: './footer-info-dialog.component.html',
  styleUrls: ['./footer-info-dialog.component.scss'],
})
export class FooterInfoDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
