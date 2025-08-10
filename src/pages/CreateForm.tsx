import React, { useState } from 'react'
import FieldList from '../components/FieldList'
import { Button, Box, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material'
import { useAppSelector } from '../hooks'
import { useAppDispatch } from '../hooks'
import { saveForm, clearCurrent } from '../features/formBuilder/formBuilderSlice'

const CreateFormPage: React.FC = ()=>{
  const fields = useAppSelector((s)=>s.formBuilder.currentFields)
  const dispatch = useAppDispatch()
  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')

  const handleSave = ()=>{
    setOpen(true)
  }
  const confirmSave = ()=>{
    dispatch(saveForm({ name: name || `Form ${new Date().toLocaleString()}` }))
    setOpen(false)
    setName('')
    dispatch(clearCurrent())
    alert('Form saved to localStorage')
  }

  return (
    <Box>
      <FieldList />
      <Box sx={{ mt:2 }}>
        <Button variant="contained" onClick={handleSave} disabled={fields.length===0}>Save Form</Button>
      </Box>

      <Dialog open={open} onClose={()=>setOpen(false)}>
        <DialogTitle>Save Form</DialogTitle>
        <DialogContent>
          <TextField label="Form name" fullWidth value={name} onChange={(e)=>setName(e.target.value)} />
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>setOpen(false)}>Cancel</Button>
          <Button onClick={confirmSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
export default CreateFormPage
