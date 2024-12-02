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
  constructor(private endpoint: PorukeGetChatEndpoint,
              private authService: AuthService,
              private kandidatEndpoint: KandidatGetByIdEndpoint,
              private kompanijaEndpoint: KompanijaGetByIdEndpoint) {
  }

  ngOnInit() {
    this.user = this.authService.getLoggedUser()
    this.korisnik1Id = this.user.id;
  }

  selectChat(groupedMessage: GroupedMessage)
  {
    this.selecetedChat = groupedMessage;
    this.korisnik2Id = groupedMessage.posiljalacId
  }
}
