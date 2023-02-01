import { Configuration } from "./config";
import { ContactManager } from "./contacts";

interface Args {
  config: Configuration;
}

interface App {
  contactManager: ContactManager;
}

export function initialize({ config }: Args): App {
  const contactManager = new ContactManager();

  contactManager.batchAdd(config.contacts)

  return { contactManager };
}
