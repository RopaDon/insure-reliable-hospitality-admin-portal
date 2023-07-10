import * as React from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ModalBlank from "@/components/modal-blank";
import AppLoading from "@/components/app-loading";
import DisplayMessages from "@/config/constants/message";
import { useDeleteWaitlistUserMutation } from "@/redux/slices/api/waitlist-slice";
import { QueryActionCreatorResult } from "@reduxjs/toolkit/dist/query/core/buildInitiate";
import ModalBasic from "@/components/modal-basic";
import WaitlistForm from "./waitlist-form";
import { FormState } from "@/config/enums/enums";
import { Waitlist } from "@/config/types";

type Props = {
  user: Waitlist;
  refetch(): QueryActionCreatorResult<any>;
};

export default function WaitlistOptions(props: Props) {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [dangerModalOpen, setDangerModalOpen] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const [deleteWaitlistUserMutation, { isLoading: isDeleteLoading }] = useDeleteWaitlistUserMutation();

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleModalOpen = (value: boolean) => {
    setModalOpen(value);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const deleteWaitlistUser = async () => {
    try {
      const { errors, success } = await deleteWaitlistUserMutation({ id: props.user.id }).unwrap();

      if (!success && errors.length > 0) {
        toast.error(errors[0].message);
        return;
      }

      props.refetch();

      setDangerModalOpen(false);
      toast.success(DisplayMessages.Waitlist.DELETE_WAITLIST);
    } catch (err) {
      toast.error(DisplayMessages.GENERIC_ERROR);
    }
  };

  return (
    <div>
      <div>
        <button onClick={handleClick} className="text-slate-400 hover:text-slate-500 dark:text-slate-500 dark:hover:text-slate-400 rounded-full">
          <span className="sr-only">Menu</span>
          <svg className="w-8 h-8 fill-current" viewBox="0 0 32 32">
            <circle cx="16" cy="16" r="2" />
            <circle cx="10" cy="16" r="2" />
            <circle cx="22" cy="16" r="2" />
          </svg>
        </button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem
            onClick={() => {
              handleClose();
              handleModalOpen(true);
            }}
            style={{ fontSize: 13 }}
            className={`text-xs flex py-1 px-3`}
          >
            Update
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleClose();
              setDangerModalOpen(true);
            }}
            style={{ fontSize: 13, color: "red" }}
            className={`text-xs flex py-1 px-3`}
          >
            Delete
          </MenuItem>
        </Menu>
      </div>
      <ModalBlank isOpen={dangerModalOpen} setIsOpen={setDangerModalOpen}>
        <div className="p-5 flex space-x-4">
          {/* Icon */}
          <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 bg-rose-100 dark:bg-rose-500/30">
            <svg className="w-4 h-4 shrink-0 fill-current text-rose-500" viewBox="0 0 16 16">
              <path d="M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm0 12c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1zm1-3H7V4h2v5z" />
            </svg>
          </div>
          {/* Content */}
          <div>
            {/* Modal header */}
            <div className="mb-2">
              <div className="text-lg font-semibold text-slate-800 dark:text-slate-100">Delete 1 user?</div>
            </div>
            {/* Modal content */}
            <div className="text-sm mb-10">
              <div className="space-y-2">
                <p>Are you sure you want to delete this user?</p>
              </div>
            </div>
            {/* Modal footer */}
            <div className="flex flex-wrap justify-end space-x-2">
              <button
                className="btn-sm border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-slate-600 dark:text-slate-300"
                onClick={() => {
                  setDangerModalOpen(false);
                }}
              >
                Cancel
              </button>
              <button onClick={deleteWaitlistUser} className="btn-sm bg-rose-500 hover:bg-rose-600 text-white">
                {isDeleteLoading ? <AppLoading /> : <span> Yes, Delete it</span>}
              </button>
            </div>
          </div>
        </div>
      </ModalBlank>
      <ModalBasic width="3/4" isOpen={modalOpen} setIsOpen={handleModalClose} title="Update Waitlist User">
        <WaitlistForm waitlist={props.user} state={FormState.Update} handleClose={handleClose} refetch={props.refetch} />
      </ModalBasic>
    </div>
  );
}
