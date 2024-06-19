import axios from 'axios'

import { removeLocalStorageItem } from '@/utils/storage/local'

import { ROUTE_LOGIN } from '@/routes/Pages/Auth/Auth.paths'

import { ROUTE_HOME } from '@/routes/Pages/Pages.paths'
import { getAuthorizationToken } from './token'

// import { refreshToken } from './refreshToken'

const api = axios.create({
  baseURL: `${import.meta.env.VITE_APP_API_BASE_URL}`
})

api.interceptors.response.use(
  response => {
    return response
  },
  async function (error: any) {
    if (error.response.status === 401) {
      removeLocalStorageItem('Sermed@time:user')

      window.location.replace(
        `${ROUTE_LOGIN}?redirect=${window.location.pathname}`
      )
    }

    if (error.response.status === 403) {
      window.location.replace(`${ROUTE_HOME}`)
    }

    /* const token = getAuthorizationToken()

    if (error.response.status === 401 && token) {
      const response = await refreshToken()

      return response
    }

    return Promise.reject(error) */
  }
)

export interface ApiResponse {
  status: number
  data?: any
  error?: boolean
  message?: any
}

export async function get(
  path: string,
  params?: Record<string, unknown>,
  controller?: AbortController
): Promise<ApiResponse> {
  const token = getAuthorizationToken()

  const currentUrl = typeof window !== 'undefined' ? window.location.href : ''

  try {
    const response = await api.get(path, {
      params,
      headers: {
        Authorization: token,
        'X-Requested-From': currentUrl
      },
      signal: controller?.signal
    })

    return response
  } catch (error: any) {
    return {
      status: error?.response?.status || 0,
      error: true,
      message: error?.response?.data.message || ''
    }
  }
}

export async function post(
  path: string,
  body?: any,
  header?: Record<string, unknown>
): Promise<ApiResponse> {
  const token = getAuthorizationToken()

  try {
    const response = await api.post(path, body, {
      headers: {
        Authorization: token,
        ...header
      }
    })

    return response
  } catch (error: any) {
    return {
      status: error?.response?.status || 0,
      error: true,
      message: error?.response?.data.message || ''
    }
  }
}

export async function put(
  path: string,
  body?: any,
  header?: Record<string, unknown>
): Promise<ApiResponse> {
  const token = getAuthorizationToken()

  try {
    const response = await api.put(path, body, {
      headers: {
        Authorization: token,
        ...header
      }
    })

    return response
  } catch (error: any) {
    return {
      status: error?.response?.status || 0,
      error: true,
      message: error?.response?.data.message || ''
    }
  }
}

export async function del(
  path: string,
  params?: Record<string, unknown>,
  header?: Record<string, unknown>
): Promise<ApiResponse> {
  const token = getAuthorizationToken()

  try {
    const response = await api.delete(path, {
      params,
      headers: {
        Authorization: token,
        ...header
      }
    })

    return response
  } catch (error: any) {
    return {
      status: error?.response?.status || 0,
      error: true,
      message: error?.response?.data.message || ''
    }
  }
}

export async function fakeRequest(
  time: number,
  values?: Record<string, any>
): Promise<ApiResponse> {
  await new Promise(resolve => setTimeout(resolve, time))

  return { status: 200, data: values }
}
