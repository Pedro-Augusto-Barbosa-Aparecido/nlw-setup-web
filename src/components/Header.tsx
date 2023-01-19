import { Plus } from "phosphor-react";

import logo from "../assets/logo.svg"
import { SummaryTable } from "./SummaryTable";

export function Header() {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="w-full max-w-5xl px-6 flex flex-col gap-16">
        <div className="w-full max-x-3xl mx-auto flex items-center justify-between">
          <img src={logo} alt="" />
          <button
            type="button"
            className="border border-violet-500 font-semibold rounded-lg px-6 py-4  flex items-center gap-3"
          >
            <Plus size={20} className="text-violet-500" />
            Novo Hábito
          </button>
        </div>
        <SummaryTable />
      </div>
    </div>
  )
}