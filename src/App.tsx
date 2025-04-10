import ModelParamEditor from './views/ModelParamEditor.tsx'
import type { Param } from './types/param-editor.ts'

function App() {
  const params = [
    { id: 1, name: 'Назначение', type: 'string' },
    { id: 2, name: 'Длина', type: 'string' },
  ] as Param[]

  const model = {
    paramValues: [
      { paramId: 1, value: 'повседневное' },
      { paramId: 2, value: 'макси' },
    ],
    colors: ['red', 'blue'],
  }

  return (
    <div>
      <ModelParamEditor params={params} model={model} />
    </div>
  )
}

export default App
