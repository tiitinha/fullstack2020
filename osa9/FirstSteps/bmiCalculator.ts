// interface BmiValues {
//     value1: number;
//     value2: number;
// }

// const parseArguments = (args: Array<string>): BmiValues => {
//     if (args.length < 4) throw new Error('Not enough arguments');
//     if (args.length > 4) throw new Error('Too many args');

//     if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
//         return {
//             value1: Number(args[2]),
//             value2: Number(args[3])
//         }
//     } else {
//         throw new Error('Provided values were not numbers!')
//     }
// }


export const calculateBmi = (height: number, weight: number): string => {
    const bmiHeight = height / 100;

    const bmi = weight / (bmiHeight * bmiHeight);

    if (bmi < 18.5) {
        return 'Low (underweight)';
    } else if (bmi < 25) {
        return 'Normal (healthy weight)';
    } else if (bmi < 30) {
        return 'High (overweight)';
    } else if (bmi >= 30) {
        return 'Very high (obese)';
    } else {
        return 'What??';
    }
};

// try {
//     const { value1, value2 } = parseArguments(process.argv);
//     console.log(calculateBmi(value1, value2));
// } catch (e) {
//     console.log(e.message);
// }
