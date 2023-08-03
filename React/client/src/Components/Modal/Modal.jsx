import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import defaultImage from "@/assets/IMG/No_IMG.png";
import { IoMdClose } from "react-icons/io";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "./modalStyled.css";

import { FaRegCommentDots } from "react-icons/fa";

function Modal({ movie, showModal, setShowModal }) {
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState([]);

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
      getComments();
      console.log(response);
    } else {
      toast.error("Error adding comment");
    }
  }

  async function getComments() {
    const response = await fetch(`${host}/comment/${movie.id}`);
    const data = await response.json();
    setComments(data.comments);
  }

  useEffect(() => {
    getComments();
  }, []);

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
              className="text-lg font-bold leading-6 text-gray-900 w-[80%]"
            >
              {movie.title}
            </Dialog.Title>
            <Dialog.Description as="div" className="mt-2 text-base text-black">
              {movie.overview}
            </Dialog.Description>
            <Dialog.Description as="div" className="mt-2 text-base text-black">
              <span className="font-semibold"> Release Date:</span>{" "}
              {movie.release_date}
            </Dialog.Description>
            <Dialog.Description as="div" className="mt-2 text-base text-black">
              <span className="font-semibold">Rating:</span>{" "}
              {movie.vote_average}
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
                className="  px-4 py-2  text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                onClick={() => setShowModal(false)}
              >
                <IoMdClose className="text-2xl" />
              </button>
            </div>

            {comments.length > 0 && (
              <div className=" p-5 border border-gray-400 rounded-md max-h-72 overflow-auto mt-2">
                {comments.map((comment) => {
                  // Convert the timestamp to a Date object
                  const date = new Date(comment.timestamp);
                  // Format the date and time
                  const formattedDate = `${date.getDate()}-${
                    date.getMonth() + 1
                  }-${date.getFullYear()} `;

                  return (
                    <React.Fragment key={comment.timestamp}>
                      <div className="scrol flex flex-col justify-between text-black bg-white border-2 border-gray-400 mb-5 p-3 rounded-md ">
                        <div className="flex gap-2 text-xs font-medium justify-between">
                          <div className="flex gap-2">
                            <p>{comment.userId.firstName}</p>
                            <p>{comment.userId.lastName}</p>
                          </div>
                          <p>{formattedDate}</p>
                        </div>
                        <p className="text-lg font">{comment.text}</p>
                      </div>
                    </React.Fragment>
                  );
                })}
              </div>
            )}

            <form
              className="w-full flex justify-end mt-4 gap-2"
              onSubmit={handleSubmit}
            >
              <textarea
                type="text"
                className="resize-none py-3 px-4 block w-full border-gray-200 rounded-md text-lg focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-300 dark:border-gray-700 dark:text-black placeholder:text-black"
                placeholder="Add a comment"
                value={newComment}
                onChange={(event) => setNewComment(event.target.value)}
                required
                draggable="false"
              />
              <button
                className="px-4 py-2 text-lg text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                type="submit"
              >
                Submit
              </button>
            </form>
          </Dialog.Panel>
        </div>
      </Dialog>
    </Transition>
  );
}

export default Modal;
