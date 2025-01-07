import { Component, OnInit } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { Employee } from "../../models/employee";
import { EmployeeService } from "../employee.service";
import { Router, ActivatedRoute } from "@angular/router";
import { CommonModule } from "@angular/common";

@Component({
  selector: 'employee-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.css'
})
export class EmployeeFormComponent implements OnInit{

  constructor(
    private employeeService: EmployeeService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  errorMessage: string = ""

  isEditing: boolean = false;

  employee: Employee = {
    email: "",
    firstName: "",
    id: 0,
    lastName: "",
    phone: "",
    position: ""
  }

  ngOnInit() {
    this.route.paramMap.subscribe((result) => {
      const id = result.get('id')
      if (id) {
        this.isEditing = true
        this.employeeService.getEmployeeById(Number(id)).subscribe({
          next: (result) => this.employee = result,
          error: (err) => this.errorMessage = `Error occurred: (${err.status})`
        })
      }
    })
  }

  onSubmit(): void {
    if(this.isEditing){
      this.employeeService.editEmployee(this.employee)
        .subscribe({
          next: (response) => {
            this.router.navigate(['/']);
          },
          error: (err) => {
            console.error(err);
            this.errorMessage = `Error occurred during updating: (${err.status})`;
          }
        })
    } else {
      this.employeeService.createEmployee(this.employee)
        .subscribe({
          next: (response) => {
            this.router.navigate(['/']);
          },
          error: (err) => {
            console.error(err);
            this.errorMessage = `Error occurred during creating: (${err.status})`;
          }
        })
    }
  }
}
