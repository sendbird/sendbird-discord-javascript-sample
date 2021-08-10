import './App.css';
import { App as SendBirdApp } from "sendbird-uikit";
import "sendbird-uikit/dist/index.css";

function App() {

  const YOUR_APP_ID = '87FFAEDA-9FEF-429D-9C56-F12EC1234049';
  const USER_ID = '1';
  const theme = 'dark';
  const allow_edit_profile = true;
  
  return (
    <div className="App">
         <SendBirdApp
                appId={YOUR_APP_ID}    
                userId={USER_ID}
                theme={theme}
                allowProfileEdit={allow_edit_profile}       
            />
    </div>
  );
}

export default App;
