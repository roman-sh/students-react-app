import React, { useState } from 'react'
import List from './components/List'
import Details from './components/Details'


function App() {
  const [students, setStudents] = useState([])
  const [currentStudent, setCurrentStudent] = useState({})
  const [selectedIndex, setSelectedIndex] = useState(0)

  return (
    <div style={{ display: 'flex' }}>
      <List
        students={students}
        setStudents={setStudents}
        currentStudent={currentStudent}
        setCurrentStudent={setCurrentStudent}
        selectedIndex={selectedIndex}
        setSelectedIndex={setSelectedIndex}
      />
      <Details
        setStudents={setStudents}
        currentStudent={currentStudent}
        setCurrentStudent={setCurrentStudent}
        selectedIndex={selectedIndex}
        setSelectedIndex={setSelectedIndex}
      />
    </div>
  )
}

export default App
