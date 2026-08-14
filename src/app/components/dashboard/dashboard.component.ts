import { Component, NgZone, inject, ChangeDetectionStrategy } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivityTypes } from 'src/app/models/activity-types';
import { InformationTypes } from 'src/app/models/information-types';
import { DashboardListDialogComponent } from '../dashboard-list-dialog/dashboard-list-dialog.component';
import {
  MatActionList,
  MatListSubheaderCssMatStyler,
  MatListItem,
  MatListItemIcon,
  MatListItemTitle,
  MatListItemLine,
} from '@angular/material/list';
import { MatIcon } from '@angular/material/icon';
import { MatDivider } from '@angular/material/divider';
import { DbService } from 'src/app/services/db.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'ogs-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [
    MatActionList,
    MatListSubheaderCssMatStyler,
    MatListItem,
    MatIcon,
    MatListItemIcon,
    MatListItemTitle,
    MatListItemLine,
    MatDivider,
  ],
})
export class DashboardComponent {
  dialog = inject(MatDialog);
  readonly zone = inject(NgZone);
  readonly dbService = inject(DbService);
  readonly toastService = inject(ToastService);

  ActivityTypes = ActivityTypes;
  InformationTypes = InformationTypes;

  exportDatabase() {
    const target = this.dbService.exportDatabase();

    // Empty when the user cancelled the save dialog.
    if (!target) return;

    this.toastService.showSuccessToast('Export erfolgreich', `Die Datenbank wurde gespeichert unter: ${target}`);
  }

  importDatabase() {
    const source = this.dbService.importDatabase();

    if (source === 'invalid') {
      this.toastService.showErrorToast('Import fehlgeschlagen', 'Die gewählte Datei ist keine gültige Datenbank.');
    }

    // On success the app restarts, so there is no success toast to show here.
  }

  openDialog(type?: ActivityTypes | InformationTypes) {
    const config = new MatDialogConfig();
    config.autoFocus = false;
    config.data = type;

    this.zone.run(() => {
      this.dialog.open(DashboardListDialogComponent, config);
    });
  }
}
