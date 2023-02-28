export const validatePage1 = ({ values }) => {
    const { location } = values;
    if (location.lat && location.long && values?.name) {
        return false;
    }
    return true;
}

export const validatePage2 = ({ values }) => {
    const { ratings, size, traffic } = values;
    const { quality, safety, illumination } = ratings;
    if (size && quality && safety && illumination && traffic) {
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