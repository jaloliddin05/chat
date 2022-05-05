const chatForm = document.getElementById("chat-form");
const chatMsg = document.querySelector(".chat-messages");
const chatMsgs = document.querySelector(".message");

//  GET user name:
const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
});

const socket = io();

socket.emit("joinRoom", { username, room });

// Message from server:
socket.on("message", (Message) => {
  console.log(Message);
  outputMessage(Message);
});

// Message submit:
chatForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const msg = e.target.elements.msg.value;
  socket.emit("chatMessage", msg);
  e.target.elements.msg.value = null;
  e.target.elements.msg.focus();
});

// Output message to DOM:
function outputMessage(msg) {
  const { time, text, username } = msg;
  const div = document.createElement("div");
  div.classList.add("message");
  div.innerHTML = `<p class="meta"> ${username} <span>${time}</span></p>
    <p class="text">
     ${text}
    </p>
  </div>`;
  document.querySelector(".chat-messages").appendChild(div);

  //   Animation:
  div.animate(
    [
      { opacity: "0" },
      { transform: "translateX(-150px)" },
      { opacity: "0" },
      { transform: "translateX(0px)" },
    ],
    {
      duration: 450,
    }
  );
  //   Scroll Down:
  let elScroll = chatMsg.scrollHeight;
  chatMsg.scrollTo(0, elScroll);
}
