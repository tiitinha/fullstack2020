interface ExcerciseValues {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

interface parserValues {
    target: number;
    hours: Array<number>;
}


const parseExerciseArguments = (args: Array<string>): parserValues => {
    args.forEach(v => {
        if (isNaN(Number(v))) {
            throw new Error('All arguments are not numbers!');
        }
    });

    const target = Number(args[0]);
    const hours = args.splice(1).map(v => Number(v));

    return {
        target,
        hours
    }
}

const exerciseCalculator = (hours: Array<number>, target: number): ExcerciseValues => {

    const periodLength = hours.length;
    const trainingDays = hours.filter(n => n > 0).length;
    const average = hours.reduce((acc, cur) => acc + cur) / periodLength;
    const success = average >= target;
    let rating;

    if (average / target < 0.8) {
        rating = 1;
    } else if (average / target < 1.2) {
        rating = 2;
    } else if (average / target >= 1.2) {
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
    }
}

try {
    const { target, hours } = parseExerciseArguments(process.argv.splice(3));
    console.log(exerciseCalculator(hours, target));
} catch (e) {
    console.log(e.message);
}