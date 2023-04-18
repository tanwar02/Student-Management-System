import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/AddStudent.css";
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import GetCourses from "./GetCourses";

const AddCourse = () => {

  const navigate = useNavigate();

  const [branch, setBranch] = useState();
  const [hod, setHod] = useState();
  const [seats, setSeats] = useState();

  const addCourse = () => {

    const checkSeats = (str) => {
        for(var i = 0; i< str.length; i++){
          if(str.charCodeAt(i) >= 48 && str.charCodeAt(i) <= 56){
            ;
          }
          else{
            return false;
          }
        }
        return true;
    }

    if(!branch || !hod || !seats){
      toast.error("Incomplete Course Details.");
      return;
    }
    
    if(!checkSeats(seats)){
      toast.error("Seats must be a valid Positive Number.")
      return
    }

    const payload ={};
    payload.branch = branch;
    payload.hod = hod;
    payload.totalSeats = seats;

    fetch("http://localhost:7000/course",
      {method : 'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify(payload)}
      ).then((res) => res.json())
      .then((res) => {
          if(res){
            toast.success("Course Added Successfully");
            GetCourses()
          }
          else{
            toast.error("Course already exists");
            return;
          }
      }).catch(() => navigate("/admin/get-courses"))
  }

  return (
    <div class="student_card" style={{height : 500}}>
      <div class="container">
        <h2 className="heading" style={{marginRight: 220}}>Add Course</h2>
      </div>
      <FormControl>
        <div className="form_fields">
          <label className="field_label" style={{marginRight: 60}}>Branch</label>
          <TextField id="outlined-basic" label="Enter Branch Name" variant="outlined" onChange={(event)=>setBranch(event.target.value)}/>
        </div>
        <div className="form_fields">
          <label className="field_label" style={{marginRight: 70}}>HOD</label>
          <TextField id="outlined-basic" label="Enter HOD" variant="outlined" onChange={(event)=>setHod(event.target.value)}/>
        </div>
        <div className="form_fields">
          <label className="field_label">Total Seats</label>
          <TextField id="outlined-basic" label="Enter total seats" variant="outlined" onChange={(event)=>setSeats(event.target.value)}/>
        </div>
        <div className="form_fields">
          <button class="btn btn-success add_btn" onClick={addCourse}>Add</button>
        </div>
      </FormControl>
      <ToastContainer />
    </div>
  );
};

export default AddCourse;












// import React, { useState } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "../css/AddStudent.css";
// import TextField from '@mui/material/TextField';
// import FormControl from '@mui/material/FormControl';
// import { toast, ToastContainer } from "react-toastify";
// import { useNavigate } from "react-router-dom";

// const AddCourse = () => {

//   const navigate = useNavigate();

//   const [name, setName] = useState();
//   const [hod, setHod] = useState();
//   const [seats, setSeats] = useState();
//   const [filled, setFilled] = useState();

//   const addCourse = () => {

//     if(!name || !hod || !seats || !filled){
//       toast.error("Incomplete Course Details");
//       return;
//     }

//     if(seats < 0 || filled < 0){
//       toast.error("Seats can not be negative.")
//       return;
//     }

//     if(filled > seats){
//       toast.error("Filled Seats can not be gretaer than total seats.")
//       return;
//     }

//     const payload ={};
//     payload.branch = name;
//     payload.hod = hod;
//     payload.totalSeats = seats;
//     payload.filledSeats = filled;

//     fetch("http://localhost:7000/course",
//       {method : 'POST',
//       headers:{'Content-Type':'application/json'},
//       body:JSON.stringify(payload)}
//       ).then((res) => res.json())
//       .then((res) => {
//           if(res){
//             toast.success("Course Added Successfully");
//           }
//           else{
//             toast.error("Course already exists");
//             return;
//           }
//       }).catch(() => navigate("/admin/get-courses"))
//   }

//   return (
//     <div class="student_card" style={{height : 500}}>
//       <div class="container">
//         <h2 className="heading" style={{marginRight: 220}}>Add Course</h2>
//       </div>
//       <FormControl>
//         <div className="form_fields">
//           <label className="field_label" style={{marginRight: 60}}>Branch</label>
//           <TextField id="outlined-basic" label="Enter Branch Name" variant="outlined" onChange={(event)=>setName(event.target.value)}/>
//         </div>
//         <div className="form_fields">
//           <label className="field_label" style={{marginRight: 70}}>HOD</label>
//           <TextField id="outlined-basic" label="Enter HOD" variant="outlined" onChange={(event)=>setHod(event.target.value)}/>
//         </div>
//         <div className="form_fields">
//           <label className="field_label">Total Seats</label>
//           <TextField id="outlined-basic" label="Enter total seats" variant="outlined" onChange={(event)=>setSeats(event.target.value)}/>
//         </div>
//         <div className="form_fields">
//           <label className="field_label">Filled Seats</label>
//           <TextField id="outlined-basic" label="Enter filled seats" variant="outlined" onChange={(event)=>setFilled(event.target.value)}/>
//         </div>
//         <div className="form_fields">
//           <button class="btn btn-success add_btn" onClick={addCourse}>Add</button>
//         </div>
//       </FormControl>
//       <ToastContainer />
//     </div>
//   );
// };

// export default AddCourse;
