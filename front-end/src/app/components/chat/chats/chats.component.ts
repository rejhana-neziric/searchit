import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
//import {GroupedMessage} from "../../../endpoints/chat-endpoint/get-chat/get-chat-response";
import {map, Observable, switchMap} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {
  PorukaGetAllChatsResponse,
  PorukaGetAllChatsResponsePoruka,
  GroupedMessage
} from "../../../endpoints/chat-endpoint/get-all-chats/get-all-chats-response";
import {DatePipe, JsonPipe, NgClass, NgFor, NgForOf, NgIf, SlicePipe} from "@angular/common";
import {PorukaGetAllChatsEndpoint} from "../../../endpoints/chat-endpoint/get-all-chats/get-all-chats-endpoint";
import {User} from "../../../modals/user";
import {response} from "express";
import {AuthService} from "../../../services/auth-service";
import {PorukaGetChatResponse} from "../../../endpoints/chat-endpoint/get-chat/get-chat-response";
import {NavbarComponent} from "../../layout/navbar/navbar.component";
import {RouterLink} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {PorukaSendRequest} from "../../../endpoints/chat-endpoint/send-message/poruka-send-request";
import {PorukaSendEndpoint} from "../../../endpoints/chat-endpoint/send-message/poruka-send-endpoint";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {PorukaMarkAsReadEndpoint} from "../../../endpoints/chat-endpoint/mark-as-read/mark-as-read-endpoint";
import {PorukaMarkAsReadRequest} from "../../../endpoints/chat-endpoint/mark-as-read/mark-as-read-request";
import {TranslatePipe} from "@ngx-translate/core";

@Component({
  selector: 'app-chats',
  standalone: true,
  imports: [
    DatePipe,
    NgFor,
    NgForOf,
    NgIf,
    NavbarComponent,
    RouterLink,
    FormsModule,
    SlicePipe,
    NgClass,
    JsonPipe,
    TranslatePipe
  ],
  templateUrl: './chats.component.html',
  styleUrl: './chats.component.css'
})
export class ChatsComponent implements OnInit{
  private apiUrl = 'https://localhost:7002/all-chats';
  groupedMessages: GroupedMessage[] = [];
  user: User = {id:"", role:"", jwt:""}
  selectedChatMessages: PorukaGetAllChatsResponsePoruka[] = [];
  pretragaNaziv: string = ""
  selectedChat: GroupedMessage | null = null;
  newMessage: string = '';
  posiljatelj_id:string = '';
  primatelj_id:string = '';
  constructor(private http:HttpClient,
              private authService:AuthService,
              private cdr: ChangeDetectorRef,
              private porukaSendEndpoint: PorukaSendEndpoint,
              private porukaMarkAsReadEndpoint: PorukaMarkAsReadEndpoint) {
  }
  ngOnInit() {
    this.user = this.authService.getLoggedUser()
    this.getAllChats().subscribe((data)=>{
      this.groupedMessages = data;
      console.log(this.groupedMessages);
    })
  }

  getAllChats():Observable<GroupedMessage[]>
  {
    const url = `${this.apiUrl}?primatelj_id=${this.user.id}`
    return this.http.get<PorukaGetAllChatsResponse>(url).pipe(
      map((response) => {
        console.log("API Response:", response); // Debugging line
        console.log("Poruke:", response.poruke.$values); // Debugging line
        return this.groupMessages(response.poruke.$values);
      })
    );
  }

  private groupMessages(messages: PorukaGetAllChatsResponsePoruka[]):GroupedMessage[]{
    const grouped: { [key: string]: GroupedMessage } = {};

    messages.forEach((msg) => {
      const senderId = msg.posiljatelj_id;
      if (!grouped[senderId]) {
        grouped[senderId] = {
          posiljalacIme: msg.posiljatelj_ime,
          posiljalacId: senderId,
          unreadMessages: 0,
          messages: [],
        };
      }

      grouped[senderId].messages.push({
        id: msg.id,
        korisnik_id: senderId,
        sadrzaj: msg.sadrzaj,
        vrijeme_slanja: new Date(msg.vrijeme_slanja),
        is_seen: msg.is_seen,
      });

      if (!msg.is_seen) {
        grouped[senderId].unreadMessages++;
      }
    });

    return Object.values(grouped);
  }

  getChatMessages(posiljalacId: any) {
    const url = `https://localhost:7002/chat?korisnik1_id=${this.user.id}&korisnik2_id=${posiljalacId}`;

    this.http.get<PorukaGetChatResponse>(url).subscribe(response => {
      if (response.poruke && response.poruke.$values) {
        this.selectedChatMessages = [...response.poruke.$values]; // Osiguraj da se array ispravno dodeli
      } else {
        this.selectedChatMessages = []; // Resetuj ako nema podataka
      }
      console.log(this.selectedChatMessages);
      this.cdr.detectChanges();
    }, error => {
      console.error("Error fetching chat messages:", error);
    });
  }

  onSearchChange(pretraga: string) {
    this.pretragaNaziv = pretraga;

    //this.getAll();
  }

  formatTime(date: Date): string {
    const messageTime = new Date(date);

    const formattedDate = messageTime.toISOString().split('T')[0];
    const formattedTime = messageTime.toISOString().split('T')[1].slice(0,5);
    const formattedTimeDate = `${formattedDate} - ${formattedTime}`;

    return formattedTimeDate;
  }

  selectChat(groupedMessage: GroupedMessage)
  {
    this.selectedChat = groupedMessage;
  }

  sendMessage(newM:string, selectedMessage:any)
  {
    console.log(newM);
    console.log(selectedMessage);
    this.posiljatelj_id = this.user.id;
    if(this.posiljatelj_id != selectedMessage.posiljatelj_id)
      this.primatelj_id = selectedMessage.posiljatelj_id;
    else
      this.primatelj_id = selectedMessage.primatelj_id;

    console.log(this.primatelj_id + ' - primatelj');
    console.log(this.posiljatelj_id + ' - posiljatelj');
    const request: PorukaSendRequest = {
      sadrzaj: newM,
      posiljatelj_id: this.posiljatelj_id,
      korisnik_id: this.primatelj_id,
    };

    this.porukaSendEndpoint.obradi(request) .pipe(switchMap(() => this.http.get<PorukaGetAllChatsResponsePoruka[]>(`https://localhost:7002/chat?korisnik1_id=${this.user.id}&korisnik2_id=${this.selectedChatMessages[0].primatelj_id}`)))
      .subscribe({
        next: data => {
          this.selectedChatMessages = data;
          this.newMessage = ''; // Reset polja
        },
        error: err => console.error('Error:', err)
      });
  }

  markAsRead(chat: GroupedMessage) {
    for (let selectedChatMessagesKey in this.selectedChatMessages) {
      console.log(this.selectedChatMessages[selectedChatMessagesKey])
    }
    chat.unreadMessages = 0;
    console.log('Request: ',this.selectedChatMessages[this.selectedChatMessages.length -1]);
    const request: PorukaMarkAsReadRequest ={
      poruka_id: this.selectedChatMessages[this.selectedChatMessages.length -1].id
    }
    console.log('Request: ',request);
    this.porukaMarkAsReadEndpoint.obradi(request).subscribe(x => {
      console.log(x.message);
    })
  }
}
