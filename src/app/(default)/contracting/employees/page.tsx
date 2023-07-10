import EmployeeContent from "./employee-content";
import { SelectedItemsProvider } from "@/app/selected-items-context";

export const metadata = {
  title: "Employees",
  description: "Page description",
};

export default function Employees() {
  return (
    <SelectedItemsProvider>
      <EmployeeContent />
    </SelectedItemsProvider>
  );
}
