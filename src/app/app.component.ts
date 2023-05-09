import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class PokemonComponent implements OnInit {
  searchForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.searchForm = this.fb.group({
      search: ''
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    const searchTerm = this.searchForm.get('search')?.value;
    if (searchTerm) {
      this.router.navigate(['/search'], { queryParams: { q: searchTerm } });
    }
  }
}
