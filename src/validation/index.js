export const validatePage1 = ({ values }) => {
    const { name, location } = values;
    if (name && location.lat && location.long) {
        return false;
    }
    return true;
}

export const validatePage2 = ({ values }) => {
    const { ratings, recommended, size } = values;
    const { quality, safety, illumination } = ratings;
    if (size && quality && safety && illumination && recommended !== null) {
        return false;
    }
    return true;
}

export const validatePage3 = ({ values }) => {
    const { imageUrl } = values;
    if (imageUrl) {
        return false;
    }
    return true;
}