const enableChatSection  = () => {
    document.querySelector("#app").classList.add("is-message");

    document.querySelector('.chat-list').scrollTop = document.querySelector('.chat-list').scrollHeight;
}

const disableChatSection = () => {
    document.querySelector("#app").classList.remove("is-message");
};

export {
    enableChatSection,
    disableChatSection
}