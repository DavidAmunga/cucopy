import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { Textarea } from "../ui/textarea";
import { Client } from "@notionhq/client";
import { toast } from "react-hot-toast";
interface Props {
  open: boolean;
  handleClose: () => void;
}

const FeedbackDialog = ({ open, handleClose }: Props) => {
  const [input, setInput] = useState("");
  const [category, setCategory] = useState("Feedback");

  const [loading, setLoading] = useState(false);

  const sendFeedback = async () => {
    if (input) {
      setLoading(true);
      const loadingToast = toast.loading("Sending feedback...");
      try {
        const response = await fetch("/api/feedback", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ feedback: input, category: category }),
        });
        setLoading(false);

        toast.dismiss();
        const data = await response.json();
        handleClose();

        if (response.ok) {
          // Dismiss the loading toast and show a success toast
          toast.dismiss(loadingToast);

          let text = `Thanks for sharing your ${category} !`;
          if (category === "Bug") {
            text = `We'll sort that out as soon as we can. Thanks for sharing !`;
          }
          toast.success(text);
        } else {
          // Dismiss the loading toast and show an error toast
          toast.dismiss(loadingToast);
          toast.error(data.error || "Failed to send feedback");
        }
      } catch (e) {
        setLoading(false);
        handleClose();
        // Dismiss the loading toast and show an error toast
        toast.dismiss(loadingToast);
        toast.error("An error occurred while sending feedback");
      }
    } else {
      setLoading(false);

      handleClose();
      // Show a warning toast if the input is empty
      toast.error("Please enter your feedback before sending");
    }
  };
  return (
    <>
      <Transition appear show={open} as={Fragment}>
        <Dialog as="div" className="relative z-40" onClose={handleClose}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Share Feedback
                  </Dialog.Title>
                  <div className="mt-2">
                    <div className="my-4">
                      <label className="block text-sm font-medium text-gray-700">
                        {category === "Idea" && " I have an..."}
                        {category === "Feedback" && " I have some..."}
                        {category === "Bug" && " I want to report a..."}
                      </label>
                      <div className="grid grid-cols-1 md:grid-cols-3 mt-2">
                        <label className="inline-flex items-center">
                          <input
                            type="radio"
                            name="category"
                            value="Idea"
                            checked={category === "Idea"}
                            onChange={(e) => setCategory(e.target.value)}
                            className="form-radio"
                          />
                          <span className="ml-2">Idea 💡</span>
                        </label>
                        <label className="inline-flex items-center">
                          <input
                            type="radio"
                            name="category"
                            value="Feedback"
                            checked={category === "Feedback"}
                            onChange={(e) => setCategory(e.target.value)}
                            className="form-radio"
                          />
                          <span className="ml-2">Feedback</span>
                        </label>

                        <label className="inline-flex items-center">
                          <input
                            type="radio"
                            name="category"
                            value="Bug"
                            checked={category === "Bug"}
                            onChange={(e) => setCategory(e.target.value)}
                            className="form-radio"
                          />
                          <span className="ml-2">Bug</span>
                        </label>
                      </div>
                    </div>
                    <Textarea
                      value={input}
                      onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                        setInput(e.target.value);
                      }}
                      className="bg-gray-100 focus-visible:ring-gray-800 focus-visible:border-gray-800"
                      rows={4}
                      placeholder="Write here anything you want to add/change in calckenya !"
                    />
                    <small className="mb-2 text-xs mt-1">
                      Nothing is too small to share. Write anything. We&apos;ll
                      probably add/change it sooner than you think :)
                    </small>
                  </div>

                  <div className="flex justify-end space-x-2 mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-gray-100 px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2"
                      onClick={() => {
                        handleClose();
                      }}
                    >
                      Close
                    </button>
                    <button
                      type="button"
                      disabled={input.length === 0 || loading}
                      className="disabled:opacity-50 inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={() => {
                        sendFeedback();
                      }}
                    >
                      Send
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default FeedbackDialog;
