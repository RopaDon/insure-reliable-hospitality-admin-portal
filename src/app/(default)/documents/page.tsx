export const metadata = {
  title: "Documents",
  description: "Page description",
};

import DocumentsContent from "./document-content";
import { FlyoutProvider } from "@/app/flyout-context";
import { DocumentDetailProvider } from "./document-context";
import { SelectedItemsProvider } from "@/app/selected-items-context";

export default function Orders() {
  return (
    <SelectedItemsProvider>
      <FlyoutProvider>
        <DocumentDetailProvider>
          <DocumentsContent />
        </DocumentDetailProvider>
      </FlyoutProvider>
    </SelectedItemsProvider>
  );
}
