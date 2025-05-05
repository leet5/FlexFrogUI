import 'bootstrap/dist/css/bootstrap.min.css';
import ReactDOM from 'react-dom/client';
import App from './App';
import {TelegramWindow} from "./types/types.ts";

const root = ReactDOM.createRoot(document.getElementById('root')!);

window.Telegram = {
    WebApp: {
        ready: () => console.log("Telegram WebApp ready (mocked)"),
        initDataUnsafe: {
            user: {
                id: 71475719,
                username: 'baltimor',
                first_name: 'Test',
                last_name: 'User'
            }
        }
    }
} as TelegramWindow;

root.render(<App/>);