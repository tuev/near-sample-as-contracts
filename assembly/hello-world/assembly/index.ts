import { context, logging, PersistentDeque } from "near-sdk-as";

export function sayHelloWorld(): string {
  logging.log("sayHelloWorld() was called");

  return "Hello World!";
}

export function saveMessage(message: string, sender?: string): bool {
  logging.log("saveMyMessage() was called");

  const author = sender || context.sender

  assert(message.length > 0, "Message can not be blank.");
  const messages = new PersistentDeque<string>(`messages_${author}`);
  messages.pushFront(author + " says " + message);

  return true;
}

export function getAllMessages(sender?: string): Array<string> {
  logging.log(`getAllMessages() was called by ${sender || context.sender}`);
  const messages = new PersistentDeque<string>(`messages_${sender || context.sender}`);
  let results = new Array<string>();

  while (!messages.isEmpty) {
    results.push(messages.popBack());
  }

  return results;
}
