export async function addEmployee(
    id: string,
    name: string,
    description: string,
    rateType: string,
    rate: string
): Promise<void> {
    console.log({
        id,
        name,
        description,
        rateType,
        rate
    });
}
