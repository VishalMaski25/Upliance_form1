import React from 'react'
import { useAppSelector, useAppDispatch } from '../hooks'
import { List, ListItem, ListItemText, Button } from '@mui/material'
import { loadFormIntoBuilder, deleteSavedForm } from '../features/formBuilder/formBuilderSlice'

const MyFormsPage: React.FC = ()=>{
  const saved = useAppSelector((s)=>s.formBuilder.savedForms)
  const dispatch = useAppDispatch()
  return (
    <div>
      <h2>My Forms</h2>
      <List>
        {saved.map(s=> (
          <ListItem key={s.id} secondaryAction={<>
            <Button onClick={()=>dispatch(loadFormIntoBuilder({ id: s.id }))}>Load</Button>
            <Button color="error" onClick={()=>dispatch(deleteSavedForm(s.id))}>Delete</Button>
          </>}>
            <ListItemText primary={s.name} secondary={new Date(s.createdAt).toLocaleString()} />
          </ListItem>
        ))}
      </List>
    </div>
  )
}
export default MyFormsPage
