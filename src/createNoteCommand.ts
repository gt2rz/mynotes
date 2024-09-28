
import fs from 'node:fs';
import path from 'node:path';
import * as vscode from 'vscode';

export async function createNoteCommand() {
  const noteName = await vscode.window.showInputBox({
    prompt: 'Indica el nombre para el archivo de notas',
    placeHolder: 'Nombre de la nota'
  });

  if(noteName){
    // Get the first workspace folder
    const workspaceFolders = vscode.workspace.workspaceFolders;

    // Validate if the folder exists
    const myNotesFolder = workspaceFolders ? path.join(workspaceFolders[0].uri.fsPath, 'my_notes') : '';
    
    // Set the file name
    const fileName = `${noteName}.md`;

    // Validate if the folder exists and create it if it doesn't
    if(!fs.existsSync(path.join(myNotesFolder, fileName))){
      await vscode.workspace.fs.createDirectory(vscode.Uri.file(myNotesFolder));
      vscode.window.showInformationMessage(`Se ha creado la carpeta ${myNotesFolder}`);
    }
    
  
    // Define the content of the file
    const content = `# ${noteName}\n`;

    // Create the file in the folder of the workspace
    const filePath = vscode.Uri.file(path.join(myNotesFolder, fileName));

    // Write the file with the content
    await vscode.workspace.fs.writeFile(filePath, Buffer.from(content, 'utf-8'));

    // Notify the user that the file was created
    vscode.window.showInformationMessage(`Se ha creado el archivo ${fileName} en ${filePath.fsPath}`);

    // Open the file
    const doc = await vscode.workspace.openTextDocument(filePath);
    await vscode.window.showTextDocument(doc);

  }
}