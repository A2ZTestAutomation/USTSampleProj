import { test, expect } from "@playwright/test"

const getLaunchDetails = {
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


const expRes = {
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

test('Query to get Rocket Launch details..', async ({ request, baseURL }) => {
    const res = await request.post(baseURL as string, getLaunchDetails)
    const resData = await res.json()
    console.log(resData)
    expect(res.status()).toBe(200)
    expect(resData.data).toEqual(expRes)
    expect(expRes.launch.rocket.name).toEqual("Falcon 9")
    expect(expRes.launch.rocket.id).toEqual('falcon9')
    expect(expRes.launch.isBooked).not.toBeTruthy()

})
