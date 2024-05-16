export interface IUserRegisterForm {
  uuid?: string
  cpf: string
  name: string
  socialName: string
  email: string
  companyUuid: string
  position: string
  payrollNumber: string
  employeeCode: string
  pis: string
  ctps: string
  admissionDate: string | null
  resignationDate?: string | null
  status: string
  workingDayId?: string
}
