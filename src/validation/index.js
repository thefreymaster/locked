export const validatePage1 = ({ values }) => {
    const { name, location, notes } = values;
    if (name && location.lat && location.long && notes) {
        return false;
    }
    return true;
}

export const validatePage2 = ({ values }) => {
    const { ratings, recommended, size, traffic } = values;
    const { quality, safety, illumination } = ratings;
    if (size && quality && safety && illumination && traffic && recommended !== null) {
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