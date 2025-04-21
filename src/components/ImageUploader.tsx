import React, {useCallback, useState} from 'react';

interface ImageUploaderProps {
    searchQuery: string;
    onImageSelect: (file: File) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({searchQuery, onImageSelect}) => {
    const [dragOver, setDragOver] = useState(false);

    const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDragOver(false);
        if (e.dataTransfer.files.length > 0) {
            onImageSelect(e.dataTransfer.files[0]);
        }
    }, [onImageSelect]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            onImageSelect(e.target.files[0]);
        }
    };

    return (
        <div className={`fade-animation ${searchQuery.trim() !== '' ? 'fade-animation-hidden' : ''}`}>
            <div
                className={`border rounded p-4 text-center froggy-border ${dragOver ? 'bg-light' : ''}`}
                onDragOver={(e) => {
                    e.preventDefault();
                    setDragOver(true);
                }}
                onDragLeave={() => setDragOver(false)}
                onDrop={handleDrop}
            >
                <p className="mb-3 text-success">Drag & drop an image here or select a file</p>
                <input
                    type="file"
                    accept="image/*"
                    className="form-control"
                    onChange={handleFileChange}
                />
            </div>
        </div>
    );
};

export default ImageUploader;