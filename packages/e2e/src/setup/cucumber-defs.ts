import { Status } from "cucumber";

declare module "cucumber" {
    interface SummaryFormatter {
        eventDataCollector: EventDataCollector;
        colorFns: Record<Status, (text: string) => string>;
    }
}

export interface TestCaseStartedEvent {
    sourceLocation: SourceLocation;
}
export interface TestCaseFinishedEvent {
    testCase: { sourceLocation: SourceLocation };
    index: number;
    result: { status: Status };
}
export interface TestCaseFinished {
    result: { duration: number; status: Status };
    sourceLocation: SourceLocation;
}

interface SourceLocation {
    uri: string;
    line: number;
}

interface EventDataCollector {
    getTestCaseData(sourceLocation: SourceLocation): TestCaseData;
    getTestStepData(args: { testCase: { sourceLocation: SourceLocation }; index: number }): TestStepData;
}

interface TestCaseData {
    gherkinDocument: {
        type: "GherkinDocument";
        feature: Feature;
        comments: string[];
    };
    pickle: Pickle;
    testCase: {
        sourceLocation: SourceLocation;
        steps: { actionLocation: SourceLocation; sourceLocation?: SourceLocation }[];
    };
}

interface TestStepData {
    testStep: {
        sourceLocation?: SourceLocation;
        actionLocation: SourceLocation;
        result: {
            duration: number;
            status: Status;
        };
    };
    gherkinKeyword?: StepKeyword;
    pickleStep?: {
        text: string;
        arguments: any[];
        locations: Location[];
    };
}

interface Feature {
    type: "Feature";
    tags: Tag[];
    location: Location;
    language: "en";
    keyword: "Feature";
    name: string;
    children: Scenario[];
}

interface Pickle {
    tags: Tag[];
    name: string;
    language: "en";
    locations: Location[];
    steps: {
        text: string;
        arguments: any[];
        locations: Location[];
    }[];
}

interface Scenario {
    type: "Scenario";
    tags: Tag[];
    location: Location;
    keyword: "Scenario";
    name: string;
    steps: {
        type: "Step";
        location: Location;
        keyword: StepKeyword;
        text: string;
    }[];
}

interface Tag {
    type?: "Tag";
    name: string;
    location: Location;
}

interface Location {
    line: number;
    column: number;
}

type StepKeyword = "Then " | "When " | "Given ";
