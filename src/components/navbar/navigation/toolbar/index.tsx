import ToolbarSwitch from "./switch";
import ToolbarFilters from "./filters";

export default function Toolbar() {
  return (
    <div className="flex w-fit items-center gap-x-5 mb-1">
      <ToolbarFilters />
      <ToolbarSwitch />
    </div>
  );
}
