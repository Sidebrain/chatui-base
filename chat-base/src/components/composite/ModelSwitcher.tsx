import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useMetaContextStore from "@/hooks/useMetaContextStore";

const ModelSwitcher = () => {
  const { selectedModel, availableModels, updateSelectedModel } =
    useMetaContextStore((state) => ({
      selectedModel: state.selectedModel,
      availableModels: state.availableModels,
      updateSelectedModel: state.updateSelectedModel,
    }));
  if (!availableModels) throw new Error("availableModels is not defined");
  if (!selectedModel) throw new Error("selectedModel is not defined");
  return (
    <Select
      value={selectedModel.model}
      onValueChange={(e) =>
        updateSelectedModel(
          availableModels.find((model) => model.model === e) || selectedModel,
        )
      }
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue defaultValue={selectedModel.model} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>LLMs</SelectLabel>
          {availableModels.map((model) => (
            <SelectItem key={model.id} value={model.model}>
              {model.provider} {model.model}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default ModelSwitcher;
