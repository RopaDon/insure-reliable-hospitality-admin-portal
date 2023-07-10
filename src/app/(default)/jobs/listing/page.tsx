import JobContent from "./job-content";
import { SelectedItemsProvider } from "@/app/selected-items-context";

export const metadata = {
  title: "Jobs Listing",
  description: "Page description",
};

export default function Jobs() {
  return (
    <SelectedItemsProvider>
      <JobContent />
    </SelectedItemsProvider>
  );
}
