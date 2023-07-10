"use client";

import { useState } from "react";
import WaitlistForm from "./waitlist-form";
import { FormState } from "@/config/enums/enums";
import ModalBasic from "@/components/modal-basic";
import { QueryActionCreatorResult } from "@reduxjs/toolkit/dist/query/core/buildInitiate";

type Props = {
  refetch(): QueryActionCreatorResult<any>;
};

export default function AddClientButton(props: Props) {
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
        onClick={() => {
          handleModalOpen(true);
        }}
        className="btn bg-indigo-500 hover:bg-indigo-600 text-white"
      >
        <svg className="w-4 h-4 fill-current opacity-50 shrink-0" viewBox="0 0 16 16">
          <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
        </svg>
        <span className="hidden xs:block ml-2">Add User</span>
      </button>

      <ModalBasic width="3/4" isOpen={modalOpen} setIsOpen={handleModalOpen} title="Add Waitlist User">
        <WaitlistForm state={FormState.Creation} handleClose={handleClose} refetch={props.refetch} />
      </ModalBasic>
    </div>
  );
}
