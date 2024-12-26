import React from "react";
import { Avatar } from "./index.js";
import { ForgetPasswordImage } from "../assets/index.js";

function SenderMessage() {
  return (
    <div className="w-full min-h-fit">
      <div className="w-fit h-fit py-4 px-1 flex flex-row-reverse gap-3 items-end float-right group">
        <Avatar />
        <div className="bg-slate-200 p-2 rounded-md">
          <img src={ForgetPasswordImage} className="bg-white w-32 mb-1" />
          {/* <p className=" text-black content-center max-w-[400px]">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Asperiores
            natus vel, consequuntur ratione similique aperiam expedita,
            explicabo ut veritatis hic laboriosam. Ullam libero cum iste
            eveniet. Odit modi corrupti facilis. Quo eveniet ratione voluptate
            obcaecati similique modi, soluta nulla ipsum mollitia enim commodi
            fugit, voluptas non laborum ab sunt
          </p> */}
          <p className=" float-end text-sm text-gray-500 mt-1">1 days ago</p>
        </div>
        <i class="fa-solid fa-ellipsis-vertical invisible group-hover:visible cursor-pointer"></i>
      </div>
    </div>
  );
}

export default SenderMessage;
