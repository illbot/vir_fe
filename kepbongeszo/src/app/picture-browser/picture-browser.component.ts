import { AfterViewChecked, AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { AppService, FileData } from '../app.service';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner'
import { timeout } from 'rxjs/operators';
import { NgbModal, NgbToast } from '@ng-bootstrap/ng-bootstrap';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { TokenService } from '../token.service';


export interface FileHandle {
  file: File,
  url: SafeUrl
}

@Component({
  selector: 'app-picture-browser',
  templateUrl: './picture-browser.component.html',
  styleUrls: ['./picture-browser.component.scss']
})
export class PictureBrowserComponent implements OnInit, AfterViewChecked {

  snackBHorizontal: MatSnackBarHorizontalPosition = 'end';
  snackBVertical: MatSnackBarVerticalPosition = 'top';
  dataSource: [] | undefined | any;
  displayedData: [] | undefined | any;
  show = false;
  selected = {
    picture: undefined,
    title: undefined
  }
  files: File[]=[];
  fileSafeUrl:any;

  uploadDetails = {
    description: "",
    role: ['ROLE_ADMIN'],
    uploader: this.tokenService.getUser().id,
    user_visibility: false
  }

  constructor(
    private service: AppService,
    private modalService: NgbModal,
    private snackBar: MatSnackBar,
    private sanitizer: DomSanitizer,
    private tokenService: TokenService,
    ) { }

  ngAfterViewChecked(): void {

  }

  ngOnInit(): void {
    // Api callnál majd át kell tenni AfterViewInitbe
    this.dataSource = this.service.getPictures();
    this.displayedData = [...this.dataSource];
    console.log(this.displayedData);
    this.show = true;
  }

  zoom(data:any, modal:any){
    this.selected.picture = data.picture;
    this.selected.title = data.title;
    this.modalService.open(modal);
  }

  filterData(event: any){
    let filterValue = event.target.value;
    filterValue = filterValue.trim().toLowerCase();
    if(filterValue  == "" || filterValue == undefined || filterValue == null){
      this.displayedData = [...this.dataSource];
      return;
    }
    this.displayedData = this.dataSource.filter((element:any)=>{
      let title = element.title.trim().toLowerCase();
      return title.includes(filterValue) ? true : false;
    });
  }

  openUploadModal(modal: any){
    this.modalService.open(modal);
  }

  onPicSelect(event: any){
    if(this.files.length>=1){
      this.snackBar.open('Csak egy képet tölthetsz fel!','Close', {
        horizontalPosition: this.snackBHorizontal,
        verticalPosition: this.snackBVertical,
      });
    } else {
      this.files.push(...event.addedFiles);
      this.fileSafeUrl = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(this.files[0]));
      console.log(this.fileSafeUrl);
      console.log(this.files);
    }
  }

  onPicRemove(event: File){
    this.files.splice(this.files.indexOf(event), 1);
    this.fileSafeUrl = undefined;
  }

  uploadImage(){
    this.toBase64(this.files[0]).then(data=>{
      let fileData: FileData= {
        url: data,
        name: this.files[0].name,
        type: this.files[0].type
      }
      this.service.uploadImage(this.uploadDetails, fileData).subscribe(element => console.log(element));
    });

  }

  rbChange(){
    this.uploadDetails.user_visibility = !this.uploadDetails.user_visibility;
    if(this.uploadDetails.user_visibility){
      this.uploadDetails.role.push('ROLE_USER');
    }
  }

  toBase64(file: File){
    return new Promise((resolve,reject)=>{
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
  }

  toFile(b64str:any, filename:string, mimeType:string){
    return (fetch(b64str)
            .then(function(res){return res.arrayBuffer();})
            .then(function(buf){return new File([buf], filename,{type:mimeType});})
        );
  }

}
