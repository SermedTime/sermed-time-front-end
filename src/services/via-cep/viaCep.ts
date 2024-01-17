import axios, { AxiosResponse } from 'axios'

import { ViaCepResponse } from './viaCep.interface'

const api = axios.create({ baseURL: 'https://viacep.com.br/ws/' })

export class ViaCepService {
  static fetchAddressByCep(
    cep: number | string
  ): Promise<AxiosResponse<ViaCepResponse>> {
    return api.get(`${cep}/json/`)
  }
}
