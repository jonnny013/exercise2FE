import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { useState , useEffect} from 'react'
import axios from 'axios'
import Alert from '@mui/material/Alert'

const Form = () => {
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [body, setBody] = useState('')
  const [error, setError] = useState('')

    useEffect(() => {
      const timeoutId = setTimeout(() => {
        setError('')
      }, 5000)
      return () => clearTimeout(timeoutId)
    }, [error, setError])

  const onSubmit = async (event) => {
    event.preventDefault()
    const emailToSend = {
      email,
      subject,
      body
    }
    try {
       await axios.post('/api/email', emailToSend)
       setEmail('')
       setBody('')
       setSubject('')
       setError('Your email has been sent')
    } catch (err) {
      console.log(err)
      setError(err.response.data)
    } 
  }


  return (
    <div
      style={{
        backgroundColor: '#CAD5DF',
        flexGrow: 1,
        margin: 0,
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Box
        component='form'
        sx={{
          '& .MuiTextField-root': { m: 1, width: '55ch' },
        }}
        noValidate
        autoComplete='off'
        style={{ display: 'flex', flexDirection: 'column' }}
      >
        {error.length > 1 && <Alert severity='info'>{error}</Alert>}
        <TextField
          id='outlined-multiline-flexible'
          label='Email to:'
          placeholder='email@email.com'
          onChange={event => setEmail(event.target.value)}
          value={email}
        />
        <TextField
          id='outlined-textarea'
          label='Subject'
          placeholder='Welcome to the team...'
          onChange={event => setSubject(event.target.value)}
          value={subject}
        />
        <TextField
          id='outlined-multiline-static'
          label='Body'
          placeholder='Some lovely message here...'
          multiline
          rows={4}
          value={body}
          onChange={event => setBody(event.target.value)}
        />
        <Button
          variant='contained'
          type='submit'
          onClick={onSubmit}
          style={{ margin: 8 }}
        >
          Send
        </Button>
      </Box>
    </div>
  )
}

export default Form
