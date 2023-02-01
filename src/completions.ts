import * as vscode from 'vscode';
import { ContactManager } from "./domain/contacts";
import { Contact } from "./domain/model";


/**
 * This provider will dynamically update the completions as contacts in ContactManager
 * update.
 */
export class ContactCompletionProvider implements vscode.CompletionItemProvider {
  private readonly contactManager: ContactManager;
  constructor({ contactManager }: { contactManager: ContactManager }) {
    this.contactManager = contactManager;
  }

  public provideCompletionItems(
    document: vscode.TextDocument,
    position: vscode.Position,
    _token: vscode.CancellationToken,
  ): vscode.ProviderResult<vscode.CompletionItem[]> {
    return this.contactManager
      .getAll()
      .map(createCompletionItemFromContact);
  }
}

function createCompletionItemFromContact(contact: Contact): vscode.CompletionItem {
  const kind = vscode.CompletionItemKind.Text;
  const label = contact;  // label shown in the completion pop up
  const completionItem = new vscode.CompletionItem(label, kind);

  completionItem.filterText = `@${contact}`;  // user input is matched against this
  completionItem.insertText = contact; // string inserted after the triggerCharacters

  return completionItem;
}
