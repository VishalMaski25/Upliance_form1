import React from 'react'
import { useAppSelector } from '../hooks'
import FormRenderer from '../components/FormRenderer'

const PreviewFormPage: React.FC = ()=>{
  const fields = useAppSelector((s)=>s.formBuilder.currentFields)
  return (
    <div>
      <h2>Preview</h2>
      <FormRenderer fields={fields} />
    </div>
  )
}
export default PreviewFormPage
