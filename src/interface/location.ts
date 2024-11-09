export interface ILocation {
  id: number
  name: string
  codename: string
  division_type: string
  phone_code: number
  districts: IDistrict[]
}
export interface IDistrict {
  name: string
  code: number
  codename: string
  division_type: string
  wards: IWard[]
}
export interface IWard {
  name: string
  code: number
  codename: string
  division_type: string
}
