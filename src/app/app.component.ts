import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddEditBillComponent } from './add-edit-bill-component/add-edit-bill.component';
import { ExpenseService } from './expense.service';
import { Units } from './shared/model/Units';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  units: Units[] = [];

  constructor(private dialog: MatDialog, private expenseService: ExpenseService) { }

  ngOnInit() {
    this.expenseService.getUnits().subscribe((data: any) => {
      this.units = data;
    })
  }

  onAddBill(): void {
    const addBillDialog = this.dialog.open(AddEditBillComponent, {
      disableClose: true,
      panelClass: 'add-bill-container',
      minHeight: 'calc(100vh - 90px)',
      height: 'auto',
      data: {
        units: this.units
      }
    });
  }
}
