import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/AddStudent.css";
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AddSutdent = () => {

  const navigate = useNavigate();

  const [name, setName] = useState();
  const [course, setCouse] = useState('B.Tech');
  const [branch, setBranch] = useState('Select Branch');
  const [gender, setGender] = useState();
  const [email, setEmail] = useState();
  const [courses, setCourses] = useState([]);

  const getCourses=()=>{
    fetch('http://localhost:7000/course')
    .then((res) => res.json())
    .then((res) => setCourses(res))
  }

  const addStud = () => {

    if(!name || !course || branch==="Select Branch" || !gender || !email){
      toast.error("Incomplete Student Details");
      return;
    }

    if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) === false){
      toast.error("Invalid Email ID");
      return;
    }

    const payload ={};
    payload.name = name;
    payload.course = course;
    payload.branch = branch;
    payload.gender = gender;
    payload.mail = email;
    fetch("http://localhost:7000/student",
      {method : 'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify(payload)}
      ).then((res) => {
          if(res.ok)
            toast.success("Student Added Successfully");
          else{
            res.text().then((text) => {
              toast.error(text);
            })
          }
      })
      //.then(() => navigate("/admin/get-students"))
  }

  useEffect(()=>{
    getCourses();
  },[])

  return (
    <div class="student_card">
      <div class="container">
        <h2 className="heading" style={{marginRight: 220}}>Add Student</h2>
      </div>
      <FormControl>
        <div className="form_fields">
          <label className="field_label">Name</label>
          <TextField id="outlined-basic" label="Enter name" variant="outlined" onChange={(event)=>setName(event.target.value)}/>
        </div>
        <div className="form_fields">
          <label className="field_label">Course</label>
          <TextField id="outlined-basic" label="Enter Course" variant="outlined" value={course}/>
        </div>
        <div className="form_fields d-flex">
          <div className="p-1"><label className="field_select">Branch</label></div>
          <div className="p-1"><select class="form-select" aria-label="Default select example"
          onChange={(event)=>setBranch(event.target.value)}
          style={{width: 220}}>
              <option selected>Select Branch</option>
              {
              courses && courses.map((course, index) =>
              <option value={course.branch}>{course.branch}</option>
              )
              }
          </select></div>
        </div>
        <div className="form_fields">
          <RadioGroup className="radio"
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group">
            <label className="field_label">Gender</label>
            <FormControlLabel value="male" control={<Radio onChange={(event)=>setGender(event.target.value)} />} label="Male" />
            <FormControlLabel value="female" control={<Radio onChange={(event)=>setGender(event.target.value)}/>} label="Female" />
          </RadioGroup>
        </div>
        <div className="form_fields">
          <label className="field_label">Email</label>
          <TextField type="email" id="outlined-basic" label="Enter Email" variant="outlined" onChange={(event)=>setEmail(event.target.value)}/>
        </div>
        <div className="form_fields">
          <button class="btn btn-success add_btn" onClick={addStud}>Add</button>
        </div>
      </FormControl>
      <ToastContainer />
    </div>
  );
};

export default AddSutdent;
