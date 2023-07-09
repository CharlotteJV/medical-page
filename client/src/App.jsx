import React, { useState } from 'react';
import { StreamChat } from 'stream-chat';
import { Chat } from 'stream-chat-react';
import Cookies from 'universal-cookie';
import { ChannelContainer, ChannelListContainer, Auth } from './Components';
import 'stream-chat-react/dist/css/index.css';
import './App.css';

const cookies = new Cookies();

const apiKey = "6umgksw8rcky";

const client = StreamChat.getInstance(apiKey);

const authToken = cookies.get("token");

if (authToken) {
  client.connectUser({
    id: cookies.get('userId'),
    name: cookies.get('username'),
    fullName: cookies.get('fullName'),
    phoneNumber: cookies.get('phoneNumber'),
    avatarURL: cookies.get('avatarURL'),
    hashedPassword: cookies.get('hashedPassword'),
  }, authToken)
}

const App = () => {

  const [createType, setCreateType] = useState('');
  const [isCreating, setIsCreating] = useState('');
  const [isEditing, setIsEditing] = useState('');


  if (!authToken) return <Auth />

  return (
    <div className='app__wrapper'>
      <Chat client={client} theme='team light'>

        <ChannelListContainer
          isCreating={isCreating}
          setIsCreating={setIsCreating}
          setCreateType={setCreateType}
          setIsEditing={setIsEditing}
        />

        <ChannelContainer
          isCreating={isCreating}
          setIsCreating={setIsCreating}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          createType={createType}
        />
        
      </Chat>
    </div>
  )
}

export default App;
