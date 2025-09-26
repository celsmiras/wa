function showChat(theMessage, theSender) {
    WA.chat.sendChatMessage(theMessage, theSender);
}
function openURL(url, classroom) {
    const triggerMessage = WA.ui.displayActionMessage({
        message: "[SPACE] to enter " + classroom ,
        callback: () => {
            WA.nav.openTab(url);
        }
    });
    WA.player.state.classroom = triggerMessage;
    //setTimeout(() => {
    //    // later
    //    triggerMessage.remove();
    //}, 1500)
}
const gh1EnterSubscriber = WA.mapEditor.area.onEnter("github_classroom1").subscribe(() => {
    openURL("https://classroom.github.com/classrooms/232179227-hiraya-learning-classroom-2a69eb", "Github Classroom");
});
