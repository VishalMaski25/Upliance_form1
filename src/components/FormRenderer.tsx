import React, { useEffect, useState } from 'react'
import { FormField } from '../types'
import { TextField, Box, MenuItem, Checkbox, FormControlLabel, RadioGroup, Button, Typography, Radio } from '@mui/material'
import { validateValue } from '../utils/validation'
import { computeDerivedValue } from '../utils/derived'

interface Props { fields: FormField[] }

const FormRenderer: React.FC<Props> = ({ fields }) => {
  const [values, setValues] = useState<Record<string, any>>(() => {
    const init: Record<string, any> = {}
    fields.forEach(f => { init[f.id] = f.defaultValue ?? '' })
    return init
  })
  const [errors, setErrors] = useState<Record<string, string[]>>({})

  useEffect(()=>{
    // recompute derived fields whenever parent values change
    fields.forEach(f =>{
      if (f.derived) {
        const val = computeDerivedValue(f, fields, values)
        setValues(prev => ({ ...prev, [f.id]: val }))
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values])

  useEffect(() => {
    // if fields change (load different form), reset values
    const init: Record<string, any> = {}
    fields.forEach(f => { init[f.id] = f.defaultValue ?? '' })
    setValues(init)
    setErrors({})
  }, [fields])

  const handleChange = (id: string, v: any) => {
    setValues(prev => ({ ...prev, [id]: v }))
    // validate this field
    const field = fields.find(ff=>ff.id===id)
    if (field) {
      const errs = validateValue(v, field.validation)
      setErrors(prev=>({ ...prev, [id]: errs }))
    }
  }

  const handleSubmit = () => {
    // validate all
    const allErrors: Record<string, string[]> = {}
    fields.forEach(f=>{
      const errs = validateValue(values[f.id], f.validation)
      if (errs.length) allErrors[f.id] = errs
    })
    setErrors(allErrors)
    if (Object.keys(allErrors).length === 0) alert('Form valid (no backend to submit)')
  }

  return (
    <Box>
      {fields.map(f=> (
        <Box key={f.id} sx={{ mb:2 }}>
          {f.type === 'text' || f.type === 'number' ? (
            <TextField label={f.label} fullWidth value={values[f.id]||''} onChange={e=>handleChange(f.id, e.target.value)} />
          ) : null}
          {f.type === 'textarea' ? <TextField multiline rows={4} label={f.label} fullWidth value={values[f.id]||''} onChange={e=>handleChange(f.id, e.target.value)} /> : null}
          {f.type === 'select' ? (
            <TextField select label={f.label} fullWidth value={values[f.id]||''} onChange={e=>handleChange(f.id, e.target.value)}>
              {f.options?.map((o,i)=>(<MenuItem key={i} value={o}>{o}</MenuItem>))}
            </TextField>
          ) : null}
          {f.type === 'checkbox' ? (
            <FormControlLabel control={<Checkbox checked={!!values[f.id]} onChange={(e)=>handleChange(f.id, e.target.checked)} />} label={f.label} />
          ) : null}
          {f.type === 'radio' ? (
            <RadioGroup value={values[f.id]||''} onChange={(e)=>handleChange(f.id, e.target.value)}>
              {f.options?.map((o,i)=>(<FormControlLabel key={i} value={o} control={<Radio />} label={o} />))}
            </RadioGroup>
          ) : null}
          {f.type === 'date' ? <TextField type="date" label={f.label} value={values[f.id]||''} onChange={e=>handleChange(f.id, e.target.value)} InputLabelProps={{ shrink:true }} /> : null}

          {errors[f.id] && errors[f.id].length>0 && (
            <Box sx={{ color: 'error.main', mt:1 }}>
              {errors[f.id].map((er,i)=>(<Typography key={i} variant="caption" display="block">{er}</Typography>))}
            </Box>
          )}
        </Box>
      ))}
      <Button variant="contained" onClick={handleSubmit}>Submit (no backend)</Button>
    </Box>
  )
}

export default FormRenderer
