import { Injectable } from '@angular/core';

const SEPARATOR = ";//;"

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  public load(key: string): string | null {
    return localStorage.getItem(key);
  }

  public getValuesOf(key: string): Array<string> {
    const saved_sequance = this.load(key);

    if(saved_sequance === null) {
      throw new Error("Could not load: ".concat(key));
    }

    return saved_sequance.split(SEPARATOR);
  }

  public store(key: string, value: string): void {
    let already_stored = this.load(key);
    let sequence_to_save: string = ""

    if(already_stored === null) {
      sequence_to_save += value.concat(SEPARATOR);
    } else {
      sequence_to_save = already_stored.concat(
        value.concat(SEPARATOR)
      )
    }

    localStorage.setItem(key, sequence_to_save);
  }
}
