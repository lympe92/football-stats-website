import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FooterInfoDialog } from 'src/app/shared/dialogs/footer-info-dialog/footer-info-dialog.component';
import { Post } from 'src/app/shared/models/post';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  constructor(private _router: Router, public dialog: MatDialog) {}

  onNavigateToUrl(value: string): void {
    this._router.navigate([value]);
  }

  onOpenFooterInfoDialog(value: string): void {
    const dialogRef = this.dialog.open(FooterInfoDialog, {
      maxWidth: '900px',
      height: '80%',
      width: '90%',
      data: {
        value: value,
      },
    });

    dialogRef.afterClosed().subscribe((post: Post) => {});
  }
}
