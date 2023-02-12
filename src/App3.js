import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';
import Input from './Input'
import Grades from './Grades'

function App3() {

  const [data, setData] = useState(null)
  const [searchStr, setsearchStr] = useState('')
  
  const [clickedcard, setclickedcard] = useState([])

  // const [clickedcard, setclickedcard] = useState("")
//   const [buttonState, setbuttonState] = useState(false);

  console.log(clickedcard, 'clickedcard')

  useEffect(() => {
    const url = `https://api.hatchways.io/assessment/students`
    axios
      .get(url)
      .then((response) => {
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

    // while(clickedcard.length <=2){
    let maximumToggleView = 3;
    let copyClickedcard = [...clickedcard]

    if(copyClickedcard.includes(clickedId)) {

       const index = copyClickedcard.indexOf(clickedId)
       copyClickedcard.splice(index, 1)
       return setclickedcard(copyClickedcard)

        }
    else if (copyClickedcard.length>=maximumToggleView) {
        copyClickedcard.splice(0,3)
        copyClickedcard.push(clickedId)
        setclickedcard(copyClickedcard)
        }
    else { 
        copyClickedcard.push(clickedId)
        setclickedcard(copyClickedcard)
        }  
    // { 
        // if ((copyClickedcard.length) <= 3){
        //     copyClickedcard.push(clickedId) 
        //     // setclickedcard(copyClickedcard)

        // }
       
 }
// }

  //   function toggleShowGrade(clickedId) {
        
  //     //clickedcard is set initial state empty - 
  //     //by default all toggle will be closed for user
  //     if(clickedcard === clickedId) {
  //       return setclickedcard("")
  //   }
  //   else {
  //      setclickedcard(clickedId) 
  //   }
  //   // setclickedcard(clickedcard) //where if clicked id is where user has already clicked, 
  //   //

  // }


  // function handleClick() {

  //   setbuttonState(buttonState => !buttonState);

  // }


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
            {/* {i.id === clickedcard ? <Grades 
            grades = {i.grades}
            /> : null  
            }  */}
        
            {clickedcard.includes(i.id) ? <Grades 
            grades = {i.grades}
            /> : null  
            } 
      
            <div className="studentdetail">
              <h1>{i.firstName.toUpperCase()} {i.lastName.toUpperCase()}</h1>
              <p>Email: {i.email}</p>
              <p>Company: {i.company}</p>
              <p>Skill: {i.skill}</p>
              <p>Average: {studentAvg}%</p>
            </div>
          </div>
        )
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

export default App3;
