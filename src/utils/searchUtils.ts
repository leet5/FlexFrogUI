export const parseTags = (input: string): string[] => {
    return input
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag.length > 0);
};

export const createSearchFormData = (
    tags: string[],
    selectedImage: File | null
): FormData => {
    const formData = new FormData();
    formData.append('tags', JSON.stringify(tags));
    if (selectedImage) {
        formData.append('image', selectedImage);
    }
    return formData;
};