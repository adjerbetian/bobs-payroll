export function toFloat(n: string | undefined): number | undefined {
    return parseFloat(n || "") || undefined;
}
