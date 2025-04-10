export interface ParamBase {
  id: number
  name: string
}

interface StringParam extends ParamBase {
  type: 'string'
}

interface NumberParam extends ParamBase {
  type: 'number'
}

interface SelectParam extends ParamBase {
  type: 'select'
  options: string[]
}

export type Param = StringParam | NumberParam | SelectParam

export interface ParamValue {
  paramId: number
  value: number | string
}

export interface Model {
  paramValues: ParamValue[]
  colors: string[]
}
