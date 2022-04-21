import { createSlice } from '@reduxjs/toolkit'

const initialState = [
  { id: '0',  city: 'Antwerpen' },
  { id: '1',  city: 'Hasselt' },
  { id: '2',  city: 'Liege' },
  { id: '3',  city: 'Leuven' },
  { id: '4',  city: 'Wavre' },
  { id: '5',  city: 'Brussel' },
  { id: '6',  city: 'Antwerpen' },
  { id: '7',  city: 'Mons' },
  { id: '8',  city: 'Gent' },
  { id: '9',  city: 'Brugge' },
  { id: '10', city: 'Namur' }
]

const ProvincesSlice = createSlice({
  name: 'provinces',
  initialState,
  reducers: {
      
  }
})

export default ProvincesSlice.reducer