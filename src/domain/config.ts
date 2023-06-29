import { Contact, ContactSymbol } from "./model";

const DEFAULT_CONTACT_SYMBOL: ContactSymbol = "@";

// Must match the enums in package.json
const SUPPORTED_CONTACT_SYMBOLS: ContactSymbol[] = ["@", "#"];

export const CONFIGURATION_SECTION_NAME = "markdown-contacts";

interface Args {
  contacts: Set<Contact>,
  symbol?: ContactSymbol,
}

export class Configuration {
  public readonly contacts: Set<Contact>;
  public readonly symbol: ContactSymbol;

  constructor({ contacts, symbol }: Args) {
    this.contacts = contacts;

    if (symbol) {
      this.assertSymbolIsValid(symbol);
      this.symbol = symbol;
    } else {
      this.symbol = DEFAULT_CONTACT_SYMBOL;
    }
  }

  private assertSymbolIsValid(symbol: ContactSymbol): void {
    if (SUPPORTED_CONTACT_SYMBOLS.includes(symbol)) {
      return; // all good
    }

    throw new Error(
      `Provided contact symbol '${symbol}' must be one of the following:` +
      ` ${SUPPORTED_CONTACT_SYMBOLS.join(', ')}`
    );
  }
}
