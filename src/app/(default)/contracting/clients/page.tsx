import ClientContent from "./client-content";
import { SelectedItemsProvider } from "@/app/selected-items-context";

export const metadata = {
  title: "Clients",
  description: "Page description",
};

export default function Businesses() {
  return (
    <SelectedItemsProvider>
      <ClientContent />
    </SelectedItemsProvider>
  );
}
