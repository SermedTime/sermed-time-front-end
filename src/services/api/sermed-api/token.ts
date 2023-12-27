import { getLocalStorageItem } from '@/utils/storage/local'

export function getAuthorizationToken(): string {
  const token = getLocalStorageItem('Sermed@time:user')

  return token ? `Bearer ${token.auth.token}` : ''
}

export function getAuthorizationRefreshToken(): string {
  const token = getLocalStorageItem('Sermed@time:user')

  return token ? `Bearer ${token.auth.refreshToken}` : ''
}
