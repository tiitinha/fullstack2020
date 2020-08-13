interface ExcerciseValues {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

// interface parserValues {
//     target: number;
//     hours: Array<number>;
// }


// const parseExerciseArguments = (args: Array<string>): parserValues => {
//     args.forEach(v => {
//         if (isNaN(Number(v))) {
//             throw new Error('All arguments are not numbers!');
//         }
//     });

//     const target = Number(args[0]);
//     const hours = args.splice(1).map(v => Number(v));

//     return {
//         target,
//         hours
//     }
// }

export const exerciseCalculator = (hours: Array<string>, target: number): ExcerciseValues => {

    const hoursNumber = hours.map(h => Number(h));
    const targetNumber = Number(target);

    const periodLength = hoursNumber.length;
    const trainingDays = hoursNumber.filter(n => n > 0).length;
    const average = hoursNumber.reduce((acc, cur) => acc + cur) / periodLength;
    const success = average >= targetNumber;
    let rating;

    if (average / targetNumber < 0.8) {
        rating = 1;
    } else if (average / targetNumber < 1.2) {
        rating = 2;
    } else if (average / targetNumber >= 1.2) {
        rating = 3;
    } else {
        rating = 0;
    }

    let ratingDescription;

    if (rating === 1) {
        ratingDescription = 'you have to do more work';
    } else if (rating === 2) {
        ratingDescription = 'getting there';
    } else if (rating === 3) {
        ratingDescription = 'keep up the good work';
    } else {
        ratingDescription = 'what?';
    }

    return {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average
    };
};

// try {
//     const { target, hours } = parseExerciseArguments(process.argv.splice(3));
//     console.log(exerciseCalculator(hours, target));
// } catch (e) {
//     console.log(e.message);
// }