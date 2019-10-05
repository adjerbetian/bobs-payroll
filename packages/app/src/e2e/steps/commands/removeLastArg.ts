export function removeLastArg(command: string): string {
    const parts = command.split(`"`);
    if (parts[parts.length - 1]) {
        return command
            .split(" ")
            .slice(0, -1)
            .join(" ");
    } else {
        return parts
            .slice(0, -1)
            .slice(0, -1)
            .join(`"`)
            .trim();
    }
}
