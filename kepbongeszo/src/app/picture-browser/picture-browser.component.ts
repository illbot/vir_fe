import { AfterViewChecked, AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { AppService, FileData } from '../app.service';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner'
import { timeout } from 'rxjs/operators';
import { NgbModal, NgbToast } from '@ng-bootstrap/ng-bootstrap';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { TokenService } from '../token.service';
import { v4 as uuid } from 'uuid';
import { environment } from 'src/environments/environment';

export interface FileHandle {
  file: File,
  url: SafeUrl
}

@Component({
  selector: 'app-picture-browser',
  templateUrl: './picture-browser.component.html',
  styleUrls: ['./picture-browser.component.scss']
})
export class PictureBrowserComponent implements OnInit, AfterViewInit {

  snackBHorizontal: MatSnackBarHorizontalPosition = 'end';
  snackBVertical: MatSnackBarVerticalPosition = 'top';
  dataSource: [] | undefined | any;
  displayedData: [] | undefined | any;
  show = false;
  selected: any = undefined;
  files: File[]=[];
  fileSafeUrl:any;

  uploadDetails = {
    description: "",
    displayName: "",
    role: ['ROLE_ADMIN'],
    uploader: this.tokenService.getUser().id,
    user_visibility: false
  }

  defaultUploadDetail(){
    this.uploadDetails = {
      description: "",
      displayName: "",
      role: ['ROLE_ADMIN'],
      uploader: this.tokenService.getUser().id,
      user_visibility: false
    }
  }

  constructor(
    private service: AppService,
    private modalService: NgbModal,
    private snackBar: MatSnackBar,
    private sanitizer: DomSanitizer,
    private tokenService: TokenService,
    ) { }

  ngAfterViewInit(): void {
    this.getPictures();
  }

  ngOnInit(): void {}

  getPictures(){
    this.service.getPictures().subscribe(data =>{
      this.dataSource = data;
      this.displayedData = [...this.dataSource];
      console.log(this.displayedData);
      this.show = true;
    });
  }

  zoom(data:any, modal:any){
    this.selected = data;
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
      let title = element.displayName.trim().toLowerCase();
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
    const img_id = uuid()
    let fileExtension:string | any= this.files[0].name.split('?')[0].split('.').pop();
    let fileData: FileData= {
      name: img_id+'.'+fileExtension,
      type: this.files[0].type
    }

    this.service.uploadImg(this.files[0],img_id, fileExtension).subscribe( (data: { message: string | string[]; } | any) =>{
      console.log(data);
      this.service.uploadImageData(this.uploadDetails, fileData).subscribe((element: { [x: string]: string | string[]; }) => {
        if(element["message"].includes("Sikeres!")){
          this.defaultUploadDetail();
          this.modalService.dismissAll();
          this.snackBar.open("Sikeres feltöltés!", "close");
          this.getPictures();
        }
      });
    },
    (err: any) => {
      this.snackBar.open("Error: "+ err["error"]["message"])
    });
  }

  rbChange(){
    this.uploadDetails.user_visibility = !this.uploadDetails.user_visibility;
    if(this.uploadDetails.user_visibility){
      this.uploadDetails.role.push('ROLE_USER');
    }
  }

  toByteArray(file: File){
    return new Promise((resolve,reject)=>{
        let reader = new FileReader();
        reader.readAsArrayBuffer(file);
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

  convertDataURIToBinary(dataURI:any) {
    var base64Index = dataURI.indexOf(';base64,') + ';base64,'.length;
    var base64 = dataURI.substring(base64Index);
    var raw = window.atob(base64);
    var rawLength = raw.length;
    var array = new Uint8Array(new ArrayBuffer(rawLength));
  
    for(let i = 0; i < rawLength; i++) {
      array[i] = raw.charCodeAt(i);
    }
    return array;
  }
  
}
