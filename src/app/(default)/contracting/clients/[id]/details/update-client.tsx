"use client";

import { useState } from "react";
import { Client } from "@/config/types";
import ClientForm from "../../client-form";
import { FormState } from "@/config/enums/enums";
import ModalBasic from "@/components/modal-basic";
import { QueryActionCreatorResult } from "@reduxjs/toolkit/dist/query/core/buildInitiate";

type Props = {
  client: Client;
  refetch(): QueryActionCreatorResult<any>;
};

export default function UpdateClientButton(props: Props) {
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const handleModalOpen = (value: boolean) => {
    setModalOpen(value);
  };

  const handleClose = () => {
    setModalOpen(false);
  };

  return (
    <div>
      <button
        className="btn bg-indigo-500 hover:bg-indigo-600 text-white"
        onClick={() => {
          handleModalOpen(true);
        }}
      >
        <svg className="w-4 h-4 fill-current opacity-50 shrink-0" viewBox="0 0 16 16">
          <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
        </svg>
        <span className="hidden xs:block ml-2">Update Client</span>
      </button>

      <ModalBasic width="3/4" isOpen={modalOpen} setIsOpen={handleModalOpen} title="Update Client">
        <ClientForm client={props.client} state={FormState.Update} handleClose={handleClose} refetch={props.refetch} />
      </ModalBasic>
    </div>
  );
}
