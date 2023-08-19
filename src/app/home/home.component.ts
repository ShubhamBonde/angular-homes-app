import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HousingLocationComponentComponent } from '../housing-location-component/housing-location-component.component';
import { HousingLocation } from '../housing-location'; // HousingLoacation Interface
import { HousingService } from '../housing.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    HousingLocationComponentComponent
  ],
  template: `
  <section>
    <form>
      <input type="text" placeholder="Filter by city" #filter>
      <button class="primary" type="button" (click)="filterResults(filter.value)">Search</button>
    </form>
  </section>
  <section class="results">
    <!-- Here we are adding the property housingLocation to app-housing-location component -->
    <app-housing-location *ngFor="let housingLocation of filteredLocationsList" [housingLocation]="housingLocation"></app-housing-location>  
  </section>
  `,
  styleUrls: ['./home.component.css'],
})



export class HomeComponent {
  housingLocationList: HousingLocation[] = [];
  housingService: HousingService = inject(HousingService);
  filteredLocationsList: HousingLocation[] = [];


  /**
  * Constructor for this class.
  * @method constructor
  */
  constructor() {
    let me = this;
    me.housingLocationList = me.housingService.getAllHousingLocations();
    me.filteredLocationsList = me.housingLocationList;
  }

  /**
  * Description of the function 
  * @method filterResults
  * @param {string} filterString - purpose of param.
  * @returns {array} Array of filtered listings.
  * @throws {Error} Throws an error if (mention condition or situation when error is thrown).
  */
  filterResults(text: string) {
    let me = this;
    if (!text) {
      me.filteredLocationsList = me.housingLocationList;
    }
  
    me.filteredLocationsList = me.housingLocationList.filter(
      housingLocation => housingLocation?.city.toLowerCase().includes(text.toLowerCase())
    );
  }

}