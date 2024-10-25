import { Masterchat, type AddChatItemAction } from "masterchat";

function processChats(chats: AddChatItemAction[]) {
  if (chats.length <= 0) return;
  console.log(chats);
}

export async function startYouTube() {
  const mc = await Masterchat.init(process.env.YOUTUBE_STREAM_ID!, {
    credentials: process.env.YOUTUBE_BOT_CREDENTIALS!,
  });

  mc.on("chats", processChats);

  await mc.listen({ ignoreFirstResponse: true });
}
