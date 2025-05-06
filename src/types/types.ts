export interface ImageCardType {
    user_thumbnail: string;    // Base64 encoded []byte
    image_thumbnail: string;   // Base64 encoded []byte
    chat_thumbnail: string;    // Base64 encoded []byte
    message_id: number;        // int64
    user_name: string;         // string
    chat_name: string;        // string
    created_at: string;       // time.Time as ISO string
}

export interface ChatCard {
    id: string;
    name: string;
    thumbnail: string; // Base64 encoded []byte
    is_private: boolean;
}

interface TelegramUser {
    id: number;
    first_name: string;
    last_name?: string;
    username?: string;
    language_code: string;
}

interface InitDataUnsafe {
    user: TelegramUser;
    query_id: string;
    auth_date: number;
    hash: string;
}

interface TelegramWebApp {
    ready: () => void;
    initDataUnsafe?: InitDataUnsafe;
}

interface TelegramWindow {
    WebApp?: TelegramWebApp;
}

declare global {
    interface Window {
        Telegram?: TelegramWindow;
    }
}