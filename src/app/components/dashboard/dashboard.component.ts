import { Component, NgZone } from '@angular/core';
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

@Component({
  selector: 'ogs-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: true,
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
  ActivityTypes = ActivityTypes;
  InformationTypes = InformationTypes;

  constructor(
    public dialog: MatDialog,
    readonly zone: NgZone
  ) {}

  openDialog(type?: ActivityTypes | InformationTypes) {
    const config = new MatDialogConfig();
    config.autoFocus = false;
    config.data = type;

    this.zone.run(() => {
      this.dialog.open(DashboardListDialogComponent, config);
    });
  }
}
