import backend, {
  AddMessagetoConversationType,
} from "@/services/backendService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  AuthorizedAIResponseRequestType,
  AuthorizedConversationRequestType,
} from "@/types/BackendDatabaseModelTypes";
import useConversationStore from "./useConversationStore";

const useGetMessagesFromConversation = ({
  convId,
  userId,
}: AuthorizedConversationRequestType) => {
  return useQuery({
    queryKey: ["getAllMessagesFromConversation", { convId, userId }],
    queryFn: async () =>
      await backend.getAllMessagesOfConversation({ convId, userId }),
  });
};

const useGetResponseOfConversation = ({
  convId,
  userId,
  selectedModel,
}: AuthorizedAIResponseRequestType) => {
  // backend expects the llm model along with the user id and conversation id
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () =>
      await backend.getResponseOfConversation({
        convId,
        userId,
        selectedModel,
      }),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["getAllMessagesFromConversation", { convId, userId }],
      }),
  });
};

const useAddMessageToConversation = () => {
  const queryClient = useQueryClient();
  const mutationFnAddMsg = async ({
    message,
    userId,
    convId,
  }: AddMessagetoConversationType) => {
    await backend.addMessagetoConversation({ message, userId, convId });
    queryClient.invalidateQueries({
      queryKey: ["getAllMessagesFromConversation", { convId, userId }],
    });
  };
  return useMutation({
    mutationFn: mutationFnAddMsg,
  });
};

const useGetConversationsByUserId = (userId: number) => {
  return useQuery({
    queryKey: ["getConversationsByUserId", userId],
    queryFn: async () => await backend.getAllConversationsByUserId(userId),
  });
};

const useCreateConversationForUserId = (userId: number) => {
  const { addConversation, setActiveConvId } = useConversationStore(
    (state) => ({
      addConversation: state.addConversation,
      setActiveConvId: state.setActiveConvId,
    }),
  );
  // const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      const newConv = await backend.createConversationForUserId(userId);
      return newConv;
    },
    mutationKey: ["createConversation"],
    onSuccess: (data) => {
      addConversation(data);
      setActiveConvId(data.id);
    },
  });
};

const useGetAvailableLLMs = () => {
  return useQuery({
    queryKey: ["getAvailableLLMs"],
    queryFn: async () => await backend.getAvailableLLMModels(),
  });
};

export {
  useGetMessagesFromConversation,
  useGetResponseOfConversation,
  useAddMessageToConversation,
  useGetConversationsByUserId,
  useCreateConversationForUserId,
  useGetAvailableLLMs,
};
