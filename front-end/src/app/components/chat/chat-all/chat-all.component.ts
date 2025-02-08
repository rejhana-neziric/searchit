import {Component, OnInit} from '@angular/core';
import {PorukaGetChatResponse, GroupedMessage, PorukaGetChatResponsePoruka} from "../../../endpoints/chat-endpoint/get-chat/get-chat-response";
import {PorukeGetChatEndpoint} from "../../../endpoints/chat-endpoint/get-chat/get-chat-endpoint";
import {User} from "../../../modals/user";
import {AuthService} from "../../../services/auth-service";
import {NgClass, NgFor, NgIf, SlicePipe} from "@angular/common";
import {NavbarComponent} from "../../layout/navbar/navbar.component";
import {RouterLink} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {FooterComponent} from "../../layout/footer/footer.component";
import {KandidatGetByIdEndpoint} from "../../../endpoints/kandidat-endpoint/get-by-id/kandidat-get-by-id-endpoint";
import {KompanijaGetByIdEndpoint} from "../../../endpoints/kompanija-endpoint/get-by-id/kompanija-get-by-id-endpoint";
import {PorukaGetAllChatsEndpoint} from "../../../endpoints/chat-endpoint/get-all-chats/get-all-chats-endpoint"
import {PorukaGetResponsePoruka} from "../../../endpoints/chat-endpoint/get-by-korisnik-id/get-by-korisnik-id-response";
import {PorukaGetAllChatsResponsePoruka} from "../../../endpoints/chat-endpoint/get-all-chats/get-all-chats-response";
@Component({
  selector: 'app-chat-all',
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    NavbarComponent,
    RouterLink,
    FormsModule,
    SlicePipe,
    NgClass,
    FooterComponent],
  templateUrl: './chat-all.component.html',
  styleUrl: './chat-all.component.css'
})
export class ChatAllComponent implements OnInit{

  poruke: PorukaGetChatResponsePoruka [] = []
  user: User = {id:"", role:"", jwt:""}
  groupedMessages: GroupedMessage[] = []
  pretragaNaziv: string = ""
  newChat:any;
    selecetedChat: GroupedMessage | null = null;
  korisnik1Id: string = '';
  korisnik2Id: string | null = '';
  selectedChat: GroupedMessage | null = null;
  constructor(private endpoint: PorukaGetAllChatsEndpoint,
              private chatEndpoint: PorukeGetChatEndpoint,
              private authService: AuthService,
              private kandidatEndpoint: KandidatGetByIdEndpoint,
              private kompanijaEndpoint: KompanijaGetByIdEndpoint) {
  }

  ngOnInit() {
    this.user = this.authService.getLoggedUser()
    this.korisnik1Id = this.user.id;
    this.getPoruke();
  }

  selectChat(groupedMessage: GroupedMessage)
  {
    this.selecetedChat = groupedMessage;
    this.korisnik2Id = groupedMessage.posiljalacId
  }

  onSearchChange(pretraga: string) {
    this.pretragaNaziv = pretraga;

    //this.getAll();
  }
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

  formatTime(date: Date): string {
    const messageTime = new Date(date);

    const formattedDate = messageTime.toISOString().split('T')[0];
    const formattedTime = messageTime.toISOString().split('T')[1].slice(0,5);
    console.log(formattedTime);
    console.log(formattedDate);
    const formattedTimeDate = `${formattedDate} - ${formattedTime}`;

    return formattedTimeDate;
  }

  getPoruke():void{
    this.endpoint.obradi(this.korisnik1Id).subscribe(
      (response) => {
        this.poruke = (response.poruke as any).$values;
        console.log(this.poruke);
      }
    )
  }
}
