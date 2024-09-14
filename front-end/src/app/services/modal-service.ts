import { Injectable } from '@angular/core';
declare var bootstrap: any;

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  openModal(modalId: string, title: string, body: string, buttons: any[]) {
    const modalElement = document.getElementById(modalId);
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  // Updated closeModal method that returns a Promise
  closeModal(modalId: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const modalElement = document.getElementById(modalId);
      if (modalElement) {
        const modalInstance = bootstrap.Modal.getInstance(modalElement);
        if (modalInstance) {
          modalInstance.hide();
          modalElement.addEventListener('hidden.bs.modal', () => {
            resolve(); // Resolve the promise once the modal is fully hidden
          }, { once: true });
        } else {
          resolve(); // Resolve immediately if no modal instance is found
        }
      } else {
        resolve(); // Resolve immediately if no modal element is found
      }
    });
  }
}
