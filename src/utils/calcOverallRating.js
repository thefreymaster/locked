export const calculateOverallRating = ({ ratings }) => {
    let overall = 0;
    let total = 3;

    Object.entries(ratings).map(([key, rating]) => {
        if (rating === -1) {
            total--;
            return overall;
        }
        return overall = overall + rating;
    })
    return parseFloat((overall / total).toFixed(1));
}