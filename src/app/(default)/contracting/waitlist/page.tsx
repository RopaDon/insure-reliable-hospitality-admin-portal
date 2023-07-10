import WaitlistContent from "./waitlist-content";
import { SelectedItemsProvider } from "@/app/selected-items-context";

export const metadata = {
  title: "Waitlist",
  description: "Page description",
};

export default function Businesses() {
  return (
    <SelectedItemsProvider>
      <WaitlistContent />
    </SelectedItemsProvider>
  );
}
