import { useState, useCallback, useRef, useEffect } from 'react'

// import { getAccessToken, autoRefreshToken } from '../utils/credentials.helper'
// import { useLogOut } from './useLogOut'
// import API_URL from '../utils/constants'

// const MAX_RETRY_ATTEMPTS = 3
const GET_METHOD = 'GET'

export const useHttpClient = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  // const { logOutUser } = useLogOut()

  const activeHttpRequests = useRef([])

  const sendRequest = useCallback(async (url, reqOptions) => {
    setIsLoading(true)
    const httpAbortController = new AbortController()
    activeHttpRequests.current.push(httpAbortController)

    let fetchUrl = url.startsWith('/') ? `${process.env.ENV_URL}${url}` : url
    const reqParams = {
      method: reqOptions?.method ?? GET_METHOD,
      signal: httpAbortController.signal,
    }

    if (reqParams?.method !== GET_METHOD) {
      reqParams.headers = { 'Content-Type': 'application/json' }
      reqParams.body = JSON.stringify(reqOptions?.body) ?? null
    }

    if (reqOptions?.file) {
      // reqParams.headers = null
      delete reqParams.headers
      reqParams.body = reqOptions.file
    }

    if (reqOptions?.isAuth ?? true) {
      // const { accessToken } = await getAccessToken()
      // reqParams.headers.Authorization = `Bearer ${accessToken}`
    }

    if (reqOptions?.params) {
      const urlParams = reqOptions.params
      const newUrl = new URL(fetchUrl)
      for (const key in urlParams) {
        newUrl.searchParams.append(key, urlParams[key])
      }
      fetchUrl = newUrl.toString()
    }

    //console.log('%cRequest url: ', 'color: green', fetchUrl)
    //console.log('\tOptions: ', reqOptions)
    //console.log('\tOptions: ', reqParams)

    try {
      const response = await fetch(fetchUrl, reqParams)
      const data = await response.json()
      //console.log('\tResponse: ', data)
      activeHttpRequests.current = activeHttpRequests.current.filter(
        reqControl => reqControl !== httpAbortController,
      )

      // if (data.unAuthorizedRequest) {
      //   const isTokenRefresh = await autoRefreshToken()
      //   if (!isTokenRefresh || retry > MAX_RETRY_ATTEMPTS) {
      //     logOutUser()
      //   } else {
      //     retry++
      //     await sendRequest(fetchUrl, method, isAuth, headers, body, retry)
      //   }
      // }
      //console.log('res', response)
      if (!response.ok) {
        const errorMessage = data?.error?.message ?? data.message
        throw new Error(errorMessage)
      }

      setIsLoading(false)

      return data
    } catch (err) {
      //console.log('\tError: ', err)
      setError(err.message)
      setIsLoading(false)
      throw new Error(err.message)
    }
  }, [])

  const clearError = () => {
    setError(null)
  }

  useEffect(() => {
    return () => {
      activeHttpRequests.current.forEach(abortController =>
        abortController.abort(),
      )
    }
  }, [])

  return { isLoading, error, sendRequest, clearError }
}
