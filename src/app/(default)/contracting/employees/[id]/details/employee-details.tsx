import Image from "next/image";

import { Client, Employee } from "@/config/types";

import UpdateClientButton from "./update-employee";

import BlankAvatar from "@/assets/images/blank_avatar.webp";

import { QueryActionCreatorResult } from "@reduxjs/toolkit/dist/query/core/buildInitiate";

type Props = {
  employee: Employee;
  refetch(): QueryActionCreatorResult<any>;
};

export default function EmployeeDetails({ employee, refetch }: Props) {
  return (
    <div>
      <section>
        <div className="max-w-[700px]">
          <div className="pt-8 pb-10">
            <Image className="rounded-full mb-5" src={employee.displayPhoto ?? BlankAvatar} width={56} height={56} priority alt="Me" />
            <h1 className="h1 font-aspekta mb-5">{employee.firstName}</h1>
            <p className="text-lg text-slate-500 dark:text-slate-400">{employee.dateOfBirth}</p>
          </div>
        </div>
      </section>

      <div className="flex justify-start mb-5">
        <UpdateClientButton employee={employee} refetch={refetch} />
      </div>

      <div className="grow md:flex space-y-8 md:space-y-0 md:space-x-8 pb-16 md:pb-20">
        {/* Middle area */}
        <div className="grow">
          <div className="max-w-[700px]">
            <div className="space-y-10">
              <section>
                <ul className="flex flex-wrap text-sm border-b border-slate-100 dark:border-slate-800">
                  <li className="px-3 -mb-px">
                    <a className="block py-3 font-medium text-slate-800 dark:text-slate-100 border-b-2 border-sky-500" href="#0">
                      Information
                    </a>
                  </li>
                  <li className="px-3 -mb-px">
                    <a className="block py-3 text-slate-500 hover:text-slate-600 dark:text-slate-400 dark:hover:text-slate-300" href="#0">
                      Employees
                    </a>
                  </li>
                </ul>
              </section>

              {/* <Talks />
              <Projects /> */}
            </div>
          </div>
        </div>

        {/* Right sidebar */}
        <aside className="md:w-[240px] lg:w-[300px] shrink-0 border-r border-slate-200 dark:border-slate-800 md:h-[240px] lg:h-[500px]">
          <div className="space-y-6">
            <div />
            <div />
            <div />
          </div>
        </aside>
      </div>
    </div>
  );
}
