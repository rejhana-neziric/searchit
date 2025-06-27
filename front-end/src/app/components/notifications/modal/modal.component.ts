import {Component, Input} from '@angular/core';
import {ModalService} from "../../../services/modal-service";
import {NgClass, NgForOf} from "@angular/common";

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [
    NgClass,
    NgForOf
  ],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent {
  @Input() modalId!: string;
  @Input() title!: string;
  @Input() body!: string;
  @Input() buttons!: { text: string, class: string, action: () => void }[];

  constructor(private modalService: ModalService) {}

  close() {
    this.modalService.closeModal(this.modalId);
  }

  handleButtonClick(action: () => void) {
    if (action) {
      action();
      // Optionally close the modal after action
      this.close();
    }
  }
}
