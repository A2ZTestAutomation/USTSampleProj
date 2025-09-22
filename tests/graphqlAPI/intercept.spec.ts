import { test, expect, Page } from "@playwright/test"

function getQueryOperationName(query: string): string | null {
    const match = query.match(/query\s+(\w+)/)
    return match ? match[1] : null
}

function hasOperationName(query: string, operationName: string): boolean {
    return (getQueryOperationName(query) === operationName)

}

const getLaunches = {
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
        variables: { "pageSize": 2, "after": " " }
    }
}
const mockGraphQL = async (page: Page) => {
    await page.route('**/graphql', async (route) => {
        const body = route.request().postDataJSON()
        const query = body.query
        console.log('PostJSON Query....', query)
        if (hasOperationName(query, 'Launches')) {
            await route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify({
                    data: {
                        "launches": {
                            "cursor": "1603553444",
                            "hasMore": true,
                            "launches": [
                                {
                                    "site": "KSC",
                                    "id": "ROC 110"
                                },
                                {
                                    "site": "CCAFS",
                                    "id": "ROC 109"
                                }
                            ]
                        }
                    }
                })

            })
            return
        }
        await route.continue()
    })

}
test('Intercept GraphQL Response', async ({ browser }) => {
    const page = await browser.newPage()
    await mockGraphQL(page)
    console.log('Done Routing.....')
    const response = await page.evaluate(async () => {
        const res = await fetch('https://apollo-fullstack-tutorial.herokuapp.com/graphql', {
            method: 'POST',
            headers: { contentType: 'application/json' },
            body: JSON.stringify({
                query: `query Launches{
            launches{
                id
                site
            }}`
            })
        })
        return res.json()
    })
    expect(response.data.launches.cursor).toEqual('1603553444')
    expect(response.data.launches.hasMore).toBe(true)
    expect(response.data.launches.launches).toEqual([
        { id: 'ROC 110', site: 'KSC' },
        { id: 'ROC 109', site: 'CCAFS' }
    ])

})


