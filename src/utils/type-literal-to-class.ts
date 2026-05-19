const ttm = <K extends string | number>(val: K, map: Record<K, string>) => map[val]
export default ttm