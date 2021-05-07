export function map_to_object(data: Map<string, any>): object {
    const obj = {}
    Object.assign(obj, ...[...data.entries()].map(([k, v]) => ({[k]: v})))
    return obj
}
