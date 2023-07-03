# Changelog

## 1.1.3 (2023-07-03)

* `2d95346` fix: scan active TextEditor on start
* `6375085` perf: exit early if document is zero-length
* `15f4ba7` fix: improve logging

## 1.1.2 (2023-06-30)

* `d5be0a6` deps(devex): update `vsce` to `@vscode/vsce`
* `b97db5f` deps(ci): upgrade GitHub actions
* `60d40a6` fix(ci): do not fail if release already published

## 1.1.1 (2023-06-30)

* `6f11f18` chore: add a license
* `f90b930` devex: add logs to pre-push checks
* `0e943e1` devex: always check if repo is ready to release before pushing from master
* `db560f0` devex: compile extension only if TypeScript files change
* `51836eb` devex: update script to check if commit is ready to be released
* `0cf9ac3` docs: regenerate CHANGELOG file
* `58e441d` docs: remove release notes from README

## 1.1.0 (2023-06-29)

* `f60b1e5` docs: update release notes
* `987128d` feat: support a custom contact symbol
* `d890b2d` devex(ci): always attempt to publish master in CI

## 1.0.1 (2023-06-29)

* `4edcba1` docs: update release notes
* `d95a77d` devex(pre-push): ignore release doc updates commits and tags
* `e495177` docs: publishing instructions
* `712ca39` devex(pre-push): fetch all remote tags
* `fb5671d` devex: add script to set up repo
* `648a3cb` devex(pre-push): ensure release docs are ready
* `7d4c18d` devex(pre-commit): build extension
* `76de8bd` deps: install `husky`
* `7e64169` devex(ci): move CI from CircleCI to GitHub Actions
* `a602471` devex: add NPM script to validate VSCode Marketplace credentials

## 1.0.0 (2023-06-29)

* `ea390d8` docs: update release notes
* `6080f3a` deps: upgrade to latest VSCode extension recommended packages

## 0.1.1 (2023-02-01)

* `066966a` docs: update release notes
* `baee556` feat: support config hot-reload
* `e5d887e` refactor: pass config into initialization logic

## 0.1.0 (2023-02-01)

* `cd3bfc8` feat: suggest names in open document + big refactor
* `b015d08` deps: install `rxjs`
* `03cc3a5` devex: pin used Node version
* `c5be346` docs: fix minor formatting issue

## 0.0.7 (2021-10-12)

* `35c4dbe` docs(ci): document how to publish via CI
* `86dc56b` devex(ci): set up CI to publish extension

## 0.0.6 (2021-10-10)

* `2efabc5` docs: update instructions to manually publish extension

## 0.0.5 (2021-10-10)

(no changes)

## 0.0.4 (2021-10-10)

* `0f6b330` Update instructions to manually publish extension
* `ce9e612` Expose `vsce` via NPM scripts
* `939fd18` Document how to get latest extension settings
* `6d7f9e5` Add instructions to manually publish package
* `ecc2f94` Add NPM script to manually publish package
* `7cd4404` Document latest release notes
* `6b4e58a` Document previous releases
* `5401bfe` Document how to debug extension
* `7c96728` Update dependencies
* `32b9463` Update contributes schema
* `e4d674b` Bump path version: 0.0.1 -> 0.0.2
* `617114b` Fix: merge global and workspace settings
* `62189bb` WIP: trying to publish
* `97e79d9` Add vsce to package extension
* `89a1af7` Quickly document how to bundle extension
* `b3c8149` POC
* `4cd536c` First commit
