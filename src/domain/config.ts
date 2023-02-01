import { Contact } from "./model";

export const CONFIGURATION_SECTION_NAME = "markdown-contacts";

export class Configuration {
  constructor(public readonly contacts: Set<Contact>) { }
}
