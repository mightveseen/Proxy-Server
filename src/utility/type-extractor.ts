export function getBooleanValue(string: unknown): boolean{
    return (string as string).toLowerCase() === 'true'
}