import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../app/store'
import { useAppDispatch } from '../hooks'
import FieldEditor from './FieldEditor'
import { addField } from '../features/formBuilder/formBuilderSlice'
import { Stack, MenuItem, Select, Typography } from '@mui/material'

const FieldList: React.FC = () => {
  const dispatch = useAppDispatch()
  const fields = useSelector((s: RootState) => s.formBuilder.currentFields)
  return (
    <div>
      <Stack direction="row" spacing={2} alignItems="center" sx={{ mb:2 }}>
        <Typography>Add field:</Typography>
        <Select
          value=""
          onChange={(e)=>dispatch(addField({ type: e.target.value as any }))}
          displayEmpty
          sx={{ minWidth: 160 }}
        >
          <MenuItem value="text">Text</MenuItem>
          <MenuItem value="number">Number</MenuItem>
          <MenuItem value="textarea">Textarea</MenuItem>
          <MenuItem value="select">Select</MenuItem>
          <MenuItem value="radio">Radio</MenuItem>
          <MenuItem value="checkbox">Checkbox</MenuItem>
          <MenuItem value="date">Date</MenuItem>
        </Select>
      </Stack>
      {fields.map(f => <FieldEditor key={f.id} field={f} />)}
    </div>
  )
}
export default FieldList
