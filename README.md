# Angular Project with Master-Details

## Overview

The **Angular Project with Master-Details** is an Angular application built using TypeScript that interacts with the [WorldCitiesAPI](https://github.com/TausifImtiaz/WorldCitiesAPI). This project showcases a Master-Details approach for managing city data, including CRUD operations. The application provides a dynamic and interactive user interface for handling city information.

## Features

- **Master-Details Interface:** Displays a list of cities (master) and their detailed information (details).
- **CRUD Operations:** Supports Create, Read, Update, and Delete operations for city data.
- **Angular Framework:** Utilizes Angular 16.1.8 and TypeScript to build a responsive and efficient web application.
- **WorldCitiesAPI Integration:** Connects to the WorldCitiesAPI for data retrieval and manipulation.

## Technologies Used

- Angular (v16.1.8)
- TypeScript
- Node.js (v18.20.3)
- WorldCitiesAPI
- HTML/CSS
- Bootstrap 

## Project Structure

- **src/app/components:** Contains Angular components for the Master-Details interface.
- **src/app/services:** Includes services for interacting with the WorldCitiesAPI.
- **src/app/models:** Defines TypeScript interfaces and models for city data.
- **src/app/modules:** Angular modules to organize the application structure.
- **src/assets:** Contains static assets such as images and styles.

## Getting Started

### Prerequisites

- Node.js (v18.20.3)
- Angular CLI (v16.1.8)
- Access to the [WorldCitiesAPI](https://github.com/TausifImtiaz/WorldCitiesAPI)

### Cloning the Repository

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/TausifImtiaz/AngularProjet.git
   ```

### Installation

1. **Navigate to the Project Directory:**
   ```bash
   cd AngularProjet
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

### Configuration

1. **Configure API Endpoint:**
   - Open `src/app/services/city.service.ts`.
   - Update the API endpoint to point to your instance of the WorldCitiesAPI.

### Running the Application

1. **Start the Development Server:**
   ```bash
   ng serve
   ```

2. **Access the Application:**
   - Open a web browser and navigate to `http://localhost:4200` to view the application.

## Usage

1. **Master-Details Interface:**
   - View a list of cities and select a city to view or edit its details.

2. **CRUD Operations:**
   - **Create:** Add new city records via the user interface.
   - **Read:** Display city information and details.
   - **Update:** Modify existing city records.
   - **Delete:** Remove city records from the list.

3. **API Integration:**
   - The application interacts with the WorldCitiesAPI for data operations. Ensure the API endpoint is correctly configured.

## Code Example

### City Service Example

```typescript
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { City } from '../models/city.model';

@Injectable({
  providedIn: 'root'
})
export class CityService {
  private apiUrl = 'https://api.worldcitiesapi.com'; // Update with your API URL

  constructor(private http: HttpClient) { }

  getCities(): Observable<City[]> {
    return this.http.get<City[]>(`${this.apiUrl}/cities`);
  }

  getCity(id: number): Observable<City> {
    return this.http.get<City>(`${this.apiUrl}/cities/${id}`);
  }

  addCity(city: City): Observable<City> {
    return this.http.post<City>(`${this.apiUrl}/cities`, city);
  }

  updateCity(city: City): Observable<City> {
    return this.http.put<City>(`${this.apiUrl}/cities/${city.id}`, city);
  }

  deleteCity(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/cities/${id}`);
  }
}
```

## Contributing

Contributions are welcome! To contribute:
- Fork the repository.
- Create a feature branch.
- Commit your changes.
- Push to the branch.
- Open a pull request with a description of your changes.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements

- Angular documentation
- TypeScript documentation
- [WorldCitiesAPI](https://github.com/TausifImtiaz/WorldCitiesAPI)

## Contact

For any questions or support, please contact [Tausif Imtiaz](mailto:tausifimtiaz@gmail.com).
