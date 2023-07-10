"use client";

import { createContext, useContext, useState } from "react";

interface DocumentDetailContextProps {
  Document: any | null;
  setDocument: (Document: any | null) => void;
}

const DocumentDetailContext = createContext<DocumentDetailContextProps | undefined>(undefined);

export const DocumentDetailProvider = ({ children }: { children: React.ReactNode }) => {
  const [Document, setDocument] = useState<any | null>(null);
  return <DocumentDetailContext.Provider value={{ Document, setDocument }}>{children}</DocumentDetailContext.Provider>;
};

export const useDocumentDetail = () => {
  const context = useContext(DocumentDetailContext);
  if (!context) {
    throw new Error("useDocument must be used within a DocumentProvider");
  }
  return context;
};
