import { Component } from '@angular/core';
import { SpecialOfferService } from './special-offer.service';
import { ServicesService } from '../services/services.service';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-special-offer',
  templateUrl: './special-offer.component.html',
  styleUrls: ['./special-offer.component.scss']
})
export class SpecialOfferComponent {
  specialOffers: any[] = [];

  services: any[] = [];

  isNewSpecialOfferVisible: boolean = false;

  newSpecialOffer = {
    serviceId: '',
    discount: '',
    date_from: '',
    date_to: '',
    description: ''
  };

  editingSpecialOffer: any = null;

  constructor(private serviceService: ServicesService, private specialOfferService: SpecialOfferService) {
    this.loadSpecialOffers();
    this.serviceService.getAllServices().subscribe((services) => {
      this.services = services;
    });


  }

  loadSpecialOffers() {
    this.specialOfferService.getSpecial().subscribe(
      (response: any) => {
        this.specialOffers = response.data;
      }
    )
  };

  openNewSpecialOffer() {
    this.isNewSpecialOfferVisible = !this.isNewSpecialOfferVisible;
    this.newSpecialOffer = {
      serviceId: '',
      discount: '',
      date_from: '',
      date_to: '',
      description: ''
    };
  }

  closeNewSpecialOffer() {
    this.isNewSpecialOfferVisible = false;
  }

  onSubmitNewSpecialOffer() {
    if (this.editingSpecialOffer) {
      this.specialOfferService.updateSpeciale(this.editingSpecialOffer._id, this.newSpecialOffer).subscribe(
        (response) => {
          this.loadSpecialOffers();
          console.log('Offre spéciale modifié avec succès :', response);
        },
        (error) => {
          console.log('Erreur lors de la modification de l offre speciale :', error);
        }
      )

      this.newSpecialOffer = {
        serviceId: '',
        discount: '',
        date_from: '',
        date_to: '',
        description: ''
      };

      this.editingSpecialOffer = null;
      this.isNewSpecialOfferVisible = false;

    } else {
      this.specialOfferService.createSpeciale(this.newSpecialOffer).subscribe(
        (response) => {
          this.loadSpecialOffers();
          this.isNewSpecialOfferVisible = false;
          console.log('Offre speciale créée avec succes', response);
        },
        (error) => {
          console.log('Erreur lors de la création de l offre speciale:', error);
        }
      )
    }
  }

  onDelete(specialOfferId: string) {
    this.specialOfferService.deleteSpeciale(specialOfferId).subscribe(
      (response) => {
        this.loadSpecialOffers();
        console.log('Offre spéciale supprimée avec succes', response);
      },
      (error) => {
        console.log('Erreur lors de la suppression: ', error);
      }
    )
  }

  onEdit(special: any): void {
    this.editingSpecialOffer = {
      _id: special._id,
      serviceId: special.serviceId._id,
      discount: special.discount,
      date_from: this.formatIsoDateToHtmlDate(special.date_from),
      date_to: this.formatIsoDateToHtmlDate(special.date_to),
      description: special.description
    }

    this.newSpecialOffer = {
      serviceId: special.serviceId._id,
      discount: special.discount,
      date_from: this.formatIsoDateToHtmlDate(special.date_from),
      date_to: this.formatIsoDateToHtmlDate(special.date_to),
      description: special.description
    }

    this.isNewSpecialOfferVisible = !this.isNewSpecialOfferVisible;
  }

  formatIsoDateToHtmlDate(date: any): any {
    const isoDate = date;
    return isoDate.split('T')[0];
  }

}
