import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';
import Input from './Input'
import Grades from './Grades'

function App4() {

  const [data, setData] = useState(null)
  const [searchStr, setsearchStr] = useState('')
  
   const [clickedcard, setclickedcard] = useState([])
  // const [clickedcard, setclickedcard] = useState("")
 //  const [buttonState, setbuttonState] = useState(false);

  console.log(clickedcard, 'clickedcard')

  useEffect(() => {
    const url = `https://api.hatchways.io/assessment/students`
    axios
      .get(url)
      .then((response) => {
        console.log("RESPONSE BLOCK")
        response.data.students.map(i=> i.isExpanded=false);
        console.log(response.data.students);
        setData(response.data.students);
      })
      .catch((error) => {
        console.log("Error in api call: ", error);
      })
  }, [])

  function calculateAverage(grades) {
    return grades.reduce((accu, next)=> Number(accu) + Number(next)) / grades.length;
  }


  function toggleShowGrade(clickedId) {
    //console.log(clickedId)
    let copyClickedcard = [...data]
    //console.log(clickedcard)
    // let index = copyClickedcard.indexOf(clickedId)
       let index = copyClickedcard.findIndex((i) => {
            return i.id === clickedId
           
       })
       console.log("index of selected student", index);
       copyClickedcard[index].isExpanded = !(copyClickedcard[index].isExpanded);
       setclickedcard(copyClickedcard)

    }

  function isButtonExpanded(clickedId) {
    return ``
  }

  function renderData() {
    return (
      data
      .filter((item) => {
        let concat = `${item.firstName.toLowerCase()} ${item.lastName.toLowerCase()}`
        return concat.includes(searchStr.toLowerCase())
      })
      .map((i) => {
        let studentAvg = calculateAverage(i.grades)
        return (
          <div className='student-data-container'>
            <div> 
              <button onClick={()=>toggleShowGrade(i.id)} className="togglebutton"> - {isButtonExpanded()} </button>
              {/* <button onClick={()=>handleClick(i.id)}> ++ </button> */}

              <img src={i.pic} width="150px" height="150px" alt=""></img>
            </div>
            
            {i.isExpanded ? <Grades 
            grades = {i.grades}
            /> : null  
            } 
          
            <div className="studentDetail">
              <h1>{i.firstName.toUpperCase()} {i.lastName.toUpperCase()}</h1>
              <p>Email: {i.email}</p>
              <p>Company: {i.company}</p>
              <p>Skill: {i.skill}</p>
              <p>Average: {studentAvg}%</p>
            </div>
          </div>        )
      })
    )
  }

  return (
    <div>
      <Input searchStr={searchStr} setsearchStr={setsearchStr}/>
      {data? renderData(): "Loading..."}
    </div>
  );
}

export default App4;
