import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import defaultImage from "@/assets/IMG/No_IMG.png";
import { IoMdClose } from "react-icons/io";
import { useState } from "react";
import { toast } from "react-toastify";

import { FaRegCommentDots } from "react-icons/fa";

function Modal({ movie, showModal, setShowModal }) {
  const [showComment, setShowComment] = useState(false);
  const [newComment, setNewComment] = useState("");

  const host = import.meta.env.VITE_HOST;
  const url = `${host}/comment/post`;
  const token = localStorage.getItem("user");

  async function handleSubmit(event) {
    event.preventDefault();

    // replace with your backend URL and route
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: newComment,
        movieId: movie.id,
        token: token,
      }),
    });

    if (response.ok) {
      setNewComment("");
      toast.success("Comment added");
      console.log(response);
    } else {
      toast.error("Error adding comment");
    }
  }

  return (
    <Transition
      show={showModal}
      enter="transition-all duration-150 ease-out"
      enterFrom="opacity-0 scale-95"
      enterTo="opacity-100 scale-100"
      leave="transition-all duration-150 ease-in"
      leaveFrom="opacity-100 scale-100"
      leaveTo="opacity-0 scale-95"
      as={Fragment}
    >
      <Dialog
        as="div"
        className="fixed inset-0 z-[1000] overflow-y-auto"
        open={showModal}
        onClose={setShowModal}
      >
        <div className="flex  z-50 items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
          <Dialog.Overlay className="fixed inset-0 transition-opacity bg-black bg-opacity-75" />

          <span className="hidden sm:inline-block sm:align-middle sm:h-screen">
            &#8203;
          </span>

          <Dialog.Panel className="inline-block px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
            <Dialog.Title
              as="h3"
              className="text-lg font-medium leading-6 text-gray-900"
            >
              {movie.title}
            </Dialog.Title>
            <Dialog.Description as="div" className="mt-2 text-sm text-gray-500">
              {movie.overview}
            </Dialog.Description>
            <Dialog.Description as="div" className="mt-2 text-sm text-gray-500">
              {movie.release_date}
            </Dialog.Description>

            <img
              className="w-full h-64 mt-4 rounded-md object-cover"
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/original/${movie.poster_path}`
                  : defaultImage
              }
              alt={movie.Title}
            />

            <div className="mt-4 absolute top-0 right-5">
              <button
                type="button"
                className=" justify-center  px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                onClick={() => setShowModal(false)}
              >
                <IoMdClose className="text-2xl" />
              </button>
            </div>

            <button className="w-full flex justify-end mt-4 pr-4">
              <FaRegCommentDots
                className="text-3xl text-black"
                onClick={() => setShowComment(!showComment)}
              />
            </button>

            {showComment && (
              <form
                className="w-full flex justify-end mt-4 pr-4"
                onSubmit={handleSubmit}
              >
                <input
                  type="text"
                  className="w-full bg-inherit border-2 border-black text-black"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                />
                <button className="text-black" type="submit">Submit</button>
              </form>
            )}
          </Dialog.Panel>
        </div>
      </Dialog>
    </Transition>
  );
}

export default Modal;
