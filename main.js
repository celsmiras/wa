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

// script.js
// Update the array below with the layer names you created in Tiled
const DESK_LAYERS = ['desk_1', 'desk_2']; // <- change / add names as needed

DESK_LAYERS.forEach(layerName => {
  // subscribe to enter events for that layer
  WA.room.onEnterLayer(layerName).subscribe(async () => {
    try {
      const key = `desk_msg:${layerName}`; // unique key per desk
      // load current message (undefined if none)
      const current = await WA.state.loadVariable(key) || '';

      // show current message and give the player the option to edit
      if (current) {
        // if there's already a message, ask whether to edit it
        const edit = confirm(`Message on this desk:\n\n${current}\n\nPress OK to edit, Cancel to just view.`);
        if (edit) {
          const newMsg = prompt('Edit message (leave blank to clear):', current);
          if (newMsg !== null) {
            // save (empty string clears)
            await WA.state.saveVariable(key, newMsg);
            alert('Message saved.');
          }
        } else {
          // just viewing
          alert(`Message:\n\n${current}`);
        }
      } else {
        // no message yet — offer to add one
        const add = confirm('No message on this desk yet. Press OK to add one.');
        if (add) {
          const newMsg = prompt('Type message to leave on this desk:');
          if (newMsg !== null) {
            await WA.state.saveVariable(key, newMsg);
            alert('Message saved.');
          }
        }
      }
    } catch (err) {
      console.error('Desk message error', err);
      alert('Could not load/save desk message. Try again later.');
    }
  });
});
