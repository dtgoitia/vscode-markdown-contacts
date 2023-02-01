import { Observable, Subject } from "rxjs";
import { unreachable } from "../devex/errors";
import { Contact } from "./model";
import { SortAction } from "./sort";

export class ContactManager {
  /**
   * Contacts from config and from document should be separated to that config contacts
   * can be removed when the config is updated - and therefore might be necessary to
   * remove items.
   */
  public changes$: Observable<ContactChanges>;

  private contactsInConfig: Set<Contact>;
  private contactsInDocument: Set<Contact>;
  private changesSubject: Subject<ContactChanges>;

  constructor() {
    this.changesSubject = new Subject<ContactChanges>();
    this.changes$ = this.changesSubject.asObservable();

    this.contactsInConfig = new Set<Contact>();
    this.contactsInDocument = new Set<Contact>();
  }

  public addConfigContacts(contacts: Iterable<Contact>): void {
    const addedContacts = new Set<Contact>();
    for (const contact of contacts) {
      this.contactsInConfig.add(contact);
      addedContacts.add(contact);
    }

    this.changesSubject.next(new ConfigContactsAdded(addedContacts));
  }

  public deleteAllConfigContacts(): void {
    this.contactsInConfig = new Set<Contact>();
    this.changesSubject.next(new AllConfigContactsDeleted());
  }

  public batchAdd(contacts: Iterable<Contact>): void {
    const addedContacts = new Set<Contact>();
    for (const contact of contacts) {
      this.contactsInConfig.add(contact);
      addedContacts.add(contact);
    }

    this.changesSubject.next(new DocumentContactsAdded(addedContacts));
  }

  public getAll(): Contact[] {
    const allDeduplicatedContacts: Contact[] = [];

    for (const contactInConfig of this.contactsInConfig) {
      allDeduplicatedContacts.push(contactInConfig);
    }

    for (const contactInDocument of this.contactsInDocument) {
      if (this.contactsInConfig.has(contactInDocument)) {
        continue;
      }
      allDeduplicatedContacts.push(contactInDocument);
    }

    return allDeduplicatedContacts.sort(sortContactsAlphabetically);
  }
}

class ConfigContactsAdded {
  constructor(public readonly contacts: Set<Contact>) { }
}

class DocumentContactsAdded {
  constructor(public readonly contacts: Set<Contact>) { }
}

class AllConfigContactsDeleted { }
class AllDocumentContactsDeleted { }

type ContactChanges = ConfigContactsAdded
  | DocumentContactsAdded
  | AllConfigContactsDeleted
  | AllDocumentContactsDeleted;

function sortContactsAlphabetically(a: Contact, b: Contact): SortAction {
  const name_a = a.toLowerCase();
  const name_b = b.toLowerCase();
  switch (true) {
    case name_a === name_b:
      return SortAction.PRESERVE_ORDER;
    case name_a < name_b:
      return SortAction.FIRST_A_THEN_B;
    case name_a > name_b:
      return SortAction.FIRST_B_THEN_A;
    default:
      throw unreachable();
  }
}
