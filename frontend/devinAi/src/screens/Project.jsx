import React, { useEffect, useState, useContext, createRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "../config.js/axios";
import {
  intializeSocket,
  recieveMessage,
  sendMessage,
} from "../config.js/socket.js";
import { userContext } from "../context/user.context.jsx";
import MarkDown from "markdown-to-jsx";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { darcula } from "react-syntax-highlighter/dist/esm/styles/prism";
import {getWebContainer} from '../config.js/WebContainer.js'
function Project() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidePanel, setIsSidePanel] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState([]);
  const [users, setUsers] = useState([]);
  const [project, setProject] = useState(location.state.project);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [fileTree, setfileTree] = useState({});
  const [currentFile, setCurrentFile] = useState(null);
  const [openFiles, setopenFiles] = useState([]);
  const [WebContainer , setWebContainer] = useState(null);
  const [runProcess , setRunProcess] = useState(false);
  const [iframeUrl , setiframeUrl] = useState(null);
  const { user } = useContext(userContext);
  const messageboxRef = createRef();

  useEffect(() => {
    intializeSocket(project._id);
    
    if(!WebContainer){
        getWebContainer().then((container) => {
          setWebContainer(container);
          console.log('container started');
        });
    }

    recieveMessage("project-message", (data) => {
      console.log("recieveMessage", data);
      setMessages((prevMessages) => [...prevMessages, data]);
      const message = JSON.parse(data.message);
      WebContainer?.mount(message.fileTree)
      if (message.fileTree) {
        setfileTree(message.fileTree);
      }
    });

    axios
      .get(`/project/get-project/${location.state.project._id}`)
      .then((res) => {
        setProject(res.data.project);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get("/users/all-users")
      .then((res) => {
        setUsers(res.data.users);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
console.log(runProcess);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const selectUser = (id) => {
    if (selectedUserId.includes(id)) {
      setSelectedUserId(selectedUserId.filter((userId) => userId !== id));
    } else {
      setSelectedUserId([...selectedUserId, id]);
    }
  };

  const addCollaboratorsToProject = () => {
    axios
      .put("project/add-user", {
        projectId: location.state.project._id,
        users: selectedUserId,
      })
      .then((res) => {
        console.log(res.data);
        closeModal();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const send = () => {
    console.log("when click on send ", user);
    const newMessage = { message, sender: user };
    sendMessage("project-message", newMessage);
    appendOutgoingMessage(newMessage);
    setMessage("");
  };

  const writeAiMessage = (msg) => {
    const messageObject = JSON.parse(msg);
    console.log("messageObject writeai", messageObject);

    return (
      <div className="bg-slate-950 text-white overflow-auto rounded-sm p-2">
        <MarkdownWithSyntaxHighlighting>
          {messageObject.text}
        </MarkdownWithSyntaxHighlighting>
      </div>
    );
  };
  console.log(fileTree);

  //   const appendIncomingMessage = (messageObj) => {
  //     console.log("appendIncomingMessageObj", messageObj);
  //     setMessages((prevMessages) => [...prevMessages, messageObj]);
  //   };

  const appendOutgoingMessage = (messageObj) => {
    console.log("appendOutgoingMessageObj", messageObj);
    setMessages((prevMessages) => [...prevMessages, messageObj]);
  };

  const MarkdownWithSyntaxHighlighting = ({ children }) => (
    <MarkDown
      options={{
        overrides: {
          code: {
            component: SyntaxHighlighter,
            props: {
              style: darcula,
            },
          },
        },
      }}
    >
      {children}
    </MarkDown>
  );

  return (
    <main className="h-screen w-screen flex">
      <section className="flex flex-col left h-full min-w-[23rem] bg-slate-300">
        <header className="flex justify-between items-center p-4 w-full bg-slate-100">
          <button className="p-2 px-4 flex gap-2" onClick={openModal}>
            <i className="ri-user-add-line"></i>
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
          <div
            ref={messageboxRef}
            className="messagebox overflow-y-auto max-h-[calc(100vh-7rem)] p-1 flex-grow flex gap-4 flex-col"
          >
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`message max-w-[21rem] flex flex-col p-2 w-fit rounded-md ${
                  msg.sender._id === user._id
                    ? "ml-auto bg-blue-200"
                    : "bg-slate-50"
                }`}
              >
                <small className="opacity-65 text-xs">{msg.sender.email}</small>
                <p className="text-sm">
                  {msg.sender._id === "ai"
                    ? writeAiMessage(msg.message)
                    : msg.message}
                </p>
              </div>
            ))}
          </div>

          <div className="inputBox w-full flex">
            <input
              onChange={(e) => setMessage(e.target.value)}
              className="p-2 flex-grow px-4 border-none outline-none"
              type="text"
              value={message}
              placeholder="Enter Message"
            />
            <button className="px-5" onClick={send}>
              <i className="ri-send-plane-fill"></i>
            </button>
          </div>
        </div>

        <div
          className={`sidePanel flex flex-col gap-2 w-[22rem] h-full bg-red-50 absolute top-0 transition-all duration-300 ease-in-out ${
            isSidePanel ? "left-[-100%]" : "left-0"
          }`}
        >
          <header className="flex items-center justify-between p-4 bg-slate-200">
            <p className="text-lg font-semibold">Collaborator:</p>
            <button
              onClick={() => setIsSidePanel(!isSidePanel)}
              className="p-2 px-4"
            >
              <i className="ri-close-line text-2xl"></i>
            </button>
          </header>
          <div className="userList flex flex-col gap-4 w-80 p-4">
            {project.users.map((user) => (
              <div
                key={user.id}
                className="user p-4 flex items-center gap-4 cursor-pointer rounded-lg transition-all ease-in-out duration-200"
              >
                <div className="profilePic flex w-fit h-fit p-2 px-3 items-center justify-center bg-slate-500 rounded-full text-white">
                  <i className="ri-user-line text-2xl"></i>
                </div>
                <div className="userInfo flex flex-col">
                  <h1 className="font-semibold text-lg text-gray-800">
                    {user.email}
                  </h1>
                  <p className="text-sm text-gray-600">{user.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="right bg-red-200 flex-grow h-full flex ">
        <div className="explorer h-full cursor-pointer min-w-52 max-w-64 bg-slate-700">
          <div className="file-tree w-full cursor-pointer ">
            {Object.keys(fileTree).map((file, index) => (
              <button
                onClick={() => {
                  setCurrentFile(file);
                  setopenFiles([...new Set([...openFiles, file])]);
                }}
                className="tree-element border border-slate-600 cursor-pointer p-2 px-4 flex items-center gap-2 bg-slate-200 w-full "
              >
                <p className=" text-lg font-semibold">{file}</p>
              </button>
            ))}
          </div>
        </div>
        
          <div className="code-editor flex flex-col flex-grow h-full">
            <div className="top flex justify-between">
             <div className="files flex">
              {openFiles.map((file, index) => (
                <button
                  onClick={() => setCurrentFile(file)}
                  className={`p-2 px-4 flex items-center gap-2 bg-slate-200 w-fit border ${
                    currentFile === file ? "bg-slate-400" : ""
                  } `}
                >
                  <p>{file}</p>
                </button>
              ))}
              </div>

              <div className="actions flex gap-2">
                <button
                className="p-2 px-4 text-white bg-slate-800 rounded-md"
                onClick={ async () => {
                 await WebContainer?.mount(fileTree);
                const installProcess = await WebContainer.spawn('npm' ,["install"])
                 installProcess.output.pipeTo(new WritableStream({
                        write(chunk){
                            console.log(chunk.toString())
                        }
                 }))

                 if(runProcess){
                    runProcess.kill();
                 }
                 let tempRunProcess = await WebContainer.spawn('npm' ,["start"])
                 tempRunProcess.output.pipeTo(new WritableStream({
                        write(chunk){
                            console.log(chunk.toString())
                        }
                 }))
                 setRunProcess(tempRunProcess);
                 
                 WebContainer.on('server-ready' , (port , url)=>{
                    console.log(`Server is running at ${port} ${url}`);
                    setiframeUrl(url);
                 })
                   
                }}
                >
                    Run Code
                </button>
              </div>
            </div>
            <div className="bottom h-full overflow-auto flex-grow bg-slate-50">
            {fileTree[currentFile] && (
                <SyntaxHighlighter language="javascript" style={darcula}>
                  {fileTree[currentFile].file.contents}
                </SyntaxHighlighter>
            )}
            </div>
           

          </div>

          {iframeUrl && WebContainer &&(
            <div className="flex min-w-96 flex-col justify-center items-center h-full">
              <div className="address-bar">
                <input
                onChange={(e)=>setiframeUrl(e.target.value)}
                value={iframeUrl}
                className="w-full p-2 px-4 bg-slate-200"
                type="text" name="" id="" />
              </div>
              <iframe
                title="Project Preview"
                className="w-full h-full"
                src={iframeUrl}
            
              />
            </div>
            )}
        
      </section>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-md w-11/12 md:w-1/2 lg:w-1/3">
            <div className="flex p-2 justify-between">
              <h2 className="text-xl mb-4">Select User</h2>
              <p className=" cursor-pointer " onClick={closeModal}>
                <i className="ri-close-line text-2xl"></i>
              </p>
            </div>
            <div className="userList max-h-96 overflow-auto flex flex-col gap-2">
              {users.map((user) => (
                <div
                  key={user.id}
                  className={`user p-2 flex items-center w-full cursor-pointer gap-2 hover:bg-slate-100 ${
                    selectedUserId.indexOf(user._id) !== -1
                      ? "bg-slate-200"
                      : ""
                  }`}
                  onClick={() => selectUser(user._id)}
                >
                  <div className="flex w-fit h-fit p-3 px-4 items-center justify-center aspect-square rounded-full text-white bg-slate-500">
                    <i className="ri-user-line"></i>
                  </div>
                  <h1 className="font-semibold text-lg">{user.email}</h1>
                </div>
              ))}
            </div>
            <div className="flex justify-end mt-4">
              <button
                onClick={addCollaboratorsToProject}
                className="p-2 bg-gray-300 rounded-md"
              >
                Add Collaborators
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default Project;
