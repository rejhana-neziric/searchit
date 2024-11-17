import {Component, OnInit} from '@angular/core';
import {PorukaGetResponsePoruka, GroupedMessage} from '../../../endpoints/chat-endpoint/get-by-korisnik-id/get-by-korisnik-id-response'
import {PorukeGetByKandidatIdEndpoint} from '../../../endpoints/chat-endpoint/get-by-korisnik-id/get-by-korisnik-id-endpoint'
import {User} from '../../../modals/user'
import {AuthService} from "../../../services/auth-service";
import {NgFor, NgIf} from "@angular/common";
import {KandidatGetByIdResponse} from "../../../endpoints/kandidat-endpoint/get-by-id/kandidat-get-by-id-response";
import {KandidatGetByIdEndpoint} from "../../../endpoints/kandidat-endpoint/get-by-id/kandidat-get-by-id-endpoint";
import {response} from "express";
import {KompanijaGetByIdResponse} from "../../../endpoints/kompanija-endpoint/get-by-id/kompanija-get-by-id-response";
import {KompanijaGetByIdEndpoint} from "../../../endpoints/kompanija-endpoint/get-by-id/kompanija-get-by-id-endpoint";

@Component({
  selector: 'app-chat-candidate',
  standalone: true,
  imports: [
    NgIf,
    NgFor
  ],
  templateUrl: './chat-candidate.component.html',
  styleUrl: './chat-candidate.component.css'
})

export class ChatCandidateComponent implements OnInit{

  poruke: PorukaGetResponsePoruka[] = []
  korisnikId: string = ''
  user: User = {id: "", role: "", jwt: ""}
  kandidat:  KandidatGetByIdResponse | null = null;
  //groupedMessages: any[] = []

  constructor(private endpoint: PorukeGetByKandidatIdEndpoint,
              private authService:AuthService,
              private kandidatEndpoint: KandidatGetByIdEndpoint,
              private kompanijaEndpoint : KompanijaGetByIdEndpoint) {
  }
  ngOnInit() {
    this.user = this.authService.getLoggedUser();
    this.korisnikId = this.user.id;
    this.getPoruke();
    this.poruke.forEach(poruka => console.log(poruka.sadrzaj));
    this.getKandidat();
    //this.groupedMessages = this.groupMessagesBySender(this.poruke);
    //console.log(this.groupedMessages);
    //console.log(this.poruke);
  }

  getPoruke(): void {
    this.endpoint.obradi(this.korisnikId).subscribe(
      (response) => {
        this.poruke = (response.poruke as any).$values;
      },
      (error) => {
        console.log('Error fetching messages: ', error);
      }
    );
  }
  // getPoruke(): void {
  //   this.endpoint.obradi(this.korisnikId).subscribe(
  //     (response) => {
  //         this.poruke = (response as any).$values.map((poruka: any) => {
  //           return {
  //             ...poruka,
  //             posiljalacIme: '' // Placeholder for sender's name
  //           };
  //         });
  //
  //         // Fetch sender names for each message
  //         this.poruke.forEach((poruka) => {
  //           this.kompanijaEndpoint.obradi(poruka.po).subscribe(
  //             (korisnik) => {
  //               poruka.posiljalacIme = korisnik.userName;
  //             },
  //             (error) => {
  //               console.log('Error fetching sender:', error);
  //             }
  //           );
  //         });
  //     },
  //     (error) => {
  //       console.log('Error fetching messages: ', error);
  //     }
  //   );
  // }


// groupMessagesBySender(messages: PorukaGetResponsePoruka[]): GroupedMessage[] {
//   const grouped = messages.reduce<Record<string, GroupedMessage>>((acc, message) => {
//     const senderKey = message.posiljatelj_id || message.ime_posiljatelja || 'Nepoznat';
//     if (!acc[senderKey]) {
//       acc[senderKey] = {
//         posiljalacIme: message.ime_posiljatelja || 'Nepoznat',
//         posiljalacId: message.posiljatelj_id,
//         messages: []
//       };
//     }
//     acc[senderKey].messages.push({
//       id: message.id,
//       korisnik_id: message.korisnik_id,
//       sadrzaj: message.sadrzaj,
//       vrijeme_slanja: message.vrijeme_slanja,
//       is_seen: message.is_seen
//     });
//     return acc;
//   }, {});
//
//   return Object.values(grouped);
// }


  getKandidat(): void{
    this.kandidatEndpoint.obradi(this.korisnikId).subscribe(
      (response)=>{
        this.kandidat = response
      },
      (error) =>{
        console.log("Error fetching kandidat: ", error);
      }
    )
  }
}
