import React, { useEffect } from 'react'
import {
  List,
  ListItemButton,
  ListItemText,
  Button,
  Stack,
  IconButton
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import axios from 'axios'


export default ({ students, setStudents, currentStudent, setCurrentStudent, selectedIndex, setSelectedIndex }) => {

  useEffect(() => {
    ; (async () => {
      try {
        const students = (await axios('http://localhost:3500/students')).data
        setStudents(students)
        setCurrentStudent({ ...students[selectedIndex] })
      }
      catch (e) {
        console.log(e.message)
      }
    })()
  }, [])


  const handleListItemClick = (event, index) => {
    setSelectedIndex(index)
    setCurrentStudent({ ...students[index] })
  }


  const handleDelete = async (student) => {
    try {
      await axios.delete(`http://localhost:3500/student/${student._id}`)
      const students = (await axios('http://localhost:3500/students')).data
      setStudents(students)

      let index = selectedIndex
      if (selectedIndex === students.length) {  // last item
        index = selectedIndex - 1
        setSelectedIndex(index)
      }
      setCurrentStudent({ ...students[index] })
    }
    catch (e) {
      console.log(e.message)
    }
  }


  return (
    <Stack
      sx={{
        padding: 2,
        width: 300,
        display: 'flex',
        justifyContent: 'space-between'
      }}
    >
      <List>
        {
          students.map((student, i) => (
            <ListItemButton
              key={student.id}
              selected={selectedIndex === i}
              onClick={(event) => handleListItemClick(event, i)}
            >
              <ListItemText primary={student.name} />
              {
                i === selectedIndex
                  ? <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(student)}>
                    <DeleteIcon />
                  </IconButton>
                  : null
              }

            </ListItemButton>
          ))
        }
      </List>
      <Button variant="contained"
        onClick={() => {
          setCurrentStudent({})
          setSelectedIndex(undefined)
        }}
      >New Student</Button>
    </Stack>
  )
}
