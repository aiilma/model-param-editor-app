import React, { useState } from 'react'
import type { Model, Param, ParamValue } from '../../types/param-editor.ts'
import ParamInput from './ParamInput'
import { getDefaultValue, normalizeParamValues } from './utils'

interface ModelParamEditorProps {
  params: Param[]
  model: Model
}

const ModelParamEditor: React.FC<ModelParamEditorProps> = ({ params, model }) => {
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
        {params.map((param) => (
          <ParamInput
            key={param.id}
            param={param}
            value={paramValues.find((pv) => pv.paramId === param.id)?.value || ''}
            onChange={handleInputChange}
          />
        ))}
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
