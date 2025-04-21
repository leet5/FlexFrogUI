export {};

declare global {
    interface TelegramWebApp {
        initData: string;
        initDataUnsafe: unknown;
        MainButton: {
            setText: (text: string) => void;
            show: () => void;
            hide: () => void;
            onClick: (callback: () => void) => void;
        };
        expand: () => void;
    }

    interface Window {
        Telegram?: {
            WebApp: TelegramWebApp;
        };
    }
}