import * as React from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ModalBlank from "@/components/modal-blank";
import AppLoading from "@/components/app-loading";
import DisplayMessages from "@/config/constants/message";
import ClientStatusSelect from "@/components/dropdowns/client-status-select";
import { QueryActionCreatorResult } from "@reduxjs/toolkit/dist/query/core/buildInitiate";
import { useDeleteClientMutation, useUpdateStatusMutation } from "@/redux/slices/api/client-slice";

type Props = {
  clientId: string | number;
  refetch(): QueryActionCreatorResult<any>;
};

export default function ClientOptions(props: Props) {
  const [statusId, setStatusId] = useState<number | string | null>(null);
  const [statusModelOpen, setStatusModalOpen] = useState<boolean>(false);
  const [dangerModalOpen, setDangerModalOpen] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const [deleteClientMutation, { isLoading: isDeleteLoading }] = useDeleteClientMutation();
  const [updateStatusMutation, { isLoading: isUpdateLoading }] = useUpdateStatusMutation();

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const deleteClient = async () => {
    try {
      const { errors, success } = await deleteClientMutation({ id: props.clientId }).unwrap();

      if (!success && errors.length > 0) {
        toast.error(errors[0].message);
        return;
      }

      props.refetch();

      setDangerModalOpen(false);
      toast.success(DisplayMessages.Client.DELETE_CLIENT);
    } catch (err) {
      toast.error(DisplayMessages.GENERIC_ERROR);
    }
  };

  const updateStatus = async () => {
    try {
      const { errors, success } = await updateStatusMutation({ statusId, clientId: props.clientId }).unwrap();

      if (!success && errors.length > 0) {
        toast.error(errors[0].message);
        return;
      }

      props.refetch();

      setStatusModalOpen(false);
      toast.success(DisplayMessages.Client.UPDATE_STATUS);
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
              setDangerModalOpen(true);
            }}
            style={{ fontSize: 13, color: "red" }}
            className={`text-xs flex py-1 px-3`}
          >
            Delete
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleClose();
              setStatusModalOpen(true);
            }}
            style={{ fontSize: 13 }}
            className={`text-xs flex py-1 px-3`}
          >
            Update Status
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
              <div className="text-lg font-semibold text-slate-800 dark:text-slate-100">Delete 1 client?</div>
            </div>
            {/* Modal content */}
            <div className="text-sm mb-10">
              <div className="space-y-2">
                <p>Are you sure you want to delete this client?</p>
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
              <button onClick={deleteClient} className="btn-sm bg-rose-500 hover:bg-rose-600 text-white">
                {isDeleteLoading ? <AppLoading /> : <span> Yes, Delete it</span>}
              </button>
            </div>
          </div>
        </div>
      </ModalBlank>

      <ModalBlank isOpen={statusModelOpen} setIsOpen={setStatusModalOpen}>
        <div className="p-5 flex space-x-4">
          {/* Icon */}
          <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 bg-indigo-100 dark:bg-indigo-500/30">
            <svg className="w-4 h-4 shrink-0 fill-current text-indigo-500" viewBox="0 0 16 16">
              <path d="M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm1 12H7V7h2v5zM8 6c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1z" />
            </svg>
          </div>
          {/* Content */}
          <div className="w-full">
            {/* Modal header */}
            <div className="mb-2">
              <div className="text-lg font-semibold text-slate-800 dark:text-slate-100">Update Status</div>
            </div>
            {/* Modal content */}
            <div className="text-sm mb-10">
              <div className="space-y-2"></div>
            </div>

            <div className="w-full md:flex sm:items-center space-y-4 md:space-y-0 md:space-x-4 mt-2 mb-8">
              <div className="w-full">
                <label className="block text-sm font-medium mb-1" htmlFor="business-id">
                  Status<span className="text-rose-500">*</span>
                </label>
                <ClientStatusSelect onSelect={(option) => setStatusId(option.id)} />
              </div>
            </div>
            {/* Modal footer */}
            <div className="flex flex-wrap justify-end space-x-2">
              <button
                className="btn-sm border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-slate-600 dark:text-slate-300"
                onClick={() => {
                  setStatusModalOpen(false);
                }}
              >
                Cancel
              </button>
              <button onClick={updateStatus} className="btn-sm bg-indigo-500 hover:bg-indigo-600 text-white">
                {isUpdateLoading ? <AppLoading /> : <span> Update</span>}
              </button>
            </div>
          </div>
        </div>
      </ModalBlank>
    </div>
  );
}
