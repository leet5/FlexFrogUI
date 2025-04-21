import React, {useEffect, useState} from 'react';

type Props = {
    image: File; tgAvailable: boolean; onSearch: () => void;
};

const ImagePreview: React.FC<Props> = ({image, tgAvailable, onSearch}) => {
    const [previewUrl, setPreviewUrl] = useState<string>('');

    useEffect(() => {
        const url = URL.createObjectURL(image);
        setPreviewUrl(url);

        return () => URL.revokeObjectURL(url); // Clean up the object URL
    }, [image]);

    return (
        <div className="mt-3">
            <strong>Selected Image:</strong>
            <div className="mt-2">
                <img
                    src={previewUrl}
                    alt="Preview"
                    className="img-thumbnail"
                    style={{maxHeight: '200px'}}
                />
            </div>
            {!tgAvailable && (<button className="btn froggy-btn mt-3" onClick={onSearch}>
                    Search
                </button>)}
        </div>
    );
};

export default ImagePreview;