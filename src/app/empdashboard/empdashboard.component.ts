import { Component,OnInit } from '@angular/core';
import { FormBuilder,FormGroup} from '@angular/forms';
import { EmployeModel } from './empdashboardmodel';
import { ApiService } from '../shared/api.service';


@Component({
  selector: 'app-empdashboard',
  templateUrl: './empdashboard.component.html',
  styleUrls: ['./empdashboard.component.css']
})
export class EmpdashboardComponent {
  formValue !:FormGroup;
  employeeModelObj:EmployeModel =new EmployeModel();
  employeeData !:any;
  showAdd!:boolean;
  showUpdate !:boolean;
  constructor(private formbuilder: FormBuilder, private api: ApiService ){}

  ngOnInit():void{
    this.formValue=this.formbuilder.group({
      firstName:[''],
      lastName:[''],
      email:[''],
      mobile:[''],
      salary:['']
    })
    this.getAllEmployee();
  }
  clickAddEmploye(){
    this.formValue.reset();
    this.showAdd=true;
    this.showUpdate=false;
  }
  postEmployeeDetails(){
    this.employeeModelObj.firstName=this.formValue.value.firstName;
    this.employeeModelObj.lastName=this.formValue.value.lastName;
    this.employeeModelObj. email=this.formValue.value. email;
    this.employeeModelObj.mobile=this.formValue.value.mobile;
    this.employeeModelObj.salary=this.formValue.value.salary;

    this.api.postEmploye(this.employeeModelObj)
    .subscribe((res:any)=>{
      console.log(res);
      alert("Employee Added Successfully")
      let ref=document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getAllEmployee();
    },
    (err:any)=>{
      console.log(err);
      alert("something went wrong")
    })
  }
getAllEmployee(){
  this.api.getEmploye(this.employeeModelObj)
  .subscribe((res:any)=>{
this.employeeData=res;
  })
}
deleteEmployee(row:any){
  this.api. deleteEmployee(row.id)
.subscribe((res:any)=>{
  console.log(res);
  alert("Employee Deleted");
  this.getAllEmployee()
})
}
onEdit(row:any){
  this.showAdd=false;
  this.showUpdate=true;
  this.employeeModelObj.id=row.id;
  this.formValue.controls['firstName'].setValue(row.firstName);
  this.formValue.controls['lastName'].setValue(row.lastName);
  this.formValue.controls['email'].setValue(row.email);
  this.formValue.controls['mobile'].setValue(row.mobile);
  this.formValue.controls['salary'].setValue(row.salary);
}
updateEmployeeDetails(){
  this.employeeModelObj.firstName=this.formValue.value.firstName;
    this.employeeModelObj.lastName=this.formValue.value.lastName;
    this.employeeModelObj. email=this.formValue.value. email;
    this.employeeModelObj.mobile=this.formValue.value.mobile;
    this.employeeModelObj.salary=this.formValue.value.salary;
    this.api.updateEmployee(this.employeeModelObj,this.employeeModelObj.id)
    .subscribe((res:any)=>{
      alert("updated Sucessfully");
      let ref=document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getAllEmployee();
    })
}
}
