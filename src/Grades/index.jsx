
function Grades ({grades}) {

    return (
        <div> 
        {grades.map((item,idx) =>{ 
            return <p> Test {idx+1}: {item} </p>

        })}
        </div>
        
    )
}

export default Grades;