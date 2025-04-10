import React, { useState } from 'react'
import type { Model, Param, ParamValue } from '../../types/param-editor.ts'
import ParamInput from './ParamInput'
import { getDefaultValue, normalizeParamValues, generateUniqueId } from './utils'

interface ModelParamEditorProps {
  params: Param[]
  model: Model
}

const ModelParamEditor: React.FC<ModelParamEditorProps> = ({ params: initialParams, model }) => {
  const [params, setParams] = useState<Param[]>(initialParams)
  const [paramValues, setParamValues] = useState<ParamValue[]>(initializeParamValues())

  const [newParamName, setNewParamName] = useState('')
  const [newParamType, setNewParamType] = useState<'string' | 'number' | 'select'>('string')
  const [newParamOptions, setNewParamOptions] = useState<string[]>([])
  const [newOption, setNewOption] = useState('')

  function initializeParamValues() {
    return initialParams.map((param) => {
      const existingValue = model.paramValues.find((pv) => pv.paramId === param.id)
      return {
        paramId: param.id,
        value: existingValue ? existingValue.value : getDefaultValue(param),
      }
    })
  }

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

  const handleAddOption = () => {
    if (newOption.trim()) {
      setNewParamOptions((prevOptions) => [...prevOptions, newOption.trim()])
      setNewOption('')
    }
  }

  const handleAddParam = () => {
    if (!newParamName.trim()) return

    let newParam: Param

    if (newParamType === 'select') {
      newParam = {
        id: generateUniqueId(),
        name: newParamName,
        type: 'select',
        options: newParamOptions,
      }
    } else {
      newParam = {
        id: generateUniqueId(),
        name: newParamName,
        type: newParamType,
      }
    }

    setParams((prevParams) => [...prevParams, newParam])
    setParamValues((prevValues) => [
      ...prevValues,
      { paramId: newParam.id, value: getDefaultValue(newParam) },
    ])
    setNewParamName('')
    setNewParamOptions([]) // Очистить опции после добавления параметра
  }

  const handleRemoveParam = (paramId: number) => {
    setParams((prevParams) => prevParams.filter((param) => param.id !== paramId))
    setParamValues((prevValues) => prevValues.filter((paramValue) => paramValue.paramId !== paramId))
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
          <div key={param.id} className="flex items-end space-x-4">
            <div className="flex-1">
              <ParamInput
                param={param}
                value={paramValues.find((pv) => pv.paramId === param.id)?.value || ''}
                onChange={handleInputChange}
              />
            </div>
            <button
              onClick={() => handleRemoveParam(param.id)}
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500">
              Удалить
            </button>
          </div>
        ))}
      </div>
      <hr className="my-6 border-gray-300" />
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">Добавить новый параметр</h3>
        <div className="flex items-center space-x-4">
          <input
            type="text"
            placeholder="Имя параметра"
            value={newParamName}
            onChange={(e) => setNewParamName(e.target.value)}
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
          />
          <select
            value={newParamType}
            onChange={(e) => setNewParamType(e.target.value as 'string' | 'number' | 'select')}
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="string">Строка</option>
            <option value="number">Число</option>
            <option value="select">Выбор</option>
          </select>
          <button
            onClick={handleAddParam}
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">
            Добавить
          </button>
        </div>
        {newParamType === 'select' && (
          <div className="mt-4">
            <h4 className="text-md font-medium mb-2">Опции для выбора</h4>
            <div className="flex items-center space-x-4">
              <input
                type="text"
                placeholder="Добавить опцию"
                value={newOption}
                onChange={(e) => setNewOption(e.target.value)}
                className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              />
              <button
                onClick={handleAddOption}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                Добавить опцию
              </button>
            </div>
            <ul className="mt-2 list-disc pl-5">
              {newParamOptions.map((option, index) => (
                <li key={index} className="text-sm text-gray-700">
                  {option}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <button
        onClick={() => console.log(getModel())}
        className="mt-6 px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full">
        Получить модель
      </button>
    </div>
  )
}

export default ModelParamEditor
