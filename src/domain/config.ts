import { Contact } from "./model";

export class Configuration {
  constructor(public readonly contacts: Set<Contact>) { }
}
