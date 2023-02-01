import { Observable, Subject } from "rxjs";
import { unreachable } from "../devex/errors";
import { Contact } from "./model";
import { SortAction } from "./sort";

export class ContactManager {
  public changes$: Observable<ContactChanges>;

  private contacts: Set<Contact>;
  private changesSubject: Subject<ContactChanges>;

  constructor() {
    this.changesSubject = new Subject<ContactChanges>();
    this.changes$ = this.changesSubject.asObservable();

    this.contacts = new Set<Contact>();
  }

  public add(contact: Contact): void {
    this.contacts.add(contact);

    this.changesSubject.next(new ContactAdded(contact));
  }

  public batchAdd(contacts: Iterable<Contact>): void {
    const addedContacts = new Set<Contact>();
    for (const contact of contacts) {
      this.contacts.add(contact);
      addedContacts.add(contact);
    }

    this.changesSubject.next(new ContactBatchAdded(addedContacts));
  }

  public getAll(): Contact[] {
    return [...this.contacts.values()].sort(sortContactsAlphabetically);
  }
}

class ContactAdded {
  constructor(public readonly contact: Contact) { }
}

class ContactBatchAdded {
  constructor(public readonly contacts: Set<Contact>) { }
}

type ContactChanges = ContactAdded | ContactBatchAdded;

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
