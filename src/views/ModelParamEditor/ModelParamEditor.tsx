import React, { useState } from 'react'
import type { Model, Param, ParamValue } from '../../types/param-editor.ts'

interface ModelParamEditorProps {
  params: Param[]
  model: Model
}

const ModelParamEditor: React.FC<ModelParamEditorProps> = ({ params, model }) => {
  const getDefaultValue = (param: Param): string | number => {
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

  const initializeParamValues = () => {
    return params.map((param) => {
      const existingValue = model.paramValues.find((pv) => pv.paramId === param.id)
      return {
        paramId: param.id,
        value: existingValue ? existingValue.value : getDefaultValue(param),
      }
    })
  }

  const [paramValues, setParamValues] = useState<ParamValue[]>(initializeParamValues())

  const handleInputChange = (paramId: number, value: string | number) => {
    setParamValues((prevValues) => {
      const updatedValues = prevValues.map((paramValue) =>
        paramValue.paramId === paramId ? { ...paramValue, value } : paramValue,
      )
      if (!updatedValues.find((paramValue) => paramValue.paramId === paramId)) {
        updatedValues.push({ paramId, value })
      }
      return updatedValues
    })
  }

  const normalizeParamValues = (paramValues: ParamValue[], params: Param[]): ParamValue[] => {
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

  const getModel = (): Model => {
    const completeParamValues = params.map((param) => {
      const existingValue = paramValues.find((pv) => pv.paramId === param.id)
      return {
        paramId: param.id,
        value: existingValue ? existingValue.value : getDefaultValue(param),
      }
    })

    const normalizedParamValues = normalizeParamValues(completeParamValues, params)

    return {
      paramValues: normalizedParamValues,
      colors: model.colors,
    }
  }

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Редактор параметров</h2>
      <div className="space-y-4">
        {params.map((param) => {
          const paramValue = paramValues.find((pv) => pv.paramId === param.id)?.value || ''
          return (
            <div key={param.id} className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">{param.name}:</label>
              {param.type === 'string' && (
                <input
                  type="text"
                  value={paramValue as string}
                  onChange={(e) => handleInputChange(param.id, e.target.value)}
                  className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              )}
              {param.type === 'number' && (
                <input
                  type="number"
                  value={paramValue as number}
                  onChange={(e) => handleInputChange(param.id, e.target.value)}
                  className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              )}
              {param.type === 'select' && param.options && (
                <select
                  value={paramValue as string}
                  onChange={(e) => handleInputChange(param.id, e.target.value)}
                  className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                  {param.options.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              )}
            </div>
          )
        })}
      </div>
      <button
        onClick={() => console.log(getModel())}
        className="mt-6 px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
        Получить модель
      </button>
    </div>
  )
}

export default ModelParamEditor
