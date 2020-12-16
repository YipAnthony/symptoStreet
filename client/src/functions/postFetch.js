export default async function postSearch (searchData) {
    const response = await fetch( "http://localhost:4000/search", {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(searchData)
    })
    return response.json()
}
