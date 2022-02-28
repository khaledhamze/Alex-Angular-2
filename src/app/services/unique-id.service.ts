import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class UniqueIdService {

    getUniqueId(): number {
        return Math.round(Math.random() * 100000);
    }
}