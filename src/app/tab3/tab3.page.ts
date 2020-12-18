import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NavController, Platform } from '@ionic/angular';
import { ServicesService } from '../services.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Camera, CameraResultType, CameraSource, Capacitor} from '@capacitor/core';



@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit{
  @ViewChild('filePicker', {static:false})
  filePickerRef : ElementRef<HTMLInputElement>;
  isDesktop : boolean;
  userName = "";
  email = "";
  profilePic = "data:image/jpeg;base64,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";
  avatar; 

  constructor(
    private platform : Platform,
    private sanitizer : DomSanitizer,
    private navCtrl : NavController,
    private service : ServicesService,
    private router : Router
  ) {}

  ngOnInit(){
    if((this.platform.is('mobile') && this.platform.is("hybrid")) ||
    this.platform.is('desktop')){
      this.isDesktop = true;
    }

    this.service.userDetail().subscribe(res => {
      if (res !== null){
        console.log("CurrentUser:" , res.email);
        this.email = res.email;
        console.log("UserId:", this.email);
        this.getCurrUser(this.email);
        this.service.getProfilePic(this.email).subscribe((doc)=>{
          console.log(doc.data());
          let pic : any = [];
          pic = doc.data();
          if(doc.data() === {}){
            this.profilePic = "data:image/jpeg;base64,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";
          }
          else{
            this.profilePic = "data:image/jpeg;base64,"+ pic.pic;
          }
        })
      }
      else{
        this.navCtrl.navigateBack('/register');
      }
    })

    
  }

  logout(){
    this.service.logout().then( res => {
      console.log(res);
      this.router.navigateByUrl('/register');
    }).catch(err => {
      console.log(err);
    });
  }

  getCurrUser(email){
    let user : any = [];
    console.log(email);
    this.service.getCurrUser(email).subscribe((doc)=>{
      if(doc.exists){
        console.log(doc.data());
        user = doc.data();
        let firstName = user.firstName;
        let lastName = user.lastName;
        this.userName = firstName+" "+lastName;
      }
      else {
        console.log("Document doesn't exist");
      }
    });
  }

  async getPicture(type : string){
    if(!Capacitor.isPluginAvailable('Camera') || (this.isDesktop && type === 'gallery')){
      this.filePickerRef.nativeElement.click();
      return;
    }

    const image = await Camera.getPhoto({
      quality : 100,
      width : 160,
      height : 160,
      allowEditing : false,
      resultType : CameraResultType.Base64,
      source : CameraSource.Prompt
    });

    console.log(image.base64String);

    this.service.uploadPic(this.email,image.base64String);
    this.profilePic = "data:image/jpeg;base64,"+image.base64String;


  }



  
  



}
