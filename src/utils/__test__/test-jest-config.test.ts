import {describe, test, expect} from '@jest/globals'
import {testJestConfig} from '../test-jest-config'

describe('A dummy function to test jest configuration', () => {
    test.concurrent('Dummy function returns error if function call does not pass "a" param', async () => {
        expect(testJestConfig(null as unknown as number, 23)).toBeInstanceOf(Error)
    })    
    test.concurrent('Dummy function returns error if function call does not pass "n" param', async () => {
        expect(testJestConfig(23,null as unknown as number)).toBeInstanceOf(Error)
    })
    test.concurrent("Dummy function must return proper data", async () => {
        expect(testJestConfig(1,2)).toStrictEqual(3)
    })
})
