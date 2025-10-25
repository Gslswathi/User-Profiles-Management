import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  profileForm!: FormGroup;
  activeTab: string = 'basic';

  constructor(private fb: FormBuilder, private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any>('assets/Data/profile.json').subscribe(data => {
      this.profileForm = this.fb.group({
        name: [data.name],
        designation: [data.designation],
        email: [data.email],
        phone: [data.phone],
        dob: [data.dob],
        gender: [data.gender],
        address: [data.address],
        degree: [data.degree],
        university: [data.university],
        year: [data.year],
        company: [data.company],
        position: [data.position],
        years: [data.years]
      });
    });
  }

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

  onSubmit() {
    console.log('Updated Profile:', this.profileForm.value);
    alert('Profile saved successfully!');
  }
}
