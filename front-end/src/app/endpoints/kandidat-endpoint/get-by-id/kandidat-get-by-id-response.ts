export interface KandidatGetByIdResponse {
  ime: string,
  prezime: string,
  datumRodjenja: Date,
  mjestoPrebivalista: string,
  zvanje: string,
  userName: string,
  email: string,
  phoneNumber: string,
  phoneNumberConfirmed: boolean,
  twoFactorEnabled: boolean,
  emailConfirmed: boolean
}
