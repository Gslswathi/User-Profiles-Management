import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  user: any | null = null;
  activeTab: 'basic' | 'education' | 'contact' | 'other' = 'basic';
  loading = false;
  error: string | null = null;
  profileForm!: FormGroup;
  editMode = false;
  private userId: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private fb: FormBuilder
  ) {}

  // Initialize form with controls used in the template
  private initForm() {
    this.profileForm = this.fb.group({
      name: ['', Validators.required],
      firstName: [''],
      lastName: [''],
      designation: [''],
      dob: [''],
      gender: [''],

      // Education
      school: [''],
      course: [''],
      degree: [''],
      yearOfCompletion: [''],
      grade: [''],

      // Contact
      email: ['', [Validators.email]],
      phone: [''],
      address: [''],
      pincode: [''],
      country: [''],
      linkedIn: [''],
      resume: [''],

      // Other
      skills: [''],
      domain: [''],
      subDomain: [''],
      experience: ['']
    });
  }

  ngOnInit() {
    this.initForm();

    // Get the user ID from the URL (e.g., /profile/1)
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.userId = !isNaN(id) ? id : null;
    if (this.userId !== null) {
      this.loading = true;
      this.userService.getUserById(this.userId).subscribe({
        next: (u) => {
          this.user = u || null;
          if (this.user) {
            this.profileForm.patchValue({
              name: this.user.name || '',
              firstName: this.user.firstName || '',
              lastName: this.user.lastName || '',
              designation: this.user.designation || '',
              dob: this.user.dob || '',
              gender: this.user.gender || '',

              // Education
              school: this.user.school || '',
              course: this.user.course || '',
              degree: this.user.degree || '',
              yearOfCompletion: this.user.yearOfCompletion || '',
              grade: this.user.grade || '',

              // Contact
              email: this.user.email || '',
              phone: this.user.phone || '',
              address: this.user.address || '',
              pincode: this.user.pincode || '',
              country: this.user.country || '',
              linkedIn: this.user.linkedIn || '',
              resume: this.user.resume || '',

              // Other
              skills: this.user.skills || '',
              domain: this.user.domain || '',
              subDomain: this.user.subDomain || '',
              experience: this.user.experience || ''
            });
          }
          this.loading = false;
        },
        error: (err) => {
          console.error('Failed to load user:', err);
          this.error = 'Failed to load user';
          this.loading = false;
        }
      });
    }
  }

  setActiveTab(tab: 'basic' | 'education' | 'contact' | 'other') {
    this.activeTab = tab;
  }

  enableEdit() {
    this.editMode = true;
  }

  cancelEdit() {
    this.editMode = false;
    // restore original values
    if (this.user) {
      this.profileForm.patchValue({
        name: this.user.name || '',
        firstName: this.user.firstName || '',
        lastName: this.user.lastName || '',
        designation: this.user.designation || '',
        dob: this.user.dob || '',
        gender: this.user.gender || '',

        // Education
        school: this.user.school || '',
        course: this.user.course || '',
        degree: this.user.degree || '',
        yearOfCompletion: this.user.yearOfCompletion || '',
        grade: this.user.grade || '',

        // Contact
        email: this.user.email || '',
        phone: this.user.phone || '',
        address: this.user.address || '',
        pincode: this.user.pincode || '',
        country: this.user.country || '',
        linkedIn: this.user.linkedIn || '',
        resume: this.user.resume || '',

        // Other
        skills: this.user.skills || '',
        domain: this.user.domain || '',
        subDomain: this.user.subDomain || '',
        experience: this.user.experience || ''
      });
    }
  }

  save() {
    if (!this.userId) return;
    if (this.profileForm.invalid) {
      this.profileForm.markAllAsTouched();
      return;
    }

    const changes = this.profileForm.value;
    this.userService.updateUser(this.userId, changes);
    // update local copy
    this.user = { ...(this.user || {}), ...changes };
    this.editMode = false;
    alert('✅ Profile saved (in-memory)');
  }

  // Go back to list page
  goBack() {
    this.router.navigate(['/']);
  }
}
