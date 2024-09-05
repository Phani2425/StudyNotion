export function getAverageRating(AllRating) {

    if(AllRating.length === 0){
        return 0;
    }
    const totalRating = AllRating.reduce((acc,curr) => {
        return acc+curr.rating;
    },0);

    const averageRating = Math.round((totalRating/AllRating.length)*10)/10;

    return averageRating;
}