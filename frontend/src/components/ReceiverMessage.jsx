import React from "react";
import { Avatar } from "./index.js";

function ReceiverMessage() {
  return (
    <div className="w-full min-h-fit">
      <div className="w-fit h-fit flex gap-3 items-end group">
        <Avatar />
        <div className="bg-blue-500 p-2 rounded-md">
          <p className="text-white content-center max-w-[400px]">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ratione
            tempora dicta optio iste cumque repellendus distinctio ullam ea
            consequuntur laudantium eos, animi ipsum mollitia ipsa quia rerum,
            saepe, maiores tempore. Maxime porro, voluptatem mollitia a
            quibusdam atque eius veritatis vero asperiores, aperiam possimus
            nesciunt quis
          </p>
          <p className="text-sm text-gray-800 float-left mt-1">1 days ago</p>
        </div>
        <i class="fa-solid fa-ellipsis-vertical invisible group-hover:visible cursor-pointer"></i>
      </div>
    </div>
  );
}

export default ReceiverMessage;
