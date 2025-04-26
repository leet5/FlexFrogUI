export const initializeTelegram = (callback: () => void): boolean => {
    const tg = (window as unknown as TelegramWebApp).Telegram?.WebApp;
    if (!tg) return false;

    tg.expand();
    tg.MainButton.setText('Search');
    tg.MainButton.onClick(callback);
    return true;
};

export const getTelegramInitData = (): string => {
    return (window as unknown as TelegramWebApp).Telegram?.WebApp?.initData || '';
};