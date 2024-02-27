import { Component } from '@angular/core';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-chiffre-affaire',
  templateUrl: './chiffre-affaire.component.html',
  styleUrls: ['./chiffre-affaire.component.scss']
})
export class ChiffreAffaireComponent {
  dateJour: any;
  dateMois: any;
  chiffreAffaireParJour: any;
  chiffreAffaireParMois: any;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.dateJour = new Date().toISOString().slice(0, 10);
    this.dateMois = new Date().toISOString().slice(0, 7);
    this.updateChiffreAffaireParJour();
    this.updateChiffreAffaireParMois();
  }

  updateChiffreAffaireParJour() {
    this.userService.getCAPJ(this.dateJour).subscribe(
      (response: any) => {
        this.chiffreAffaireParJour = response;
      }
    );
  }

  updateChiffreAffaireParMois() {
    this.userService.getCAPM(this.dateMois).subscribe(
      (response: any) => {
        this.chiffreAffaireParMois = response;
      }
    );
  }
}
