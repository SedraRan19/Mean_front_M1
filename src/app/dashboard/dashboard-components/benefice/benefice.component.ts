import { Component } from '@angular/core';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-benefice',
  templateUrl: './benefice.component.html',
  styleUrls: ['./benefice.component.scss']
})
export class BeneficeComponent {
  dateJour: any;
  dateMois: any;
  commissionParJour: any;
  commissionParMois: any;
  depenseParJour: any;
  depenseParMois: any;
  beneficeParJour: any;
  beneficeParMois: any;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.dateJour = new Date().toISOString().slice(0, 10);
    this.dateMois = new Date().toISOString().slice(0, 7);
    this.updateParJour();
    this.updateParMois();
  }

  updateParJour() {
    this.userService.getBPJ(this.dateJour).subscribe(
      (response: any) => {
        this.commissionParJour = response.totalCommission;
        this.depenseParJour = response.totalExpenses;
        this.beneficeParJour = response.benefice;
      }
    );
  }

  updateParMois() {
    this.userService.getBPM(this.dateMois).subscribe(
      (response: any) => {
        this.commissionParMois = response.totalCommission;
        this.depenseParMois = response.totalExpenses;
        this.beneficeParMois = response.benefice;
      }
    );
  }
}
