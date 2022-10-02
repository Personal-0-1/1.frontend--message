const enableChatSection  = () => {
    document.querySelector("#app").classList.add("is-message");
}

const disableChatSection = () => {
    document.querySelector("#app").classList.remove("is-message");

};

export {
    enableChatSection,
    disableChatSection
}