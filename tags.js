import { useState, useContext, useEffect } from 'react'
import { Context } from '../../Provider'
import store from '../../utilities/Store'
import config from '../../config'
import CustomTextField from './CustomTextField'
import { Alert, Box, Chip, InputAdornment } from '@mui/material'
import SellIcon from '@mui/icons-material/Sell'

export default function Tags() {
  const [state, setState] = useState({
    tags: [],
    errors: undefined
  })
  const [context, dispatch] = useContext(Context)
  
  const handleCreateTags = event => {
    if (event.target.value.trim() === '' || event.target.value.trim().length === 0) {
      return
    }
    if (state.error) {
      setState({ ...state, error: undefined })
    }
    if (state.tags.length >= 4) {
      return setState({ ...state, error: 'Limited to 4 tags only.' })
    }
    if (event.code !== 'Space' && event.code !== 'Comma' && event.code !== 'Enter') {
      return
    }
    
    event.preventDefault()
    
    const tag = event.target.value.replace(/[^a-zA-Z1-9]/g, '')
    const tags = [ ...state.tags, { id: tag, text: tag }]
    const duplicate = state.tags.find(x => x.id === tag)
    if (duplicate) {
      return
    }
    store.set(config.store.posts.create, {
      ...store.get(config.store.posts.create),
      tags
    })
    setState({ ...state, tags })
    dispatch({ type: 'tags', payload: tags })
    event.target.value = ''
  
  }
  
  const handleRemoveTags = event => {
    if (state.error) {
      setState({ ...state, error: undefined })
    }
    const id = event.currentTarget.parentElement.id
    const tags = state.tags.filter(tag => id !== tag.id)
    store.set(config.store.posts.create, {
      ...store.get(config.store.posts.create),
      tags
    })
    setState({ ...state, tags })
    dispatch({ type: 'tags', payload: tags })
  }
  
  const loadFromStorage = async () => {
    const data = store.get(config.store.posts.create)
    setState({ ...state, tags: data.tags })
  }
  
  const handleRemoveError = event => {
    setState({ ...state, error: undefined })
  }
  
  useEffect(() => {
    loadFromStorage()
  }, [])
  
  return (
    <>
      <CustomTextField id="tags" type="text" focusColor="#222" placeholder="Tags: Asian, Spicy, etc." borderradius="15px" variant="outlined" margin="dense" fullWidth
        onKeyPress={handleCreateTags}
        onBlur={handleRemoveError}
        inputProps={{ autoComplete: 'off' }}
        InputProps={{ endAdornment: 
          <InputAdornment position="start"><SellIcon  color="#222" /></InputAdornment> 
        }} />
        {!!state.tags.length && (
          <Box mb="10px">
            {state.tags.map((tag, index) => 
              <Chip key={tag.id} id={tag.id} label={tag.text} onDelete={handleRemoveTags} />
            )}
          </Box>
        )}
        {state.error && (
          <Alert severity="error" sx={{ fontSize: '.82em', mb: '20px' }}>{state.error}</Alert>
        )}
    </>
  ) 
}
