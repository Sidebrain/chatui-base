import backend from "@/services/backendService";
import { LLMType } from "@/types/BackendDatabaseModelTypes";
import { create } from "zustand";

// this is a store to keep track of general app level metadata that is necessary to render the app

export type MetaContextState = {
  selectedModel: LLMType | null;
  availableModels: LLMType[] | null;
  updateSelectedModel: (model: LLMType) => void;
  loadAvailableModels: (models: LLMType[]) => void;
  initializeMetaContextStore: () => void;
};

const useMetaContextStore = create<MetaContextState>()((set) => ({
  selectedModel: null,
  availableModels: null,
  updateSelectedModel: (model: LLMType) => set({ selectedModel: model }),
  loadAvailableModels: (models: LLMType[]) => set({ availableModels: models }),
  initializeMetaContextStore: async () => {
    // fetch the available models from the backend
    // set the default model
    // set the available models
    try {
      const models = await backend.getAvailableLLMModels();
      set({
        availableModels: models,
        selectedModel: models[3],
      });
    } catch (error) {
      const errorMsg = "Failed to fetch available models | No available models";
      console.error(errorMsg);
      throw new Error(errorMsg);
    }
  },
}));

export default useMetaContextStore;
