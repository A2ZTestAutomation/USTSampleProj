import { test, expect } from "@playwright/test"
import launchIDs from "../../testData/launchIDs.json"

let token

const headers = {
    Authorization: token
}

const loginMutate = {
    data: {
        query: `
            mutation Login($email: String) {
            login(email: $email) {
                token
            }
            }`,
        variables: {
            email: "corpdevops@gmail.com"
        }
    }
}
const bookTrip = {
    data: {
        query: `mutation BookTrips($launchIds: [ID]!) {
        bookTrips(launchIds: $launchIds) {
            launches {
            site
            }
            message
            success
        }
        }`,
        variables: { "launchIds": [launchIDs.launchIds[0], launchIDs.launchIds[1]] }
    },
    headers: headers

}

const expRes = {
    "bookTrips": {
        "launches": [
            {
                "site": "KSC LC 39A"
            },
            {
                "site": "CCAFS SLC 40"
            }
        ],
        "message": "trips booked successfully",
        "success": true
    }
}

test.beforeEach(async ({ request, baseURL }) => {
    const loginRes = await request.post(baseURL as string, loginMutate)
    expect(loginRes.status()).toBe(200)
    const resData = await loginRes.json()
    token = resData['data']['login']['token']
    console.log('Token....', token)
    headers.Authorization = token
})

test('Book Trips', async ({ request, baseURL }) => {
    const bookRes = await request.post(baseURL as string, bookTrip)
    // expect(bookRes.status()).toBe(200)
    const resData = await bookRes.json()
    const tripDetail = resData.data.bookTrips
    console.log(tripDetail)
    expect(resData.data).toEqual(expRes)
    expect(tripDetail.success).toBe(true)
    expect(tripDetail.message).toEqual('trips booked successfully')
    expect(tripDetail.launches[0]).toHaveProperty('site', 'KSC LC 39A')
    expect(tripDetail.launches[1]).toHaveProperty('site', 'CCAFS SLC 40')
})

