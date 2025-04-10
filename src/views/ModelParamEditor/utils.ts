import type { Param, ParamValue } from '../../types/param-editor.ts'

export const getDefaultValue = (param: Param): string | number => {
  switch (param.type) {
    case 'number':
      return '0'
    case 'string':
      return ''
    case 'select':
      return param.options?.[0] || ''
    default:
      throw new Error(`Неизвестный тип параметра: ${(param as Param).type}`)
  }
}

export const normalizeParamValues = (paramValues: ParamValue[], params: Param[]): ParamValue[] => {
  return paramValues.map((paramValue) => {
    const param = params.find((p) => p.id === paramValue.paramId)
    if (!param) return paramValue

    let normalizedValue = paramValue.value
    if (param.type === 'number' && typeof paramValue.value === 'string') {
      normalizedValue = parseFloat(paramValue.value) || 0
    }

    return {
      ...paramValue,
      value: normalizedValue,
    }
  })
}
