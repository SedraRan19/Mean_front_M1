import { Component } from '@angular/core';
import { DepenseService } from './depense.service';

@Component({
  selector: 'app-depense',
  templateUrl: './depense.component.html',
  styleUrls: ['./depense.component.scss']
})
export class DepenseComponent {
  depenses: any[] = [];

  isNewDepenseVisible: boolean = false;

  newDepense = {
    name: '',
    amount: '',
    date: '',
    description: ''
  };

  editingDepense: any = null;

  constructor(private depenseService: DepenseService) {
    this.loadDepenses();
  }

  loadDepenses() {
    this.depenseService.getDepense().subscribe(
      (response: any) => {
        this.depenses = response.data;
      }
    )
  };

  openNewDepense() {
    this.isNewDepenseVisible = !this.isNewDepenseVisible;
    this.newDepense = {
      name: '',
      amount: '',
      date: '',
      description: ''
    };
  }

  closeNewDepense() {
    this.isNewDepenseVisible = false;
  }

  onSubmitNewDepense() {
    if (this.editingDepense) {
      this.depenseService.updateDepense(this.editingDepense._id, this.newDepense).subscribe(
        (response) => {
          this.loadDepenses();
          console.log('Dépense modifiée avec succès :', response);
        },
        (error) => {
          console.log('Erreur lors de la modification de le la dépense :', error);
        }
      )

      this.newDepense = {
        name: '',
        amount: '',
        date: '',
        description: ''
      };

      this.editingDepense = null;
      this.isNewDepenseVisible = false;

    } else {
      this.depenseService.createDepense(this.newDepense).subscribe(
        (response) => {
          this.loadDepenses();
          this.isNewDepenseVisible = false;
          console.log('Depense créée avec succes', response);
        },
        (error) => {
          console.log('Erreur lors de la création de la depense:', error);
        }
      )
    }
  }

  onDelete(depenseId: string) {
    this.depenseService.deleteDepense(depenseId).subscribe(
      (response) => {
        this.loadDepenses();
        console.log('Depense supprimée avec succes', response);
      },
      (error) => {
        console.log('Erreur lors de la suppression: ', error);
      }
    )
  }

  onEdit(depense: any): void {
    this.editingDepense = {
      _id: depense._id,
      name: depense.name,
      amount: depense.amount,
      date: this.formatIsoDateToHtmlDate(depense.date),
      description: depense.description
    }

    this.newDepense = {
      name: depense.name,
      amount: depense.amount,
      date: this.formatIsoDateToHtmlDate(depense.date),
      description: depense.description
    }

    this.isNewDepenseVisible = !this.isNewDepenseVisible;
  }

  formatIsoDateToHtmlDate(date: any): any {
    const isoDate = date;
    return isoDate.split('T')[0];
  }


}
