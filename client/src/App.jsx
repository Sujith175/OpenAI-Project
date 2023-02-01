import { useState } from "react";
import { fetchResponse } from "./api";
import ChatBody from "./components/ChatBody";
import ChatInput from "./components/ChatInput";
import { useMutation } from "react-query";

function App() {
  const [chat, setChat] = useState([]);

  const mutation = useMutation({
    mutationFn: () => {
      return fetchResponse(chat);
    },
    onSuccess: (data) =>
      setChat((prev) => [
        ...prev,
        { sender: "ai", message: data.message.replace(/^\n\n/, "") },
      ]),
  });

  const sendMessage = async (message) => {
    await Promise.resolve(setChat((prev) => [...prev, message]));
    mutation.mutate();
  };
  return (
    <div className="bg-[#1A232E] h-screen py-6 relative sm:px-16 px-12 text-white overflow-hidden flex flex-col justify-between align-middle ">
      {/* gradients */}
      <div className="gradient-01 z-0 absolute "></div>
      <div className="gradient-02 z-0 absolute "></div>
      {/* header */}
      <div className="uppercase font-bold text-2x1 text-center mb-3">
        Shuri... your AI assistant<br></br>
        <span className="normal-case text-teal-700">
          Project Based on Open AI Data Model
        </span>
      </div>
      {/* body */}
      <div className="h-[90%] overflow-auto w-full max-w-4xl min-w-[20rem] py-8 px-4 self-center scrollbar-thumb-slate-400 scrollbar-thin scrollbar-track-gray-transparent scrollbar-thumb-border-md">
        <ChatBody chat={chat} />
      </div>
      {/* input */}
      <div className="w-full max-w-4xl min-w-[20rem] self-center">
        <ChatInput sendMessage={sendMessage} loading={mutation.isLoading} />
      </div>
      {/* gradients */}
      <div className="gradient-03 z-0 absolute "></div>
      <div className="gradient-04 z-0 absolute "></div>
    </div>
  );
}

export default App;
