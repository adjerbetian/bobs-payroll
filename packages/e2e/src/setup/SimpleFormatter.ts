import { Status, SummaryFormatter } from "cucumber";
import { TestCaseFinished, TestCaseFinishedEvent, TestCaseStartedEvent } from "./cucumber-defs";
import * as chalk from "chalk";

const TAB = "    ";

const ICONS: Record<Status, { char: string; color: "green" | "yellow" | "red" | "blue" }> = {
    [Status.PASSED]: { char: "✓", color: "green" },
    [Status.AMBIGUOUS]: { char: "!", color: "yellow" },
    [Status.FAILED]: { char: "×", color: "red" },
    [Status.PENDING]: { char: "P", color: "blue" },
    [Status.SKIPPED]: { char: "-", color: "blue" },
    [Status.UNDEFINED]: { char: "?", color: "yellow" }
};

export default class SimpleFormatter extends SummaryFormatter {
    constructor(options: any) {
        super(options);
        this.logScenario = this.logScenario.bind(this);
        this.logTestStep = this.logTestStep.bind(this);
        this.logTime = this.logTime.bind(this);

        options.eventBroadcaster.on("test-case-started", this.logScenario);
        options.eventBroadcaster.on("test-step-finished", this.logTestStep);
        options.eventBroadcaster.on("test-case-finished", this.logTime);
    }
    private logScenario({ sourceLocation }: TestCaseStartedEvent): void {
        const { gherkinDocument, pickle } = this.eventDataCollector.getTestCaseAttempt({
            sourceLocation,
            attemptNumber: 0
        });
        this.logLine(`${gherkinDocument.feature.name} / ${pickle.name}`);
    }
    private logTestStep(allArgs: TestCaseFinishedEvent): void {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { testCase, index, result } = allArgs;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { gherkinDocument, pickle } = this.eventDataCollector.getTestCaseAttempt(testCase);
        if (pickle) {
            this.logLine(`${TAB}${getIcon(result.status)}`);
            // this.logLine(`${TAB}${getIcon(result.status)} ${chalk.gray(pickle.steps[index].text)}`);
        } else {
            if (result.status === Status.PASSED) return;
            this.logLine(`${TAB}${getIcon(result.status)} Hook`);
        }
    }
    private logTime({ result }: TestCaseFinished): void {
        const milliseconds = Math.floor(result.duration / 1000000);
        if (milliseconds > 800) {
            this.logLine(`${TAB}(${milliseconds}ms)`);
        }
    }
    private logLine(text: string): void {
        this.log(text + "\n");
    }
}

function getIcon(status: Status): string {
    const icon = ICONS[status];
    return chalk[icon.color](icon.char);
}
