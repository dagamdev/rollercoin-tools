export async function customFetch (path: string, authorization = false) {
  return await fetch(`${process.env.ROLLER_ENDPOINT}${path}`, {
    headers: authorization
      ? {
          authorization: 'Bearer ' + process.env.AUTHORIZATION
        }
      : undefined
  })
}
