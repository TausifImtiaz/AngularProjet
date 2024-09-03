import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { CityService } from '../services/city.service';
import { CountryService } from '../services/country.service';
import { City } from '../models/city';
import { Country } from '../models/country';

@Component({
  selector: 'app-city-list',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css']
})
export class CityListComponent implements OnInit {
  cities: City[] = [];
  countries: Country[] = [];
  newCity: City = new City(0, '', 0, 0, 0, new Country(0, '', '', '', 0));
  newCountry: Country = new Country(0, '', '', '', 0);
  cityForm!: FormGroup;
  cityControls: FormGroup[] = [];
  editingCity: City | null = null;


  constructor(
    private formBuilder: FormBuilder,

    private cityService: CityService,
    private countryService: CountryService
  ) { }

  ngOnInit() {
    this.createCityForm();
    this.loadCities();
    this.loadCountries();


  }

  createCityForm() {
    this.cityForm = this.formBuilder.group({
      countryId: 0,
      name: '',
      iso2: '',
      iso3: '',
      cities: this.formBuilder.array([])
    });

  }


  loadCities() {
    this.cityService.getCities().subscribe({
      next: response => {
        console.log(response);
        this.cities = response.data;
      },
      error: error => {
        console.error('Error loading cities:', error);
      }
    });
  }

  loadCountries() {
    this.countryService.getCountries().subscribe({
      next: response => {
        console.log(response);
        this.countries = response.data;
      },
      error: error => {
        console.error('Error loading countries:', error);
      }
    });
  }

  getCountryName(countryId: number): string {
    const country = this.countries.find(c => c.id === countryId);
    return country ? country.name : 'Unknown';

  }




  deleteCity(city: City) {
    if (confirm('Are you sure you want to delete this city?')) {
      this.cityService.deleteCity(city.id).subscribe({
        next: () => {
          console.log('City deleted:', city);
          this.loadCities();
        },
        error: (error: any) => {
          console.error('Error deleting city:', error);
        }
      });
    }
  }

  addCity() {
    const cities = this.cityForm.get('cities') as FormArray;
    cities.push(this.formBuilder.group({
      name: '',
      lat: 0,
      lon: 0
    }));
    this.cityControls = cities.controls as FormGroup[];
  }

  removeCity(index: number) {
    const cities = this.cityForm.get('cities') as FormArray;
    cities.removeAt(index);
    this.cityControls.splice(index, 1);
  }

  saveCities() {
    if (this.cityForm) {
      const countryId = this.cityForm.get('countryId')?.value;

      if (countryId === 0) {
        this.createCountryAndCities();
      }
      else {
        this.createCities(countryId);
      }
    }
  }


  createCountryAndCities() {
    const countryData = {
      name: this.cityForm.get('name')?.value,
      iso2: this.cityForm.get('iso2')?.value,
      iso3: this.cityForm.get('iso3')?.value,
    };

    this.countryService.postCountry(countryData).subscribe({
      next: (countryResponse: any) => {
        console.log('Country created:', countryResponse);

        // Update the newCity and newCountry objects
        this.newCity.countryId = countryResponse.id;
        this.newCity.country = countryResponse as Country;

        this.createCities(countryResponse.id);

        this.loadCities();
        this.loadCountries();


      },
      error: (countryError: any) => {
        console.error('Error creating country:', countryError);
      }
    });

  }

  createCities(countryId: number) {
    const citiesArray = this.cityForm.get('cities') as FormArray;
    const citiesData = citiesArray.getRawValue();

    citiesData.forEach(cityData => {
      cityData.countryId = countryId;

      this.cityService.postCity(cityData).subscribe({
        next: (response: any) => {
          console.log('City created:', response);
          this.loadCities(); // Reload cities after successful creation
        },
        error: (error: any) => {
          console.error('Error creating city:', error);
          // Handle error: display a user-friendly message or log it for further investigation
          // Example: Notify user about the error
          // You might want to implement a more robust error handling strategy here
          alert('Failed to create city. Please try again later.');
        }
      });
    });

    // Reset form and controls after creating cities
    this.cityForm.reset();
    this.cityControls = [];
  }


  addCityControl(city: City) {
    const cities = this.cityForm.get('cities') as FormArray;
    cities.push(this.formBuilder.group({
      id: city.id,
      name: city.name,
      lat: city.lat,
      lon: city.lon
    }));
    this.cityControls = cities.controls as FormGroup[];
  }


  editCity(city: City) {
    this.editingCity = { ...city }; // Create a copy of the city object

    // Populate form controls for editing
    this.cityForm.patchValue({
      countryId: city.countryId,
      name: city.name,
      iso2: city.country.iso2,
      iso3: city.country.iso3
    });

    // Populate cities FormArray if needed
    const citiesArray = this.cityForm.get('cities') as FormArray;
    citiesArray.clear();

    if (city.cities) {
      city.cities.forEach((cityItem: City) => {
        citiesArray.push(this.formBuilder.group({
          id: cityItem.id,
          name: cityItem.name,
          lat: cityItem.lat,
          lon: cityItem.lon
        }));
      });
    }
  }



  cancelEdit() {
    this.editingCity = null;
  }

  saveEdit() {
    if (this.editingCity) {
      // Update the edited city using its id
      this.cityService.updateCity(this.editingCity.id, this.editingCity).subscribe({
        next: response => {
          console.log('City updated:', response);
          this.loadCities();
          this.editingCity = null; // Clear editing mode
        },
        error: error => {
          console.error('Error updating city:', error);
        }
      });
    }
  }

}
