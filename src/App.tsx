import ModelParamEditor from './views/ModelParamEditor/ModelParamEditor.tsx'
import { Param, ParamValue } from './types/param-editor.ts'

function App() {
  const params: Param[] = [
    { id: 1, name: 'Назначение', type: 'string' },
    { id: 2, name: 'Длина', type: 'number' },
    { id: 3, name: 'Выбор', type: 'select', options: ['option1', 'option2'] },
  ]

  const paramValues: ParamValue[] = [
    { paramId: 1, value: 'повседневное' },
    { paramId: 3, value: 'option1' },
  ]

  const model = {
    paramValues: paramValues,
    colors: ['red', 'blue'],
  }

  return (
    <div>
      <ModelParamEditor params={params} model={model} />
    </div>
  )
}

export default App
