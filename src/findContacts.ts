import * as vscode from 'vscode';
import { Profiler } from './devex/profiler';
import { ContactManager } from './domain/contacts';
import { Contact } from './domain/model';
import log from './logs';

const CONTACT_PATTERN = /(^|\s)(@[A-Z][a-zA-Z]*)/g;
// [...`@HeyYoo, this is a text with @Foo and
// @Bar which are great, but this one: Bad@Contact is not`.matchAll(/(^|\s)(@[A-Z][a-zA-Z]*)/g)]
//   .map(x => console.log(x[2]))

export function updateContactsAsPerTextDocument({ document, contactManager }: { document: vscode.TextDocument, contactManager: ContactManager }): void {
  if (document.isClosed) {
    return;
  }

  const profiler = new Profiler();
  profiler.start();
  const contacts = findContactsInText(document.getText());
  profiler.end();
  log.debug(`Document contacts scanned in`, profiler.delta(), `ms`);

  log.info(`contacts:`, contacts);
  contactManager.batchAdd(contacts);
}

function findContactsInText(text: string): Set<Contact> {
  // Brute force approach where you scan the whole document
  // Potential optimization: look for the edited chunks instead
  const matchedIterator = text.matchAll(CONTACT_PATTERN);
  log.debug(text)

  const rawContacts = new Set<Contact>();
  for (const match of matchedIterator) {
    const rawContact = match[2];  // retrieve group 2 from this match
    const contact = cleanContact(rawContact);
    rawContacts.add(contact);
  }

  return rawContacts;
}

function cleanContact(raw: string): Contact {
  /**
   * Assumptions: `raw` will always look like this: "@FooBar"
   */

  // drop leading "@"
  return raw.slice(1);
}
