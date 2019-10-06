import { Status, SummaryFormatter } from "cucumber";
import { TestCaseFinished, TestCaseFinishedEvent, TestCaseStartedEvent } from "./cucumber-defs";
import chalk from "chalk";

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
        const { gherkinDocument, pickle } = this.eventDataCollector.getTestCaseData(sourceLocation);
        this.logLine(`${gherkinDocument.feature.name} / ${pickle.name}`);
    }
    private logTestStep({ testCase, index, result }: TestCaseFinishedEvent): void {
        const { gherkinKeyword, pickleStep } = this.eventDataCollector.getTestStepData({ testCase, index });
        if (pickleStep) {
            this.logLine(`${TAB}${getIcon(result.status)} ${chalk.gray(gherkinKeyword + pickleStep.text)}`);
        } else {
            if (result.status === Status.PASSED) return;
            this.logLine(`${TAB}${getIcon(result.status)} Hook`);
        }
    }
    private logTime({ result }: TestCaseFinished): void {
        if (result.duration > 800) {
            this.logLine(`${TAB}(${result.duration}ms)`);
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
