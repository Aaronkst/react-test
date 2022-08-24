import { IMessage } from "../redux/features/messages/messageSlice";
import { pageSize } from "../config/pagination.json";

const retrieveLocalMessages = (
  skip: number = 0
): { data: IMessage[]; more: boolean } => {
  try {
    skip = skip * pageSize;
    const localMessages = localStorage.getItem("messages");
    if (localMessages) {
      let messages = JSON.parse(localMessages);
      if (messages.length <= pageSize) return { data: messages, more: false };
      else {
        messages = messages.reverse();
        console.log(messages);
        if (skip + pageSize >= messages.length)
          return {
            data: messages.slice(skip, skip + pageSize).reverse(),
            more: false,
          };
        return {
          data: messages.slice(skip, skip + pageSize).reverse(),
          more: true,
        };
      }
    }
    return { data: [], more: false };
  } catch (e) {
    throw e;
  }
};

const updateLocalMessage = (newMsg: IMessage): boolean => {
  try {
    const localMessages = retrieveLocalMessages();
    localStorage.setItem(
      "messages",
      JSON.stringify(localMessages.data.concat(newMsg))
    );
    return true;
  } catch (e) {
    throw e;
  }
};

const parseMessage = (message: string): IMessage => {
  try {
    const sender = sessionStorage.getItem("uid");
    if (sender) return { sender, message };
    throw new Error("Invalid Sender");
  } catch (e) {
    throw e;
  }
};

export { retrieveLocalMessages, updateLocalMessage, parseMessage };
