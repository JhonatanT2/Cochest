import React from "react"

export function QuestionLoader() {
    return (
      <div className="">
        <div className="flex items-center justify-between border-gray-100 pb-8 mt-4 p-4 border rounded-lg shadow-md max-w-screen-lg mx-auto bg-white">
          <div className="flex items-center">
            <div className="h-10 w-20 rounded-md bg-gray-100"></div>
          </div>
        </div>
        <div className="w-full my-4 p-4 border rounded-lg shadow-md max-w-screen-lg mx-auto min-h-96 bg-white ">
          <div className="bg-gray-100 h-14 w-full rounded-lg"></div>
          <div className="md:flex justify-between">
            <div className="h-40 md:w-1/4 w-2/5 m-2 bg-gray-100 rounded md:order-last mx-auto"></div>
            <div className="md:w-3/5">
                <div className="h-10 w-full rounded bg-gray-100 my-4 mx-4"></div>
                <div className="h-10 w-full rounded bg-gray-100 my-4 mx-4"></div>
                <div className="h-10 w-full rounded bg-gray-100 my-4 mx-4"></div>
            </div>
            
          </div>
        </div>
        <div className="flex justify-around mx-auto border rounded-lg max-w-screen-lg  h-14 w-full">
            <div className="h-10 w-20 rounded-md bg-gray-100 shadow-md"></div>
            <div className="h-10 w-20 rounded-md bg-gray-100 shadow-md"></div>
        </div>
      </div>
    );
}