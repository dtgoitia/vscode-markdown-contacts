import { ContactManager } from "./contacts";

interface App {
  contactManager: ContactManager;
}

export function initialize(): App {
  // TODO move load contacts from global and workspace configs in here
  const contactManager = new ContactManager();

  return { contactManager };
}