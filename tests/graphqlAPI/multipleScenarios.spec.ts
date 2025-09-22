import { test, expect, Page } from "@playwright/test"


const gqlScenarios = [
    {
        operationName: 'GetLaunches',
        expRes: {
            data: {
                "launches": {
                    "launches": [
                        {
                            "id": "110",
                            "site": "KSC LC 39A"
                        },
                        {
                            "id": "109",
                            "site": "CCAFS SLC 40"
                        },
                        {
                            "id": "108",
                            "site": "VAFB SLC 4E"
                        }
                    ],
                    "cursor": "1605979020",
                    "hasMore": true
                }
            }
        }
    },
    {
        operationName: 'GetLaunchDetail',
        expRes: {
            data: {
                "launch": {
                    "id": "109",
                    "isBooked": false,
                    "rocket": {
                        "id": "falcon9",
                        "name": "Falcon 9",
                        "type": "FT"
                    }
                }
            }
        }
    }
]

const GetLaunches = {
    data: {
        query: `query Launches($pageSize: Int, $after: String) {
        launches(pageSize: $pageSize, after: $after) {
            launches {
            id
            site
            }
            cursor
            hasMore
        }
        }`,
        variables: { "pageSize": 3, "after": " " }
    }

}
const GetLaunchDetail = {
    data: {
        query: `query Launch($launchId: ID!) {
            launch(id: $launchId) {
                id
                isBooked
                rocket {
                id
                name
                type
                }
            }
            }`,
        variables: {
            "launchId": "109"
        }
    }
}

gqlScenarios.forEach((scenario) => {
    test.only(`Query to execute with operation name ${scenario.operationName}`, async ({ request, baseURL }) => {
        console.log('Operation Name...', scenario.operationName)
        let match
        if (scenario.operationName === 'GetLaunches') {
            match = GetLaunches
        }
        else if (scenario.operationName === 'GetLaunchDetail') {
            match = GetLaunchDetail
        }
        const res = await request.post(baseURL as string, {
            data: {
                query: match.data.query,
                variables: match.data.variables
            }
        })
        console.log(res)
        const resData = await res.json()
        expect(res.status()).toBe(200)
        expect(resData["data"]).toEqual(scenario.expRes.data)
    })
})