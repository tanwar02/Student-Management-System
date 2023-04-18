import React, { useEffect, useState } from 'react'
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const GetStudents = () => {

  const [students, setStudents] = useState([]);
  const [logType, setLogType] = useState('');
  const [branch, setBranch] = useState('CSE');
  const [courses, setCourses] = useState([]);

  const navigate = useNavigate();

  const getCourses=()=>{
    fetch('http://localhost:7000/course')
    .then((res) => res.json())
    .then((res) => setCourses(res))
  }

  useEffect(()=>{
    getCourses();
  },[])

  async function getStudents() {
    return await fetch('http://localhost:7000/student')
    .then((res) => res.json())
    .then((res) =>setStudents(res))
    .then((res) => setLogType(localStorage.getItem('logType')))
  }

  useEffect(() => {
    getStudents();
  },[])

  const deleteStud = (id) => {
    fetch(`http://localhost:7000/student/`+id,
      {method : 'DELETE'}
      ).then((res) => res.json())
      .then((res) => {
          if(res){
            toast.success("Student Deleted Successfully");
            getStudents();
          }
          else{
            toast.error("Failed to Delete");
          }
      })
  }

    const updateStud = (row) => {
      const payload = {}
      payload.id = row.id;
      payload.name = row.name;
      payload.branch = row.branch;
      payload.course = row.course;
      payload.gender = row.gender;
      payload.mail = row.mail;
      if(logType === 'Admin'){
        navigate('/admin/update-student',{
          state: {payload}
        })
      }
      else if(logType === 'Faculty'){
        navigate('/update-student',{
          state: {payload}
        })
      }
    }

    const filterStud = () => {
      const filtData = students.filter((x) => x.branch === branch)
      setStudents(filtData);
    }

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
    }));
      
    const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
        border: 0,
    },
    }));

  return (
    <>
    <div className='d-flex justify-content-center' style={{marginTop: 80}}>
      <h5 className='fw-bold m-2'>Filter By Branch</h5>
      <select className="m-2" style={{width: 150}} aria-label="Default select example" onChange={(event) => {
        getStudents()
        setBranch(event.target.value)
        }}>
        <option selected>Select Branch</option>
              {
              courses && courses.map((course, index) =>
              <option value={course.branch}>{course.branch}</option>
              )
              }
      </select>
      <Button className="m-2" variant="contained" color="success" size='small' onClick={filterStud}>Search</Button>
    </div>
    <div className='table' style={{width: 1000, marginTop: 40, marginLeft: 300}}>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Student ID</StyledTableCell>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell>Course</StyledTableCell>
            <StyledTableCell>Branch</StyledTableCell>
            <StyledTableCell>Gender</StyledTableCell>
            <StyledTableCell>Email</StyledTableCell>
            {logType !== 'Student' && <StyledTableCell>Update</StyledTableCell>}
            {logType !== 'Student' && <StyledTableCell>Delete</StyledTableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {
          students.map((row) => (
            <StyledTableRow key={row.id}>
              <StyledTableCell>{row.id}</StyledTableCell>
              <StyledTableCell>{row.name}</StyledTableCell>
              <StyledTableCell>{row.course}</StyledTableCell>
              <StyledTableCell>{row.branch}</StyledTableCell>
              <StyledTableCell>{row.gender}</StyledTableCell>
              <StyledTableCell>{row.mail}</StyledTableCell>
              {logType !== 'Student' && <StyledTableCell><Button variant="contained" color="primary" size='small' 
              onClick={()=>updateStud(row)}>Update</Button></StyledTableCell>}
              {logType !== 'Student' && <StyledTableCell><Button variant="contained" color="error" size="small" startIcon={<DeleteIcon />}
              onClick={()=>deleteStud(row.id)}>Delete</Button></StyledTableCell>}
            </StyledTableRow>))
          }
        </TableBody>
      </Table>
    </TableContainer>
    <ToastContainer />
    </div>
    </>
  )
}

export default GetStudents