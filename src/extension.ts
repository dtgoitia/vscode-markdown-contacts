import * as vscode from 'vscode';
import { DocumentSelector } from 'vscode';
import { ContactCompletionProvider } from './completions';
import { Configuration, CONFIGURATION_SECTION_NAME } from './domain/config';
import { initialize } from './domain/initialize';
import { Contact, ContactSymbol } from './domain/model';
import { updateContactsAsPerTextDocument } from './findContacts';
import log from './logs';


function readGlobalAndWorkspaceConfiguration(): Configuration {
	const config = vscode.workspace.getConfiguration(CONFIGURATION_SECTION_NAME);

	// Collect contacts
	const globalNames = config.get<Contact[]>('globalNames', []);
	const workspaceNames = config.get<Contact[]>('workspaceNames', []);
	const contacts = new Set<Contact>([...globalNames, ...workspaceNames]);

	// Collect symbol
	const symbol = config.get<ContactSymbol>('symbol');

	const configuration = new Configuration({ contacts, symbol })
	return configuration;
}

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	try {
		const language: DocumentSelector = { language: 'markdown' };

		log.debug('Global and workspace config load started')
		const config = readGlobalAndWorkspaceConfiguration();
		log.debug('Global and workspace config load completed')

		// Domain
		log.debug('Domain initialization started')
		const { contactManager } = initialize({ config });
		const provider = new ContactCompletionProvider({ contactManager, config });
		log.debug('Domain initialization completed')

		// Register completions in VSCode
		const triggerCharacters = [config.symbol];
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
				updateContactsAsPerTextDocument({ document, contactManager, config });
			}
		);

		vscode.workspace.onDidChangeConfiguration(
			(change: vscode.ConfigurationChangeEvent) => {
				if (change.affectsConfiguration(CONFIGURATION_SECTION_NAME) === false) return;

				const updatedConfig = readGlobalAndWorkspaceConfiguration();
				contactManager.deleteAllConfigContacts();
				contactManager.addConfigContacts(updatedConfig.contacts);
			}
		)

		vscode.workspace.onDidSaveTextDocument(
			(document) => {
				log.debug(`vscode.workspace.onDidSaveTextDocument`);
				updateContactsAsPerTextDocument({ document, contactManager, config });
			}
		);
		log.debug('TextDocument listener registration completed')

		log.debug('Scanning active TextEditor started')
		const activeTextEditor = vscode.window.activeTextEditor;
		if (activeTextEditor) {
			updateContactsAsPerTextDocument({ document: activeTextEditor.document, contactManager, config });
		}
		log.debug('Scanning active TextEditor completed')

	} catch (error) {
		log.error(error);
		vscode.window.showErrorMessage(
			`Failed to initialize ${CONFIGURATION_SECTION_NAME} extension, reason: ${error}`
		);
	}
}

// this method is called when your extension is deactivated
export function deactivate() { }
