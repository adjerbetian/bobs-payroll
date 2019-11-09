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
    testCase: { sourceLocation: SourceLocation; attemptNumber: number };
    index: number;
    result: { status: Status };
}
export interface TestCaseFinished {
    result: { duration: number; status: Status };
    sourceLocation: SourceLocation;
}

interface EventDataCollector {
    getTestCaseAttempts(): TestCaseAttempt[];
    getTestCaseAttempt(args: { sourceLocation: SourceLocation; attemptNumber: number }): TestCaseAttempt;
}

interface TestCaseAttempt {
    gherkinDocument: GherkinDocument;
    pickle: Pickle;
    testCase: {
        sourceLocation: SourceLocation;
        steps: { actionLocation: SourceLocation; sourceLocation?: SourceLocation }[];
    };
    attemptNumber: number;
    result: any;
    stepAttachments: [];
    stepResults:
        | {
              duration: number;
              status: Status;
          }[]
        | null;
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

interface GherkinDocument {
    type: "GherkinDocument";
    feature: Feature;
    comments: string[];
    uri: string;
}

interface Feature {
    type: "Feature";
    tags: Tag[];
    location: Location;
    language: "en";
    keyword: "Feature";
    name: string;
    description: string | undefined;
    children: Scenario[];
}

interface Scenario {
    type: "Scenario";
    tags: Tag[];
    location: Location;
    keyword: "Scenario";
    name: string;
    description: string | undefined;
    steps: Step[];
}

interface Step {
    type: "Step";
    location: Location;
    keyword: StepKeyword;
    text: string;
    argument: undefined;
}

interface Tag {
    type?: "Tag";
    name: string;
    location: Location;
}

interface SourceLocation {
    uri: string;
    line: number;
}

interface Location {
    line: number;
    column: number;
}

type StepKeyword = "Then " | "When " | "Given ";
