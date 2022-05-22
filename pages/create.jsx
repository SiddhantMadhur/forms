import React from "react";

function CreateForm() {
  return (
    <div className="flex justify-center max-w-[1200px] text-left ">
      <div className="my-5">
        <div id="survey_title" className="text-3xl">
          <input
            className="bg-transparent border-b-2 px-2 py-1  "
            placeholder="Title of your form..."
          />
        </div>
      </div>
    </div>
  );
}

export default CreateForm;
