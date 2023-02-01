import * as vscode from 'vscode';
import { DocumentSelector } from 'vscode';
import { ContactCompletionProvider } from './completions';
import { Configuration } from './domain/config';
import { initialize } from './domain/initialize';
import { Contact } from './domain/model';
import { updateContactsAsPerTextDocument } from './findContacts';
import log from './logs';


function readGlobalAndWorkspaceConfiguration(): Configuration {
	const config = vscode.workspace.getConfiguration('markdown-contacts');
	const globalNames = config.get<Contact[]>('globalNames', []);
	const workspaceNames = config.get<Contact[]>('workspaceNames', []);
	const names = new Set<Contact>([...globalNames, ...workspaceNames]);
	const configuration = new Configuration(names)
	return configuration;
}

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	try {
		const language: DocumentSelector = { language: 'markdown' };
		const triggerCharacters = ['@'];

		log.debug('Global and workspace config load started')
		const config = readGlobalAndWorkspaceConfiguration();
		log.debug('Global and workspace config load completed')

		// Domain
		log.debug('Domain initialization started')
		const { contactManager } = initialize({ config });
		const provider = new ContactCompletionProvider({ contactManager });
		log.debug('Domain initialization completed')

		// Register completions in VSCode
		log.debug('Completion provider registration started')
		const subscription = vscode
			.languages
			.registerCompletionItemProvider(language, provider, ...triggerCharacters);
		context.subscriptions.push(subscription);
		log.debug('Completion provider registration completed')


		log.debug('TextDocument listener registration started')
		vscode.workspace.onDidOpenTextDocument(
			(document) => {
				log.debug(`vscode.workspace.onDidOpenTextDocument`);
				updateContactsAsPerTextDocument({ document, contactManager });
			}
		);

		vscode.workspace.onDidSaveTextDocument(
			(document) => {
				log.debug(`vscode.workspace.onDidSaveTextDocument`);
				updateContactsAsPerTextDocument({ document, contactManager });
			}
		);
		log.debug('TextDocument listener registration completed')
	} catch (error) {
		log.error(error);
		vscode.window.showErrorMessage(`Failed to initialize markdown-contacts extension, reason: ${error}`)
	}
}

// this method is called when your extension is deactivated
export function deactivate() { }
