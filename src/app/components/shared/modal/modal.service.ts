import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ModalService {

    private modalNotification = new Subject<boolean>();

    openPopup() {
        this.modalNotification.next(true);
    }

    closePopup() {
        this.modalNotification.next(false);
    }

    modalSubscriber(): Observable<boolean> {
        return this.modalNotification.asObservable();
    }
}