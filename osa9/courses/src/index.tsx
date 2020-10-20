import React from "react";
import ReactDOM from "react-dom";

interface CoursePartBase {
    name: string;
    exerciseCount: number;
}

interface CoursePartBaseTwo extends CoursePartBase {
    description: string;
}

interface CoursePartOne extends CoursePartBaseTwo {
    name: "Fundamentals";
}

interface CoursePartTwo extends CoursePartBase {
    name: "Using props to pass data";
    groupProjectCount: number;
}

interface CoursePartThree extends CoursePartBaseTwo {
    name: "Deeper type usage";
    exerciseSubmissionLink: string;
}

interface CoursePartOwn extends CoursePartBase {
    name: "React and TS";
    exerciseCount: number;
    description: string;
    lectures: number;
}

type CoursePart = CoursePartOne | CoursePartTwo | CoursePartThree | CoursePartOwn;

const App: React.FC = () => {
    const courseName = "Half Stack application development";
    const courseParts: CoursePart[] = [
        {
            name: "Fundamentals",
            exerciseCount: 10,
            description: "This is an awesome course part"
        },
        {
            name: "Using props to pass data",
            exerciseCount: 7,
            groupProjectCount: 3
        },
        {
            name: "Deeper type usage",
            exerciseCount: 14,
            description: "Confusing description",
            exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev"
        },
        {
            name: 'React and TS',
            exerciseCount: 7,
            description: 'How to use TypeScript with React',
            lectures: 10
        }
    ];

    return (
        <div>
            <Header name={courseName} />
            <Content courseParts={courseParts} />
            <Total courseParts={courseParts} />
        </div>
    );
};

const Header: React.FC<{ name: string }> = ({ name }) => {

    return (
        <h3>
            {name}
        </h3>
    )

};

const Content: React.FC<{ courseParts: CoursePart[] }> = ({ courseParts }) => {

    return (
        <div>
            {courseParts.map(c =>
                <Part key={c.name} coursePart={c} />
            )}
        </div>
    )

};

const Total: React.FC<{ courseParts: CoursePart[] }> = ({ courseParts }) => {

    return (
        <div>
            Number of exercises {" "}
            {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
        </div>
    )

};

const Part: React.FC<{ coursePart: CoursePart }> = ({ coursePart }) => {

    switch (coursePart.name) {
        case 'Fundamentals':
            return (
                <div>
                    <h4>{coursePart.name}</h4>
                    <p>{coursePart.exerciseCount}</p>
                    <p>{coursePart.description}</p>
                </div>
            );
        case 'Using props to pass data':
            return (
                <div>
                    <h4>{coursePart.name}</h4>
                    <p>{coursePart.exerciseCount}</p>
                    <p>{coursePart.groupProjectCount}</p>
                </div>
            );
        case 'Deeper type usage':
            return (
                <div>
                    <h4>{coursePart.name}</h4>
                    <p>{coursePart.exerciseCount}</p>
                    <p>{coursePart.description}</p>
                    <p>{coursePart.exerciseSubmissionLink}</p>
                </div>
            );
        case 'React and TS':
            return (
                <div>
                    <h4>{coursePart.name}</h4>
                    <p>{coursePart.exerciseCount}</p>
                    <p>{coursePart.description}</p>
                    <p>{coursePart.lectures}</p>
                </div>
            );
        default:
            break;
    }

    return (
        <div>

        </div>
    )
};

ReactDOM.render(<App />, document.getElementById("root"));