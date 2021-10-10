## Extension development

* Install project dependencies:

  ```shell
  npm install  # do not use `npm ci`
  ```

* To debug the extension in VSCode:

  1. Run TypeScript compiler: `npm run watch`.
  1. Open `src/extension.ts` in your editor.
  1. Press `F5`.
  1. Once the new VSCode instance is launched, select the Markdown language.

* To manually publish the extension:

  1. Set up credentials as environment variables:

      - `VSCODE_PUBLISHER_ID`: publisher ID, see [here][1] for more context.
      - `VSCE_PAT`: personal access token, follow [these instructions][1] to get one.

  1. Publish the extension bumping the version:

      ```shell
      npm run publish minor  # major/minor/patch, see `npm version --help` for more options
      ```

  This will bundle the extension with `webpack` (same as `npm run vscode:prepublish`) and upload it to the extension marketplace.

  NOTE: version will not be automatically bumped at `package.json`.

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

## Release Notes

### 0.0.6

* Manually update release notes

### 0.0.5

* Update instructions to manually publish extension
* Expose `vsce` via NPM scripts
* Document how to get latest extension settings
* Add instructions to manually publish package
* Add NPM script to manually publish package
* Document previous releases
* Document how to debug the extension in VSCode
* Update dependencies

### 0.0.4

* (skipped due to publishing mistakes)

### 0.0.3

* Add contributes to enable schema for the settings of the extension

### 0.0.2

* Fix: merge global and workspace settings

### 0.0.1

* Initial release

<!-- External references -->

[1]: https://code.visualstudio.com/api/working-with-extensions/publishing-extension#get-a-personal-access-token "VSCode. Publishing extensions: get a personal access token"