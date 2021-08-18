export const fixture = {
  earnDataParser: [
    {
      testDescription: 'Returns parsed data given unparsed set of selected data',
      inputData: {
        _id: '2021-06-30T00:10:00.000Z',
        data: [
          {
            minFee: 77,
            maxFee: 78,
            dayCount: 6159,
            memCount: 3428,
            minDelay: 3,
            maxDelay: 10,
            minMinutes: 20,
            maxMinutes: 180
          },
          {
            minFee: 85,
            maxFee: 86,
            dayCount: 3574,
            memCount: 1691,
            minDelay: 2,
            maxDelay: 3,
            minMinutes: 5,
            maxMinutes: 70
          },
          {
            minFee: 91,
            maxFee: 92,
            dayCount: 4578,
            memCount: 3005,
            minDelay: 1,
            maxDelay: 2,
            minMinutes: 0,
            maxMinutes: 50
          },
          {
            minFee: 99,
            maxFee: 100,
            dayCount: 4924,
            memCount: 2492,
            minDelay: 0,
            maxDelay: 1,
            minMinutes: 0,
            maxMinutes: 35
          }
        ]
      },
      outputType: 'object',
      expectedOutput: {
        _id: '2021-06-30T00:10:00.000Z',
        sortedData: {
          zeroToOne: 100,
          oneToTwo: 92,
          twoToThree: 86,
          threeToTen: 78
        },
        data: [
          {
            minFee: 77,
            maxFee: 78,
            dayCount: 6159,
            memCount: 3428,
            minDelay: 3,
            maxDelay: 10,
            minMinutes: 20,
            maxMinutes: 180
          },
          {
            minFee: 85,
            maxFee: 86,
            dayCount: 3574,
            memCount: 1691,
            minDelay: 2,
            maxDelay: 3,
            minMinutes: 5,
            maxMinutes: 70
          },
          {
            minFee: 91,
            maxFee: 92,
            dayCount: 4578,
            memCount: 3005,
            minDelay: 1,
            maxDelay: 2,
            minMinutes: 0,
            maxMinutes: 50
          },
          {
            minFee: 99,
            maxFee: 100,
            dayCount: 4924,
            memCount: 2492,
            minDelay: 0,
            maxDelay: 1,
            minMinutes: 0,
            maxMinutes: 35
          }
        ]
      }
    },
    {
      testDescription: 'Returns parsed data given unparsed data with excess raw data',
      inputData: {
        _id: '2021-06-30T00:10:00.000Z',
        data: [
          {
            minFee:77,
            maxFee:78,
            dayCount:6159,
            memCount:3428,
            minDelay:3,
            maxDelay:10,
            minMinutes:20,
            maxMinutes:180
          },
          {
            minFee:79,
            maxFee:80,
            dayCount:9334,
            memCount:4231,
            minDelay:3,
            maxDelay:6,
            minMinutes:15,
            maxMinutes:120
          },
          {
            minFee:83,
            maxFee:84,
            dayCount:7103,
            memCount:4737,
            minDelay:2,
            maxDelay:3,
            minMinutes:5,
            maxMinutes:80
          },
          {
            minFee:85,
            maxFee:86,
            dayCount:3574,
            memCount:1691,
            minDelay:2,
            maxDelay:3,
            minMinutes:5,
            maxMinutes:70
          },
          {
            minFee:91,
            maxFee:92,
            dayCount:4578,
            memCount:3005,
            minDelay:1,
            maxDelay:2,
            minMinutes:0,
            maxMinutes:50
          },
          {
            minFee:99,
            maxFee:100,
            dayCount:4924,
            memCount:2492,
            minDelay:0,
            maxDelay:1,
            minMinutes:0,
            maxMinutes:35
          }
        ]
      },
      outputType: 'object',
      expectedOutput: {
        _id: '2021-06-30T00:10:00.000Z',
        sortedData: {
          zeroToOne: 100,
          oneToTwo: 92,
          twoToThree: 86,
          threeToTen: 78
        },
        data: [
          {
            minFee:77,
            maxFee:78,
            dayCount:6159,
            memCount:3428,
            minDelay:3,
            maxDelay:10,
            minMinutes:20,
            maxMinutes:180
          },
          {
            minFee:79,
            maxFee:80,
            dayCount:9334,
            memCount:4231,
            minDelay:3,
            maxDelay:6,
            minMinutes:15,
            maxMinutes:120
          },
          {
            minFee:83,
            maxFee:84,
            dayCount:7103,
            memCount:4737,
            minDelay:2,
            maxDelay:3,
            minMinutes:5,
            maxMinutes:80
          },
          {
            minFee:85,
            maxFee:86,
            dayCount:3574,
            memCount:1691,
            minDelay:2,
            maxDelay:3,
            minMinutes:5,
            maxMinutes:70
          },
          {
            minFee:91,
            maxFee:92,
            dayCount:4578,
            memCount:3005,
            minDelay:1,
            maxDelay:2,
            minMinutes:0,
            maxMinutes:50
          },
          {
            minFee:99,
            maxFee:100,
            dayCount:4924,
            memCount:2492,
            minDelay:0,
            maxDelay:1,
            minMinutes:0,
            maxMinutes:35
          }
        ]
      }
    },
    {
      testDescription: 'Returns TypeError when string is entered as argument',
      inputData: 'string',
      outputType: 'TypeError',
      expectedOutput: "Cannot read property 'reduce' of undefined"
    },
    {
      testDescription: 'Returns TypeError when number is entered as argument',
      inputData: 34,
      outputType: 'TypeError',
      expectedOutput: "Cannot read property 'reduce' of undefined"
    },
    {
      testDescription: 'Returns TypeError when undefined is entered as argument',
      inputData: undefined,
      outputType: 'TypeError',
      expectedOutput: "Cannot read property 'data' of undefined"
    },
    {
      testDescription: 'Returns Error when corrupted data is submitted',
      inputData: {
        _id: '2021-06-30T00:10:00.000Z',
        data: [
          {
            minFee: 77,
            maxFee: 78,
            dayCount: 6159,
            memCount: 3428,
            minDelay: 3,
            maxDelay: 10,
            minMinutes: 20,
            maxMinutes: 180
          },
          {
            minFee: 85,
            maxFee: 86,
            dayCount: 3574,
            memCount: 1691,
            minDelay: 2,
            maxDelay: 3,
            minMinutes: 5,
            maxMinutes: 70
          },
          {
            minFee: 91,
            maxFee: 92,
            dayCount: 4578,
            memCount: 3005,
            minDelay: 1,
            maxDelay: 2,
            minMinutes: 0,
            maxMinutes: 50
          }
        ]
      },
      outputType: 'Error',
      expectedOutput: 'Error: Corrupted Data'
    },
  ],
  normalizeDate: [
    {
      testDescription: 'Returns normalized UTC Date when passed an accurate date in the form of a string',
      inputData: '2020-04-13T00:17:34.111+08:00',
      expectedType: 'string',
      expectedOutput: '2020-04-12T16:10:00.000Z'
    },
    {
      testDescription: 'Returns null when passed an inaccurate date in the form of a string',
      inputData: '2020-02-34T00:17:34.111+08:00',
      expectedType: 'null',
      expectedOutput: null
    },
    {
      testDescription: 'Returns null when passed undefined',
      inputData: undefined,
      expectedType: 'null',
      expectedOutput: null
    },
    {
      testDescription: 'Returns null when passed object',
      inputData: {},
      expectedType: 'null',
      expectedOutput: null
    },
    {
      testDescription: 'Returns null when passed NaN',
      inputData: NaN,
      expectedType: 'null',
      expectedOutput: null
    },
    {
      testDescription: 'Returns null when passed array',
      inputData: [],
      expectedType: 'null',
      expectedOutput: null
    }
  ],
  createDatesArray: [
    {
      testDescription: 'Returns array of dates separated by configuration interval(default 10 minutes) when passed two dates',
      firstDate: new Date('2020-02-01T00:00:00.000-08:00'),
      secondDate: new Date('2020-02-01T01:00:00.000-08:00'),
      interval: 10,
      expectedType: 'array',
      expectedOutput: [
        '2020-02-01T08:00:00.000Z',
        '2020-02-01T08:10:00.000Z',
        '2020-02-01T08:20:00.000Z',
        '2020-02-01T08:30:00.000Z',
        '2020-02-01T08:40:00.000Z',
        '2020-02-01T08:50:00.000Z'
      ]
    },
    {
      testDescription: 'Returns empty array when passed newer first date than second date',
      firstDate: new Date('2020-02-01T01:00:00.000-08:00'),
      secondDate: new Date('2020-02-01T00:00:00.000-08:00'),
      expectedType: 'array',
      expectedOutput: []
    },
    {
      testDescription: 'Returns empty array when passed undefined dates',
      firstDate: undefined,
      secondDate: undefined,
      expectedType: 'array',
      expectedOutput: []
    },
    {
      testDescription: 'Returns empty array when passed an invalid date and a good date',
      firstDate: new Date('scnjs'),
      secondDate: new Date('2020-02-01T00:00:00.000-08:00'),
      expectedType: 'array',
      expectedOutput: []
    },
    {
      testDescription: 'Returns empty array when passed numbers',
      firstDate: 123,
      secondDate: 123,
      expectedType: 'array',
      expectedOutput: []
    },
    {
      testDescription: 'Returns empty array when passed strings',
      firstDate: 'bsdk',
      secondDate: 'agib',
      expectedType: 'array',
      expectedOutput: []
    },
    {
      testDescription: 'Returns empty array when passed nulls',
      firstDate: null,
      secondDate: null,
      expectedType: 'array',
      expectedOutput: []
    },
    {
      testDescription: 'Returns empty array when passed empty arrays',
      firstDate: [],
      secondDate: [],
      expectedType: 'array',
      expectedOutput: []
    }
  ]
}
