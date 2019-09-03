export function stripQuotationMarks(s: string): string {
    if (!s.trim().startsWith(`"`)) return s;
    return s.trim().slice(1, -1);
}
