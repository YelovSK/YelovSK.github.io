import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { map, Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export class HttpService {
    private readonly client = inject(HttpClient);

    public getWords(): Observable<string[]> {
        return this.client.get('https://raw.githubusercontent.com/dwyl/english-words/refs/heads/master/words_alpha.txt', { responseType: 'text' }).pipe(
            map(response => response.split('\n'))
        );
    }
}