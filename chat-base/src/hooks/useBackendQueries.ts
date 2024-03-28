import backend, {
  AddMessagetoConversationType,
} from "@/services/backendService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AuthorizedConversationRequest } from "./useMessageStore";

const useGetMessagesFromConversation = ({
  convId,
  userId,
}: AuthorizedConversationRequest) => {
  return useQuery({
    queryKey: ["getAllMessagesFromConversation", { convId, userId }],
    queryFn: async () =>
      await backend.getAllMessagesOfConversation({ convId, userId }),
  });
};

const useGetResponseOfConversation = ({
  convId,
  userId,
}: AuthorizedConversationRequest) => {
  const queryClient = useQueryClient();
  return useMutation({
    // mutationKey: ["getResponseOfConversation", { convId, userId }],
    mutationFn: async () =>
      await backend.getResponseOfConversation({ convId, userId }),
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
    // onSuccess: () =>
    //   queryClient.invalidateQueries({
    //     queryKey: ["getAllMessagesFromConversation"],
    //   }),
  });
};

const useGetConversationsByUserId = (userId: number) => {
  return useQuery({
    queryKey: ["getConversationsByUserId", userId],
    queryFn: async () => await backend.getAllConversationsByUserId(userId),
  });
};

export {
  useGetMessagesFromConversation,
  useGetResponseOfConversation,
  useAddMessageToConversation,
  useGetConversationsByUserId,
};
