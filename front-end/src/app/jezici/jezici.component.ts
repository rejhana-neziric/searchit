import {Component, OnInit} from '@angular/core';
import {MojConfig} from "../moj-config";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-jezici',
  standalone: true,
  imports: [],
  templateUrl: './jezici.component.html',
  styleUrl: './jezici.component.css'
})
export class JeziciComponent implements OnInit{
    naziv: string = '';
    noviJezik:any;

    constructor(private httpKlijent:HttpClient) {
    }
    ngOnInit(): void {
        throw new Error('Method not implemented.');
    }

    testirajApi(){

    }

    dodajJezik(){
        this.noviJezik={
          naziv : this.naziv
        }
    }

}
