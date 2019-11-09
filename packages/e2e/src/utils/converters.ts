export function toFloat(n: string | null): number | undefined {
    return parseFloat(n || "") || undefined;
}
