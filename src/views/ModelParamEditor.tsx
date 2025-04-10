import React, { useState } from 'react'
import type { Model, Param, ParamValue } from '../types/param-editor.ts'

interface ModelParamEditorProps {
  params: Param[]
  model: Model
}

const ModelParamEditor: React.FC<ModelParamEditorProps> = ({ params, model }) => {
  const [paramValues, setParamValues] = useState<ParamValue[]>(model.paramValues)

  const handleInputChange = (paramId: number, value: string) => {
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
    return {
      paramValues,
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
              <input
                type="text"
                value={paramValue}
                onChange={(e) => handleInputChange(param.id, e.target.value)}
                className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
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
