import * as vscode from 'vscode';
import { Profiler } from './devex/profiler';
import { Configuration } from './domain/config';
import { ContactManager } from './domain/contacts';
import { Contact, ContactSymbol } from './domain/model';
import log from './logs';


export function updateContactsAsPerTextDocument({ document, contactManager, config }: { document: vscode.TextDocument, contactManager: ContactManager, config: Configuration }): void {
  if (document.isClosed) {
    log.warning(`Won't scan contacts, as the document is closed`)
    return;
  }

  const profiler = new Profiler();
  profiler.start();
  const text = document.getText();
  if (text.length === 0) {
    log.warning(`Won't scan contacts, as the document text length is zero`)
    return;
  }
  const contacts = findContactsInText(text, config.symbol);
  profiler.end();
  log.debug(`Document contacts scanned in`, profiler.delta(), `ms`);

  contactManager.batchAdd(contacts);
}

function buildRegexPattern(symbol: ContactSymbol): RegExp {
  const pattern = `${symbol}[A-Z][a-zA-Z]*`;
  return new RegExp(pattern, "g");
}

function findContactsInText(text: string, symbol: ContactSymbol): Set<Contact> {
  // Brute force approach where you scan the whole document
  // Potential optimization: look for the edited chunks instead
  const pattern = buildRegexPattern(symbol);
  const matchedIterator = text.matchAll(pattern);

  const rawContacts = new Set<Contact>();
  for (const match of matchedIterator) {
    const rawContact = match[0];
    const contact = cleanContact(rawContact);
    rawContacts.add(contact);
  }

  log.info(`Found ${rawContacts.size} contacts`);

  return rawContacts;
}

function cleanContact(raw: string): Contact {
  /**
   * Assumptions: `raw` will always look like this: "@FooBar"
   */

  // drop leading contact symbol
  return raw.slice(1);
}
