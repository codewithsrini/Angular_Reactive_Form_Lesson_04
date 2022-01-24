import { Component, ElementRef, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CustomValidators } from '../shared/custom-validators';
import { Units } from '../shared/model/Units';

@Component({
  selector: 'app-add-edit-bill',
  templateUrl: './add-edit-bill.component.html',
  styleUrls: ['./add-edit-bill.component.scss']
})
export class AddEditBillComponent implements OnInit {

  expenseForm: FormGroup;
  units: Units[] = [];

  constructor(private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: { units: Units[] }) {

    this.expenseForm = this.fb.group({
      amount: [''],
      billNumber: [''],
      billSettled: true,
      particular: ['', Validators.required],
      purchaseDate: ['', Validators.required],
      quantity: ['', [Validators.required, Validators.pattern(/^\d+\.?\d*$/)]],
      ratePerUnit: ['', Validators.required],
      shopName: ['', [Validators.required, Validators.minLength(3), CustomValidators.checkForWhitespace]],
      unit: ['', Validators.required],
    });

    if (data.units) {
      this.units = data.units;
    }
  }

  ngOnInit(): void {
  }

  onControlChange(event: any): void {

    if (event.srcElement) {
      const controlName = event.srcElement.name;

      if (controlName === 'quantity' || controlName === 'ratePerUnit') {
        this.calculateAmount();
      }
    }
  }

  calculateAmount() {
    const quantity = this.expenseForm.get('quantity');
    const ratePerUnit = this.expenseForm.get('ratePerUnit');
    const amount = this.expenseForm.get('amount');

    amount?.setValue('');

    if (quantity?.value && ratePerUnit?.value) {
      const amt = quantity.value * ratePerUnit.value;
      amount?.setValue(amt);
    }
  }

  onSave(): void {
    console.log(this.expenseForm);
    console.log(this.expenseForm.get('shopName')?.errors);
  }
}
