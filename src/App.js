import React from 'react';
import './App.css';
import MainPage from './components/MainPage'
import {NotificationContainer} from 'react-notifications';
import 'react-notifications/lib/notifications.css';

function App() {
  return (
    <div className="App">
      <NotificationContainer>
      </NotificationContainer>
        <MainPage />
    </div>
    
  );
}

export default App;
