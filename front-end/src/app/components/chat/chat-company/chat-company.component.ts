import {Component, OnInit} from '@angular/core';
import {RouterLink} from "@angular/router";
import {NavbarComponent} from "../../layout/navbar/navbar.component";
import {FormsModule} from "@angular/forms";
import {NgClass, NgForOf, NgIf, SlicePipe} from "@angular/common";
import {FooterComponent} from "../../layout/footer/footer.component";

interface Chat {
  senderName: string;
  senderSurname: string;
  lastMessage: string;
  lastMessageTime: Date;
  unreadMessages: number;
  messages: Message[];
}

interface Message {
  content: string;
  sender: string;
  timestamp: Date;
}

@Component({
  selector: 'app-chat-company',
  standalone: true,
  imports: [
    RouterLink,
    NavbarComponent,
    FormsModule,
    NgForOf,
    SlicePipe,
    NgIf,
    NgClass,
    FooterComponent
  ],
  templateUrl: './chat-company.component.html',
  styleUrl: './chat-company.component.css'
})
export class ChatCompanyComponent implements OnInit{
  pretragaNaziv: string = "";
  newChat: any


  ngOnInit(): void {

    this.newChat = history.state.chat;
    console.log(this.newChat);


    const chat = {
      senderName: this.newChat.ime,
      senderSurname: this.newChat.prezime,
      lastMessage: 'No messages yet',
      lastMessageTime: new Date(),
      unreadMessages: 0,
      messages: [

      ]
    }

    this.chats.unshift(chat)

    this.selectedChat = chat

  }

  onSearchChange(pretraga: string) {
    this.pretragaNaziv = pretraga;

    //this.getAll();
  }

  chats: Chat[] = [
    {
      senderName: 'John',
      senderSurname: 'Doe',
      lastMessage: 'Great, John. We’ll send you a calendar invite shortly. Talk to you then!',
      lastMessageTime: new Date(),
      unreadMessages: 2,
      messages: [
        { content: 'Hey, how are you?', sender: 'John Doe', timestamp: new Date() },
        { content: ' Great, John. I’ll send you a calendar invite shortly. Talk to you then!', sender: 'You', timestamp: new Date() }
      ]
    },
    {
      senderName: 'Jane',
      senderSurname: 'Smith',
      lastMessage: 'I’m Jane Smith, and I’m currently a Frontend Developer.',
      lastMessageTime: new Date(),
      unreadMessages: 0,
      messages: [
        { content: ' I’m Jane Smith, and I’m currently a Frontend Developer. ' +
            'I’m not actively looking for a new role at the moment. ' +
            'I wanted to connect and see if there are any future opportunities that might be a good fit for my skills.!', sender: 'Jane Smith', timestamp: new Date() }
      ]
    },
    {
      senderName: 'Alice',
      senderSurname: 'Johnson',
      lastMessage: 'Agreed, thank you',
      lastMessageTime: new Date(),
      unreadMessages: 5,
      messages: [
        { content: 'Agreed, thank you', sender: 'Alice Johnson', timestamp: new Date() }
      ]
    }
  ];

  selectedChat: Chat | null = null;
  newMessage: string = '';

  selectChat(chat: Chat): void {
    this.selectedChat = chat;
  }

  sendMessage(): void {
    if (this.selectedChat && this.newMessage.trim()) {
      const message: Message = {
        content: this.newMessage.trim(),
        sender: 'You',
        timestamp: new Date()
      };
      this.selectedChat.messages.push(message);
      this.newMessage = '';
      this.selectedChat.lastMessage = message.content;
      this.selectedChat.lastMessageTime = message.timestamp;
    }
  }

  formatTime(date: Date): string {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  }


  /*chats: Chat[] = [
    {
      senderName: 'John',
      senderSurname: 'Doe',
      lastMessage: 'Hey, how are you?',
      lastMessageTime: new Date(),
      unreadMessages: 2
    },
    {
      senderName: 'Jane',
      senderSurname: 'Smith',
      lastMessage: 'Let’s catch up tomorrow!',
      lastMessageTime: new Date(),
      unreadMessages: 0
    },
    {
      senderName: 'Alice',
      senderSurname: 'Johnson',
      lastMessage: 'See you soon.',
      lastMessageTime: new Date(),
      unreadMessages: 5
    }
  ];

  formatTime(date: Date): string {
    // Custom function to format the time for display
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  }*/

}
