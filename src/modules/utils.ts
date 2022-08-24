import { IMessage } from "../redux/features/messages/messageSlice";

const retrieveLocalMessages = (): IMessage[] => {
  try {
    const localMessages = localStorage.getItem("messages");
    if (localMessages) return JSON.parse(localMessages);
    return [];
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

export { retrieveLocalMessages, parseMessage };
