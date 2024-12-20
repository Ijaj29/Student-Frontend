import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

function EditStud() {
  const [FormInfo, setFormInfo] = useState({
    studName: "",
    email: "",
    mobile: "",
    company: "",
  });

  const navigate = useNavigate();
  const { id } = useParams();

  const FRONTEND_URL = "http://localhost:3000";
  const BACKEND_URL = "http://localhost:3050/";

  const [File, setFile] = useState("");

  const handleImg = (e) => {
    setFile(e.target.files[0]);
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3050/api/student/one/${id}`
      );
      setFormInfo(response.data);
      setFile(response.data.file);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleInput = (e) => {
    setFormInfo({
      ...FormInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("studName", FormInfo.studName);
    formData.append("email", FormInfo.email);
    formData.append("mobile", FormInfo.mobile);
    formData.append("company", FormInfo.company);
    formData.append("file", File);
    try {
      const response = await axios.put(
        `http://localhost:3050/api/student/${id}`,
        formData
      );
      window.alert("Edited Successfully");
      navigate("/studentList");
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="bg-image ">
      <div className="row justify-content-center">
        <div className="col-sm-6 mt-5 text-light border p-4">
          <form onSubmit={(e) => handleUpdate(e)}>
            <div className="text-white">
              <div className="mb-3">
                <label htmlFor="studName" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={FormInfo.studName}
                  onChange={handleInput}
                  id="studName"
                  name="studName"
                  placeholder="Enter Name"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  onChange={handleInput}
                  value={FormInfo.email}
                  id="email"
                  name="email"
                  placeholder="Enter Email"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="mobile" className="form-label">
                  Mobile Number
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="mobile"
                  onChange={handleInput}
                  value={FormInfo.mobile}
                  name="mobile"
                  placeholder="Enter Mobile No."
                />
              </div>
              <div className="mb-3">
                <label htmlFor="company" className="form-label">
                  Company
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="company"
                  onChange={handleInput}
                  value={FormInfo.company}
                  name="company"
                  placeholder="Enter Company Name"
                />
              </div>
              <div className="mb-3 col-sm-6">
                <img
                  src={
                    File
                      ? File.name
                        ? URL.createObjectURL(File)
                        : BACKEND_URL + File
                      : FRONTEND_URL + "/assets/noimage.png"
                  }
                  alt="profile"
                  width="150px"
                  height="150px"
                  className="mb-2"
                />
                <input
                  type="file"
                  className="form-control"
                  id="file"
                  onChange={handleImg}
                  name="file"
                />
              </div>
              <button className="btn btn-success" type="submit">
                Update
              </button>{" "}
              <button className="btn btn-warning" onClick={() => navigate("/")}>
                Cancel
              </button>{" "}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditStud;
