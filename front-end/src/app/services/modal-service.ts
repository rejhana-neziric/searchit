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

  closeModal(modalId: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const modalElement = document.getElementById(modalId);
      if (modalElement) {
        const modalInstance = bootstrap.Modal.getInstance(modalElement);
        if (modalInstance) {
          modalInstance.hide();
          modalElement.addEventListener('hidden.bs.modal', () => {
            resolve();
          }, { once: true });
        } else {
          resolve();
        }
      } else {
        resolve();
      }
    });
  }
}
