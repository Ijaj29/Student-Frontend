import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { CiEdit } from "react-icons/ci";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

function StudentList() {
  const [dataa, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const fetchData = async () => {
    try {
      const response = await axios.get("https://student-backend-c616.onrender.com/api/student");
      setData(response.data);
      setFilteredData(response.data); // Set filteredData initially
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const deleteData = async (id) => {
    try {
      await axios.delete(`https://student-backend-c616.onrender.com/api/student/${id}`);
      fetchData(); // Fetch data again after deletion
    } catch (error) {
      console.error("Error deleting data:", error);
    }
    setOpen(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const filteredStudents = dataa.filter((student) =>
      student.studName.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredData(filteredStudents);
  }, [searchQuery, dataa]);

  return (
    <div className="p-2">
      {/* <h4 className="text-center border-bottom pb-4 mt-4">Student List</h4> */}
      <div className="my-4 col-sm-6 container">
        <label htmlFor="search-product" className="form-label">
          Search Student:
        </label>
        <input
          type="text"
          className="form-control"
          onChange={(event) => setSearchQuery(event.target.value)}
          id="search-product"
          placeholder="Student Name..."
        />
      </div>
      <div className="mt-1 border-top">
        <table className="text-center table table-striped">
          <thead>
            <tr>
              <th scope="col">No</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Mobile</th>
              <th scope="col">College</th>
              <th scope="col">Profile</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredData &&
              filteredData.map((stud, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{stud.studName}</td>
                  <td>{stud.email}</td>
                  <td>{stud.mobile}</td>
                  <td>{stud.company}</td>
                  <td>
                    {stud.file && (
                      <img
                        src={`https://student-backend-c616.onrender.com/${stud.file}`}
                        width={"50px"}
                        height={"50px"}
                        style={{borderRadius: '50%'}}
                      />
                    )}
                  </td>
                  <td>
                    <IconButton
                      aria-label="edit"
                      style={{ padding: "2px" }}
                      size="large"
                    >
                      <CiEdit onClick={() => navigate(`/edit/${stud._id}`)} />
                    </IconButton>

                    <IconButton
                      aria-label="delete"
                      className="ms-2"
                      style={{ padding: "4px" }}
                      size="large"
                    >
                      <DeleteForeverIcon onClick={handleOpen} />
                      <Modal
                        aria-labelledby="transition-modal-title"
                        aria-describedby="transition-modal-description"
                        open={open}
                        onClose={handleClose}
                        closeAfterTransition
                        slots={{ backdrop: Backdrop }}
                        slotProps={{
                          backdrop: {
                            timeout: 500,
                          },
                        }}
                      >
                        <Fade in={open}>
                          <Box sx={style}>
                            <Typography
                              id="transition-modal-title"
                              variant="h6"
                              component="h2"
                            >
                              Are you sure you want to delete?
                            </Typography>
                            <Typography
                              id="transition-modal-description"
                              sx={{ mt: 2 }}
                            >
                              <Button
                                variant="contained"
                                onClick={() => deleteData(stud._id)}
                              >
                                Yes
                              </Button>{" "}
                              <Button
                                variant="outlined"
                                color="error"
                                onClick={handleClose}
                              >
                                No
                              </Button>
                            </Typography>
                          </Box>
                        </Fade>
                      </Modal>
                    </IconButton>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default StudentList;
