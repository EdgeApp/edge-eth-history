import { fixture } from './utilsFixtures'

import { assert } from 'chai'
import { earnDataParser, normalizeDate, createDatesArray } from '../../src/utils/utils'

describe('earnDataParser', () => {
  for (const testCase of fixture.earnDataParser) {
    it(testCase.testDescription, () => {
      // Arrange
      const inputData = testCase.inputData
      const expectedType = testCase.outputType
      const expectedOutput = testCase.expectedOutput
      if (expectedType === 'TypeError') {
        assert.throws(() => { earnDataParser(inputData) }, TypeError, expectedOutput)
      } else if (expectedType === 'Error') {
        assert.throws(() => { earnDataParser(inputData) }, Error, expectedOutput)
      } else if (expectedType === 'object') {
        // Act
        const actualResult = earnDataParser(inputData)
        assert.typeOf(actualResult, expectedType)
        // Assert
        assert.deepEqual(actualResult.sortedData, expectedOutput.sortedData)
        assert.deepEqual(actualResult, expectedOutput)
      }
    })
  }
})

describe('normalizeDate', () => {
  for (const testCase of fixture.normalizeDate) {
    it(testCase.testDescription, () => {
      // Arrange
      const { inputData, expectedType, expectedOutput } = testCase
      // Act
      const actualResult = normalizeDate(inputData)
      // Assert
      assert.typeOf(actualResult, expectedType)
      assert.deepEqual(actualResult, expectedOutput)
    })
  }
})

describe('createDatesArray', () => {
  for (const testCase of fixture.createDatesArray) {
    it(testCase.testDescription, () => {
      // Arrange
      const { firstDate, secondDate, interval, expectedType, expectedOutput } = testCase
      // Act
      const actualResult = createDatesArray(firstDate, secondDate, interval)
      // Assert
      assert.typeOf(actualResult, expectedType)
      assert.deepEqual(actualResult, expectedOutput)
    })
  }
})
