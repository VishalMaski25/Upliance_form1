import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import CreateFormPage from './pages/CreateForm'
import PreviewFormPage from './pages/PreviewForm'
import MyFormsPage from './pages/MyForms'
import { AppBar, Toolbar, Button, Box, Typography } from '@mui/material'

const App: React.FC = ()=>{
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography sx={{ flex: 1 }}>Upliance Form Builder</Typography>
          <Button color="inherit" component={Link} to="/create">Create</Button>
          <Button color="inherit" component={Link} to="/preview">Preview</Button>
          <Button color="inherit" component={Link} to="/myforms">My Forms</Button>
        </Toolbar>
      </AppBar>
      <Box sx={{ mt: 3 }}>
        <Routes>
          <Route path="/" element={<CreateFormPage/>} />
          <Route path="/create" element={<CreateFormPage/>} />
          <Route path="/preview" element={<PreviewFormPage/>} />
          <Route path="/myforms" element={<MyFormsPage/>} />
        </Routes>
      </Box>
    </div>
  )
}
export default App
