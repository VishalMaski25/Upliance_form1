import React from 'react'
import { Box, TextField, Checkbox, FormControlLabel, Button, Typography } from '@mui/material'
import { FormField } from '../types'
import { useAppDispatch } from '../hooks'
import { updateField, removeField } from '../features/formBuilder/formBuilderSlice'

interface Props { field: FormField }

const FieldEditor: React.FC<Props> = ({ field }) => {
  const dispatch = useAppDispatch()
  return (
    <Box sx={{ border: '1px solid #eee', padding: 2, borderRadius: 1, mb: 1 }}>
      <Typography variant="subtitle1">{field.label} ({field.type})</Typography>
      <TextField fullWidth label="Label" value={field.label} onChange={(e) => dispatch(updateField({ id: field.id, patch: { label: e.target.value } }))} sx={{ mt:1 }} />
      <TextField fullWidth label="Default Value" value={field.defaultValue} onChange={(e) => dispatch(updateField({ id: field.id, patch: { defaultValue: e.target.value } }))} sx={{ mt:1 }} />
      <FormControlLabel control={<Checkbox checked={field.required} onChange={(e)=>dispatch(updateField({ id: field.id, patch: { required: e.target.checked } }))} />} label="Required" />
      <Box sx={{ mt:1 }}>
        <Button size="small" color="error" onClick={()=>dispatch(removeField(field.id))}>Delete</Button>
      </Box>
    </Box>
  )
}
export default FieldEditor
