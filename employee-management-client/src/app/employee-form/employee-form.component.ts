import { Component } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { Employee } from "../../models/employee";
import { EmployeeService } from "../employee.service";
import { Router } from "@angular/router";
import { CommonModule } from "@angular/common";

@Component({
  selector: 'employee-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.css'
})
export class EmployeeFormComponent {

  constructor(private employeeService: EmployeeService, private router: Router) {}

  errorMessage: string = ""

  employee: Employee = {
    email: "",
    firstName: "",
    id: 0,
    lastName: "",
    phone: "",
    position: ""
  }

  onSubmit(): void {
    this.employeeService.createEmployee(this.employee)
      .subscribe({
        next: (response) => {
          this.router.navigate(['/']);
        },
        error: (err) => {
          console.error(err);
          this.errorMessage = `Error occurred: (${err.status})`;
        }
      })
  }
}
