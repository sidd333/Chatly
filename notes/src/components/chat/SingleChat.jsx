import React, { useEffect, useState } from "react";
import { ChatState } from "../../context/ChatProvider";
import { Input, Button } from "@material-tailwind/react";
import ScrollableChat from "./ScrollableChat";
import io from "socket.io-client";

const ENDPOINT = "http://localhost:4000";
let socket, selectedChatCompare;

const SingleChat = () => {
  const { user, selectedChat, setSelectedChat, fetchAgain, setFetchAgain } =
    ChatState();

  const [loggedInUser, setLoggedInUser] = useState(
    JSON.parse(localStorage.getItem("userInfo"))
  );
  const [socketConnected, setSocketConnedted] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const onChange = ({ target }) => {
    setNewMessage(target.value);

    socket.emit("typing", selectedChat._id);
  };

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", loggedInUser);

    socket.on("connection", () => {
      setSocketConnedted(true);
    });
  }, []);

  const fetchMessages = async () => {
    if (!selectedChat) return;

    try {
      const response = await fetch(
        `http://localhost:4000/api/message/${selectedChat._id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "auth-token": `${localStorage.getItem("token")}`,
          },
        }
      );

      const data = await response.json();
      setMessages(data);

      socket.emit("join chat", selectedChat._id);
    } catch (error) {
      console.log(error.stack);
    }
  };

  const sendMessage = async (e) => {
    if ((e.key === "Enter" || e.target.name === "send") && newMessage) {
      try {
        const response = await fetch(`http://localhost:4000/api/message`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": `${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            content: newMessage,
            chatId: selectedChat._id,
          }),
        });

        const data = await response.json();
        socket.emit("new message", data);
        setMessages([...messages, data]);

        setNewMessage("");
      } catch (error) {}
    }
  };

  useEffect(() => {
    fetchMessages();

    selectedChatCompare = selectedChat;
  }, [selectedChat]);

  useEffect(() => {
    socket.on("message received", (newMessageReceived) => {
      if (
        !selectedChatCompare ||
        selectedChatCompare._id !== newMessageReceived.chat._id
      ) {
        //give notification
      } else {
        setMessages([...messages, newMessageReceived]);
      }
    });

    // socket.on("typing",()=>console.log("typing"))
  });

  return (
    <>
      {!selectedChat ? (
        <div className="  w-full flex items-center justify-center   text-gray-800 text-4xl">
          Click on user to start chatting
        </div>
      ) : (
        <>
          <div className="mt-10  h-[88vh] w-full mr-10">
            <div
              className="h-[77vh]
            "
            >
              <ScrollableChat messages={messages} />
            </div>
            <div className="absolute bottom-20 w-full">
              <div className=" flex w-3/4 mx-auto">
                <Input
                  type="newMessage"
                  label="newMessage Address"
                  value={newMessage}
                  onChange={onChange}
                  className=""
                  onKeyDown={sendMessage}
                  containerProps={{
                    className: "",
                  }}
                />
                <Button
                  size="sm"
                  color={newMessage ? "gray" : "blue-gray"}
                  disabled={!newMessage}
                  className="rounded"
                  onClick={sendMessage}
                  name="send"
                >
                  Invite
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default SingleChat;
