import StaffContent from "./staff-content";
import { SelectedItemsProvider } from "@/app/selected-items-context";

export const metadata = {
  title: "Staff",
  description: "Page description",
};

export default function Staff() {
  return (
    <SelectedItemsProvider>
      <StaffContent />
    </SelectedItemsProvider>
  );
}
