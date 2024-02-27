import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { ClientsService } from './clients.service';
import { DemoFlexyModule } from 'src/app/demo-flexy-module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FeatherModule } from 'angular-feather';
import { ClientFilterPipe } from './client.filter.pipe';


@Component({
  selector: 'app-clients',
  standalone: true,
  imports:[DemoFlexyModule,CommonModule,FormsModule,HttpClientModule,FeatherModule],
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent {
  loading: boolean = false;
  isVisibleFrom: boolean = false;
  isVisibleFormEdit: boolean = false;
  errorMessage: string = '';

  searchTerm: string = '';
  clients: any[] = [];
  newClient = {
    firstName: '',
    lastName: '',
    email:'',
    contact:'',
    role:'Client',
    confirmPassword:'',
    password:''
  }
  trueClient = {
    firstName: '',
    lastName: '',
    email:'',
    contact:'',
    role:'',
    password:''
  }
  editingClient: any = null;

  constructor(private clientService: ClientsService, private filterClient: ClientFilterPipe){}
  
  ngOnInit(){
    this.loadClient();
  }

  loadClient(){
    this.clientService.getAllClientsManager().subscribe(
      (response)=>{
        this.clients = response;
        console.log(response);
      }
    )
  }

  filterClients(){
    if (this.searchTerm === '') {
      this.loadClient();
    } else {
      this.clients = this.filterClient.transform(this.clients, this.searchTerm);
    }
  }

  onSearchChange() {
    this.filterClients();
  }

  onSumbit(){
    if(this.newClient.confirmPassword == this.newClient.password){
      this.trueClient = {
        firstName: this.newClient.firstName,
        lastName: this.newClient.lastName,
        email: this.newClient.email,
        contact:this.newClient.contact,
        role:this.newClient.role,
        password:this.newClient.password
      }
      this.clientService.createClient(this.trueClient).subscribe(
        (response)=>{
          this.loading = true;
          this.loadClient();
          this.isVisibleFrom  = false;
          console.log('Client cree avec successe',response);
        },
        (error)=>{
          console.log('Rendez vous cree avec successe',error);
        },
        ()=>{
          this.loading = false;
        }
      )
      this.trueClient = {firstName: '',lastName: '',email:'',contact:'',role:'',password:''};
      this.newClient = {firstName: '',lastName: '',email:'',contact:'',role:'Client',confirmPassword:'',password:''}
      this.errorMessage = '';
    }else{
      this.errorMessage = 'Mot passe incorrect!';
    }
  }

  onSumbitUpdate(){
    const updateData = {
      firstName: this.trueClient.firstName,
      lastName: this.trueClient.lastName,
      email: this.trueClient.email,
      contact: this.trueClient.contact
    };
    this.clientService.updateClient(this.editingClient._id, updateData).subscribe(
      (response) => {
        this.loadClient();
      },
      (error) => {
        console.error('Erreur lors de la mise à jour du client :', error);
      }
    );
    this.isVisibleFormEdit = false;
    this.trueClient = {firstName: '',lastName: '',email:'',contact:'',role:'',password:''};
  }


  onDelete(clientId: string){
    this.clientService.deleteClient(clientId).subscribe(
      (response)=>{
        this.loadClient();
      },
      (error)=>{
        console.log('Erreur lors de la suppression',error);
      }
    )
  }

  openNewClient(){
    this.isVisibleFrom = !this.isVisibleFrom;
  }

  closeNewClient(){
    this.isVisibleFrom = false;
  }

  closeEditClient(){
    this.isVisibleFormEdit = false;
  }

  onEdit(client: any){
    this.trueClient = {
      firstName: client.firstName,
      lastName: client.lastName,
      email: client.email,
      contact:client.contact,
      role:client.role,
      password:client.password
    }
    this.editingClient = client;
    this.isVisibleFormEdit = !this.isVisibleFormEdit;
  }

}
