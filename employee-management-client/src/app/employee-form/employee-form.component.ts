import { Component } from '@angular/core';
import { FormsModule } from "@angular/forms";
import {Employee} from "../../models/employee";

@Component({
  selector: 'employee-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.css'
})
export class EmployeeFormComponent {

  employee: Employee = {
    email: "",
    firstName: "",
    id: 0,
    lastName: "",
    phone: "",
    position: ""
  }

  onSubmit(): void {
    console.log(this.employee);
  }
}
