/* eslint-disable @typescript-eslint/no-explicit-any */
import { socket } from './';
import { User } from '../../types';
import { useStore } from '../store';
import { useNotification } from "@kyvg/vue3-notification";

const store = useStore();
const { notify }  = useNotification();

// export const onServerConnection = () => {
//   socket.on('serverConnection', (message: string) => { 
//     console.log(message) 
//   });
// };

// export const onIsNewUser = () => {
//   socket.on('isNewUser', (isNew: boolean) => {
//     console.log('eeeeoooo', isNew)
//     store.dispatch('switchSignup', isNew);
//     socket.off('isNewUser');
//   });
// };

export const emitConnection = (pubkey: string) => {
  socket.emit('newConnection', pubkey);
  socket.off('newConnection');
  console.log(pubkey);
  socket.off('newConnection');
};

export const emitDisconnection = (pubkey: string) => {
  socket.emit('newDisconnection', pubkey);
  socket.off('newDisonnection');
};

export const searchUsersSocket = (username: string) => {
  socket.emit('searchUsers', username);
  socket.on('searchUsersRes', (res: Array<any>) => {
    if (res.length === 0) {
      store.dispatch('switchUsernameAv', true);
    } else {
      store.dispatch('switchUsernameAv', false);
    }
  });
};

export const createUser = (username: string) => {
  if ( store.state.pubkey ) {
    socket.emit('newUser', store.state.pubkey, username, false);
    socket.on('newUserCreated', (created: boolean) => {
      if (created) {
        notify({
          title: "Congrats! 🎉",
          text: "New user created!",
          type: "success",
        });
        store.dispatch('switchSignup', false);
        store.dispatch('switchUsernameAv', false);
      } else {
        console.log('ERROR: Could not create user. Please try again.');
        notify({
          title: "Error",
          text: "Your account creation failed. Please try again.",
          type: "error",
        });
      }
    });
  } else {
    console.log('ERROR: Could not create user. Connect your wallet first!');
  }
};

export const userInfo = () => {
  socket.on('userInfo', (userInfo: Array<User>) => {
    console.log('userInfo', userInfo);
    const username = userInfo[0]._username_;
    store.dispatch('dispatchUsername', username);
    socket.off('userInfo');
  });
};