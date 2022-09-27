import { Component, OnInit } from '@angular/core';
import{FormGroup, Validators,FormControl} from '@angular/forms';
import { ApiserviceService } from '../apiservice.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  // userForm!: FormGroup one more trick

  constructor(private api:ApiserviceService, private router:ActivatedRoute) { }
   
  errMsg:any;
  successMsg:any;
  getparamid:any;


  ngOnInit(): void {
    this.getparamid =this.router.snapshot.paramMap.get('id');


    if(this.getparamid){
      this.api.getSingleData(this.getparamid).subscribe((res)=>{
        console.log(res,'selected update data');

        this.userForm.patchValue({
          Fullname:res.data[0].Fullname,
          Email:res.data[0].Email,
          Mobile:res.data[0].Mobile,
          City:res.data[0].City
        })
      })

    }


   
  }

  userForm = new FormGroup({

    'Fullname':new FormControl('', Validators.required),
    'Email':new FormControl('', Validators.required),
    'Mobile':new FormControl('', Validators.required),
    'City':new FormControl('', Validators.required)
  })

 userSubmit(){
    //  console.log(this.userForm.value);
    if(this.userForm.valid){

      console.log(this.userForm.value ,"form values");

      this.api.createData(this.userForm.value).subscribe((res)=>{
        console.log(res, 'Data added Success')
        this.userForm.reset();
        this.successMsg = res.message;
      })
    }
      else{
        this.errMsg ='All  Fields Are Reqired';
      }
 }
// updateuser
updateUser(){
  console.log(this.userForm.value);


  if(this.userForm.valid){



    this.api.updateData(this.userForm.value,this.getparamid).subscribe((res)=>{
      if(res.message){
      console.log(res,'Data Updated Successfull')
      this.successMsg =res.message;
    }
    },
    (error) => {                             
      this.errMsg = error.error.error;
      throw error;
    }
    
    )
  } 
  
  
  
  else{
       this.errMsg = ' All Fields Are required.'
  }


}
}
