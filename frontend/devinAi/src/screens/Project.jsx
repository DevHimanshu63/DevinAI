import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
function Project() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidePanel, setIsSidePanel] = useState(false);
  console.log(location.state);

  return (
    <main className="h-screen  w-screen flex">
      <section className="flex flex-col left h-full min-w-80 bg-slate-300">
        <header className="flex justify-between  items-center p-4 w-full bg-slate-100 ">
          <button
            className="p-2 px-4 flex gap-2"
          >
            <i class="ri-user-add-line"></i>
            <p>Add Collaborators</p>
          </button>
          <button
            onClick={() => setIsSidePanel(!isSidePanel)}
            className="p-2 px-4 flex gap-2"
          >
            <i className="ri-group-fill mr-1"></i>
          </button>
        </header>

        <div className="conversationArea flex-grow flex flex-col">
          <div className="messagebox p-1 flex-grow flex gap-4 flex-col">
            <div className="incomingMessage max-w-56 flex flex-col p-2 bg-slate-50 w-fit rounded-md">
              <small className="opacity-65 text-xs">himanshu@molog.in</small>
              <p className="text-sm">hello</p>
            </div>

            <div className="incomingMessage max-w-56 ml-auto flex flex-col p-2 bg-slate-50 w-fit rounded-md">
              <small className="opacity-65 text-xs">himanshu@molog.in</small>
              <p className="text-sm">hello lorem56</p>
            </div>
          </div>
          <div className="inputBox w-full flex">
            <input
              className="p-2 flex-grow px-4 border-none outline-none "
              type="text"
              placeholder="Enter Message"
            />
            <button className="px-5">
              <i class="ri-send-plane-fill"></i>
            </button>
          </div>
        </div>

        <div
          className={`sidePanel flex flex-col gap-2 w-80 h-full bg-red-50 absolute left-[-100%] top-0 transition-all ${
            isSidePanel ? "left-0" : ""
          }`}
        >
          <header className="flex justify-end  p-4 bg-slate-200">
            <button
              onClick={() => setIsSidePanel(!isSidePanel)}
              className="p-2 px-4"
            >
              <i className="ri-close-line text-2xl"></i>
            </button>
          </header>
          <div className="userList flex gap-2 w-full ">
            <div className="user p-2 flex items-center w-full cursor-pointer gap-2 hover:bg-slate-100">
              <div className="flex w-fit h-fit p-3 px-4 items-center justify-center aspect-square rounded-full  text-white bg-slate-500">
                <i class="ri-user-line"></i>
              </div>
              <h1 className="font-semibold text-lg">username</h1>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Project;
