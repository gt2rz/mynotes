
import * as vscode from 'vscode';
import { createNoteCommand } from './createNoteCommand';

export function activate(context: vscode.ExtensionContext) {

	const createNoteCommandDisposable = vscode.commands.registerCommand('my-markdown-notes.createNote', createNoteCommand);
	context.subscriptions.push(createNoteCommandDisposable);
	
}

export function deactivate() {}
