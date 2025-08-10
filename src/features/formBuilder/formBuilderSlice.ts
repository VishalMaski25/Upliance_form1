import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { FormField, FormSchema } from '../../types'
import { v4 as uuidv4 } from 'uuid'

interface BuilderState {
  currentFields: FormField[]
  savedForms: FormSchema[]
}

const initialState: BuilderState = {
  currentFields: [],
  savedForms: JSON.parse(localStorage.getItem('savedForms') || '[]'),
}

const slice = createSlice({
  name: 'formBuilder',
  initialState,
  reducers: {
    addField(state, action: PayloadAction<{ type: FormField['type'] }>) {
      const id = uuidv4()
      state.currentFields.push({
        id,
        type: action.payload.type,
        label: `${action.payload.type} field`,
        required: false,
        defaultValue: '',
        options: action.payload.type === 'select' || action.payload.type === 'radio' ? ['Option 1', 'Option 2'] : undefined,
        validation: {},
        derived: null,
      })
    },
    updateField(state, action: PayloadAction<{ id: string; patch: Partial<FormField> }>) {
      const idx = state.currentFields.findIndex(f => f.id === action.payload.id)
      if (idx !== -1) {
        state.currentFields[idx] = { ...state.currentFields[idx], ...action.payload.patch }
      }
    },
    removeField(state, action: PayloadAction<string>) {
      state.currentFields = state.currentFields.filter(f => f.id !== action.payload)
    },
    reorderFields(state, action: PayloadAction<{ from: number; to: number }>) {
      const { from, to } = action.payload
      const fields = state.currentFields
      const [moved] = fields.splice(from, 1)
      fields.splice(to, 0, moved)
    },
    clearCurrent(state) {
      state.currentFields = []
    },
    saveForm(state, action: PayloadAction<{ name: string }>) {
      const schema: FormSchema = {
        id: uuidv4(),
        name: action.payload.name,
        createdAt: new Date().toISOString(),
        fields: state.currentFields.map(f => ({ ...f })),
      }
      state.savedForms.push(schema)
      localStorage.setItem('savedForms', JSON.stringify(state.savedForms))
    },
    loadFormIntoBuilder(state, action: PayloadAction<{ id: string }>) {
      const f = state.savedForms.find(s => s.id === action.payload.id)
      if (f) state.currentFields = JSON.parse(JSON.stringify(f.fields))
    },
    deleteSavedForm(state, action: PayloadAction<string>) {
      state.savedForms = state.savedForms.filter(s => s.id !== action.payload)
      localStorage.setItem('savedForms', JSON.stringify(state.savedForms))
    }
  }
})

export const { addField, updateField, removeField, reorderFields, clearCurrent, saveForm, loadFormIntoBuilder, deleteSavedForm } = slice.actions
export default slice.reducer
