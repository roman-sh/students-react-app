import React, { useState } from 'react'
import {
  Button,
  Stack,
  TextField,
} from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { useAtom } from 'jotai'
import { studentsAtom, currentStudentAtom, selectedIndexAtom } from '../store.js'
import axios from '../axios.js'


const keys = [
  'id',
  'name',
  'birhtDate',
  'class',
  'score',
]


export default () => {
  const [students, setStudents] = useAtom(studentsAtom)
  const [currentStudent, setCurrentStudent] = useAtom(currentStudentAtom)
  const [selectedIndex, setSelectedIndex] = useAtom(selectedIndexAtom)
  const [isLoading, setIsLoading] = useState(false)

  const postStudent = async () => {
    setIsLoading(true)
    try {
      await axios.post('/student', currentStudent)
      const students = (await axios('/students')).data
      setStudents(students)
      if (!currentStudent._id) {
        setSelectedIndex(students.length - 1)
      }
    }
    catch (e) {
      console.log(e.message)
    }
    finally {
      setIsLoading(false)
    }
  }

  return (
    <Stack
      component="form"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        padding: 2,
        width: 300,
      }}
      spacing={2}
      noValidate
      autoComplete="off"
    >
      {
        keys.map(key =>
          <TextField
            key={key}
            label={key}
            value={currentStudent[key] || ''}
            type={key === 'birhtDate' ? 'date': undefined}
            InputLabelProps={key === 'birhtDate' ? { shrink: true }: undefined}
            onChange={event => setCurrentStudent({ ...currentStudent, [key]: event.target.value })}
          />
        )
      }
      {
        isLoading
          ? <LoadingButton loading={isLoading} variant="outlined">Saving</LoadingButton>
          : <Button variant="contained" onClick={postStudent}>Submit</Button>
      }

    </Stack>
  )
}
