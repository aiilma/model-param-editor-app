import React from 'react'
import type { Param } from '../../types/param-editor.ts'

interface ParamInputProps {
  param: Param
  value: string | number
  onChange: (paramId: number, value: string | number) => void
}

const ParamInput: React.FC<ParamInputProps> = ({ param, value, onChange }) => {
  return (
    <div className="flex flex-col">
      <label className="text-sm font-medium text-gray-700 mb-1">{param.name}:</label>
      {param.type === 'string' && (
        <input
          type="text"
          value={value as string}
          onChange={(e) => onChange(param.id, e.target.value)}
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      )}
      {param.type === 'number' && (
        <input
          type="number"
          value={value as number}
          onChange={(e) => onChange(param.id, e.target.value)}
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      )}
      {param.type === 'select' && (
        <select
          value={value as string}
          onChange={(e) => onChange(param.id, e.target.value)}
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
          {param.options?.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      )}
    </div>
  )
}

export default ParamInput
