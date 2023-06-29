import * as vscode from 'vscode';
import { Configuration } from './domain/config';
import { ContactManager } from "./domain/contacts";
import { Contact, ContactSymbol } from "./domain/model";

interface Args {
  contactManager: ContactManager;
  config: Configuration;
}

/**
 * This provider will dynamically update the completions as contacts in ContactManager
 * update.
 */
export class ContactCompletionProvider implements vscode.CompletionItemProvider {
  private readonly contactManager: ContactManager;
  private readonly config: Configuration;

  constructor({ contactManager, config }: Args) {
    this.contactManager = contactManager;
    this.config = config;
  }

  public provideCompletionItems(
    document: vscode.TextDocument,
    position: vscode.Position,
    _token: vscode.CancellationToken,
  ): vscode.ProviderResult<vscode.CompletionItem[]> {
    const symbol = this.config.symbol;

    return this.contactManager
      .getAll()
      .map((contact) => createCompletionItemFromContact(contact, symbol));
  }
}

function createCompletionItemFromContact(contact: Contact, symbol: ContactSymbol): vscode.CompletionItem {
  const kind = vscode.CompletionItemKind.Text;
  const label = contact;  // label shown in the completion pop up
  const completionItem = new vscode.CompletionItem(label, kind);

  completionItem.filterText = `${symbol}${contact}`;  // user input is matched against this
  completionItem.insertText = contact; // string inserted after the triggerCharacters

  return completionItem;
}
