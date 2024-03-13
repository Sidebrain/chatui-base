import OpenAI from "openai";
import type { ChatCompletionMessageParam } from "openai/resources/index.mjs";

const useOpenAi = () => {
  // create main instance of OpenAI
  const openai = new OpenAI({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
  });

  const getChatCompletion = async (
    messageList: ChatCompletionMessageParam[],
  ) => {
    // ...
    try {
      console.log("messageList", messageList);
      console.log("openai", openai);
      const response = await openai.chat.completions.create({
        messages: messageList,
        model: "gpt-3.5-turbo",
        // model: "gpt-4-turbo-preview",
      });
      return response.choices[0].message;
    } catch (err) {
      throw new Error(`Failed to get OpenAI response. Error: ${err}`);
    } finally {
      //....
    }
  };

  return { getChatCompletion };
};

export default useOpenAi;
