export interface ImageCardType {
    user_thumbnail: string;    // Base64 encoded []byte
    image_thumbnail: string;   // Base64 encoded []byte
    chat_thumbnail: string;    // Base64 encoded []byte
    message_id: number;        // int64
    user_name: string;         // string
    chat_name: string;        // string
    created_at: string;       // time.Time as ISO string
}