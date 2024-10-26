import type { Masterchat } from "masterchat";

export function sendMessage(mc: Masterchat, content: string) {
  if (content.length === 0)
    return;
  if (content.length > 200) {
    const messages = [];
    while (content.length > 200) {
      messages.push(content.substring(0, 200));
      content = content.substring(200);
    }
    for (const message of messages) {
      mc.sendMessage(message);
    }
  }
  else {
    mc.sendMessage(content);
  }
}
