export function testJestConfig(a:number, b:number) {
    if(!a) return new Error('a parameter is required')
    if(!b) return new Error('b parameter is required')
    return a + b
}