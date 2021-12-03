import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AppService } from '../app.service';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss']
})
export class AdminPageComponent implements OnInit, AfterViewInit{

  displayedColumns: string[] = ['id', 'displayName','type', 'uploader', 'available', 'actions'];
  dataSource: any[] = [];
  show:boolean = false
  selected:any;

  constructor(
    private service:AppService,
    private modalService: NgbModal,
    private snackBar: MatSnackBar,
  ) { }

  ngAfterViewInit(): void {
    this.loadData();
  }

  loadData(){
    this.service.getAllPictureData().subscribe((data: any)=>{
      this.dataSource = []
      for( let d of data){
        let availableForUserRole: boolean = false;

        for( let role of d.availability){
          if(role.name === 'ROLE_USER'){
            availableForUserRole = true;
            break;
          }
        }

        let row = {
          id: d.id,
          description: d.description,
          displayName: d.displayName,
          name: d.name,
          type: d.type,
          uploader: d.uploader,
          available: availableForUserRole
        };

        this.dataSource.push(row);
      }
      this.show = true;
    })
  }

  ngOnInit(): void {
  }

  view(row:any, modal:any){
    this.selected = row;
    this.modalService.open(modal);
  }

  changeVisibility(element:any){
    element.available = !element.available;
    console.log(element.available)
    this.service.changePictureVisibility(element.id, element.available).subscribe( 
      data =>{
        console.log(data)
        this.snackBar.open("Sikeres változtatás!", "Bezár");
        this.loadData();
      },
      err => {
        this.snackBar.open("Nem sikerült a változtatás!", "Bezár");
        this.loadData();
      }
    );
  }

  deletePic(element:any){
    this.service.delete(element.id).subscribe(
      data => {
        this.snackBar.open("Sikeres törlés!", "Bezár");
        this.loadData();
      }, 
      err =>{
        this.snackBar.open("Sikertelen törlés!", "Bezár");
        this.loadData();
      }
    );
  }

}
