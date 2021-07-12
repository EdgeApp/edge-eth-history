const { earnDataParser } = require( '../../lib/utils/utils.js')
const { fixture } = require('./utilsFixtures')

const assert = require('chai').assert

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
        assert.deepEqual(actualResult.rawData, expectedOutput.rawData)
        assert.deepEqual(actualResult.sortedData, expectedOutput.sortedData)
        assert.deepEqual(actualResult, expectedOutput)
      }
    })
  }
})
