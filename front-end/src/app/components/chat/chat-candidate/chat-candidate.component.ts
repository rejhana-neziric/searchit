import {Component, OnInit} from '@angular/core';
import {PorukaGetResponsePoruka, GroupedMessage} from '../../../endpoints/chat-endpoint/get-by-korisnik-id/get-by-korisnik-id-response'
import {PorukeGetByKandidatIdEndpoint} from '../../../endpoints/chat-endpoint/get-by-korisnik-id/get-by-korisnik-id-endpoint'
import {User} from '../../../modals/user'
import {AuthService} from "../../../services/auth-service";
import {NgClass, NgFor, NgIf, SlicePipe} from "@angular/common";
import {KandidatGetByIdResponse} from "../../../endpoints/kandidat-endpoint/get-by-id/kandidat-get-by-id-response";
import {KandidatGetByIdEndpoint} from "../../../endpoints/kandidat-endpoint/get-by-id/kandidat-get-by-id-endpoint";
import {response} from "express";
import {KompanijaGetByIdResponse} from "../../../endpoints/kompanija-endpoint/get-by-id/kompanija-get-by-id-response";
import {KompanijaGetByIdEndpoint} from "../../../endpoints/kompanija-endpoint/get-by-id/kompanija-get-by-id-endpoint";
import {NavbarComponent} from "../../layout/navbar/navbar.component";
import {RouterLink} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {FooterComponent} from "../../layout/footer/footer.component";

@Component({
  selector: 'app-chat-candidate',
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    NavbarComponent,
    RouterLink,
    FormsModule,
    SlicePipe,
    NgClass,
    FooterComponent
  ],
  templateUrl: './chat-candidate.component.html',
  styleUrl: './chat-candidate.component.css'
})

export class ChatCandidateComponent implements OnInit{

  poruke: PorukaGetResponsePoruka[] = []
  korisnikId: string = ''
  user: User = {id: "", role: "", jwt: ""}
  kandidat:  KandidatGetByIdResponse | null = null;
  groupedMessages: GroupedMessage[] = []
  pretragaNaziv: string = ""
  newChat: any;
  selectedChat: GroupedMessage | null = null;

  constructor(private endpoint: PorukeGetByKandidatIdEndpoint,
              private authService:AuthService,
              private kandidatEndpoint: KandidatGetByIdEndpoint,
              private kompanijaEndpoint : KompanijaGetByIdEndpoint) {
  }
  ngOnInit() {
    this.user = this.authService.getLoggedUser();
    this.korisnikId = this.user.id;
    this.getPoruke();
    //this.poruke.forEach(poruka => console.log(poruka.sadrzaj));
    this.getKandidat();
    //console.log(this.groupedMessages.length);
    //console.log(this.poruke);
  }

  getPoruke(): void {
    this.endpoint.obradi(this.korisnikId).subscribe(
      (response) => {
        this.poruke = (response.poruke as any).$values;

        this.groupMessagesBySender(this.poruke);
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


groupMessagesBySender(messages: PorukaGetResponsePoruka[]) {
  const grouped = messages.reduce<Record<string, GroupedMessage>>((acc, message) => {
    const senderKey = message.posiljatelj_id || message.ime_posiljatelja || 'Nepoznat';
    console.log('Sender key: ',senderKey);
    if (!acc[senderKey]) {
      acc[senderKey] = {
        posiljalacIme: message.ime_posiljatelja || 'Nepoznat',
        posiljalacId: message.posiljatelj_id,
        messages: []
      };
    }
    acc[senderKey].messages.push({
      id: message.id,
      korisnik_id: message.korisnik_id,
      sadrzaj: message.sadrzaj,
      vrijeme_slanja: message.vrijeme_slanja,
      is_seen: message.is_seen
    });
    return acc;
  }, {});
  this.groupedMessages = Object.values(grouped);
  console.log(this.groupedMessages);
}


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

  onSearchChange(pretraga: string)
  {
    this.pretragaNaziv = pretraga;
  }

  formatTime(date: Date): string {
    const messageTime = new Date(date);

    const formattedDate = messageTime.toISOString().split('T')[0];
    const formattedTime = messageTime.toISOString().split('T')[1].slice(0,5);
    console.log(formattedTime);
    console.log(formattedDate);
    const formattedTimeDate = `${formattedDate} - ${formattedTime}`;

    return formattedTimeDate;
  }

  selectChat(groupedMessage: GroupedMessage):void{
    this.selectedChat = groupedMessage;
  }

  sendMessage(): void{

  }
}
