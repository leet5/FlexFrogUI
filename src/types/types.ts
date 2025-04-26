export interface SearchResult {
    images: string[];
}

export interface TelegramWebApp {
    WebApp?: {
        initData: string;
        expand: () => void;
        MainButton: {
            setText: (text: string) => void;
            onClick: (callback: () => void) => void;
        };
    };
}