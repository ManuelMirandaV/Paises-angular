import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Route, Router } from '@angular/router';
import { Country, Idd } from '../../interfaces/country';
import { CountriesModule } from '../../countries.module';
import { CountriesService } from '../../services/countries.services';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-country-page',
  templateUrl: './country-page.component.html',
  styles: ``
})
export class CountryPageComponent implements OnInit {

  public country?: Country;

  constructor( private activatedRoute: ActivatedRoute,
    private countriesServices: CountriesService,
    private router: Router
   ){}

  ngOnInit(): void {

    this.activatedRoute.params
    .pipe(
      switchMap( ({id}) => this.countriesServices.searchCountryByAlphaCode(id))
      )
    .subscribe (country => {
      if( !country) {return this.router.navigateByUrl('')}
      return this.country = country;
      // return;
     });
  }
}
