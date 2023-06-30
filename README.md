## Extension development

* Install project dependencies:

  ```bash
  bin/set_up_development_environment
  ```

* Debug the extension in VSCode:

  1. Run TypeScript compiler: `npm run watch`.
  1. Open `src/extension.ts` in your editor.
  1. Press `F5`.
  1. Once the new VSCode instance is launched, select the Markdown language.

* Publish extension:

  1. Add last changes to README - ignore commits with version changes and updates to README.md to add release changes.

  1. Manually bump version:

      ```bash
      npm version patch  # major/minor/patch/...
                         # see `npm version --help` for more options
      ```
    
      Check [published versions](https://marketplace.visualstudio.com/items?itemName=dtgoitia.markdown-contacts) if you are unsure about whether you need to bump the version or not.
  
  1. Push latest changes: `git push --atomic origin master`  (to ensure tags are sent simultaneously)

  1. Go to [CI](https://github.com/dtgoitia/vscode-markdown-contacts/actions/) to monitor deployment.
    Note: the deployment will fail if there is not a new tag.

* (**AVOID WHEN POSSIBLE**, use CI instead)
  Manually publish the extension:

  1. Set up credentials as environment variables:

      - `VSCODE_PUBLISHER_ID`: publisher ID, see [here][1] for more context.
      - `VSCE_PAT`: personal access token, follow [these instructions][1] to get one.

  1. Publish the extension bumping the version:

      ```bash
      npm run publish minor  # major/minor/patch/...
                             # see `npm version --help` for more options
      ```

  This will bundle the extension with `webpack` (same as `npm run vscode:prepublish`) and upload it to the extension marketplace.

## Features

...

## Requirements

...

## Extension Settings

In the global settings (optional):

```json
{
  "markdown-contacts.globalNames": [
    "GlobalName_A",
    "GlobalName_B",
  ],
}
```

In the workspace settings (optional):

```json
{
  "markdown-contacts.workspaceNames": [
    "NameA",
    "NameB",
  ],
}
```

Reload VSCode when you change the list of names in the extension settings.

## Known Issues

...

<!-- External references -->

[1]: https://code.visualstudio.com/api/working-with-extensions/publishing-extension#get-a-personal-access-token "VSCode. Publishing extensions: get a personal access token"
