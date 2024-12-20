import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const [formInfo, setFormInfo] = useState({
    studName: "",
    email: "",
    mobile: "",
    company: "",
  });
  const [errors, setError] = useState(null);
  const FRONTEND_URL = "http://localhost:3000";
  const BACKEND_URL = "https://student-backend-c616.onrender.com/";
  const navigate = useNavigate();

  const [File, setFile] = useState("");
  console.log('File :', File);

  const handleImg = (e) => {
    setFile(e.target.files[0]);
  };

  const handleInput = (e) => {
    setFormInfo({
      ...formInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("studName", formInfo.studName);
    formData.append("email", formInfo.email);
    formData.append("mobile", formInfo.mobile);
    formData.append("company", formInfo.company);
    formData.append("file", File);
    try {
      const response = await axios.post(
        "https://student-backend-c616.onrender.com/api/student",
        formData
      );
      if (response.data.error) {
        setError(response.data.error);
      } else {
        window.alert(response.data.status);
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container-fluid mb-5">
      <div className="row justify-content-center">
        <h4 className="text-center mt-2">Registration Form</h4>
        <div className="col-sm-6 shadow p-4 border mt-4">
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className="row">
              <div className="mb-3 col-sm-6">
                <label htmlFor="studName" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={formInfo.studName}
                  onChange={handleInput}
                  id="studName"
                  required
                  name="studName"
                  placeholder="Enter Name"
                />
              </div>
              <div className="mb-3 col-sm-6">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  onChange={handleInput}
                  value={formInfo.email}
                  required
                  id="email"
                  name="email"
                  placeholder="Enter Email"
                />
              </div>
              <div className="mb-3 col-sm-6">
                <label htmlFor="mobile" className="form-label">
                  Mobile Number
                </label>
                <input
                  type="number"
                  className="form-control"
                  required
                  id="mobile"
                  onChange={handleInput}
                  name="mobile"
                  value={formInfo.mobile}
                  placeholder="Enter Mobile No."
                />
              </div>
              <div className="mb-3 col-sm-6">
                <label htmlFor="company" className="form-label">
                  Company
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="company"
                  required
                  onChange={handleInput}
                  value={formInfo.company}
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
                  required
                  onChange={handleImg}
                  name="file"
                />
              </div>
              <div className="col-sm-6"></div>
              <button className="btn btn-success col-sm-6" type="submit">
                Register
              </button>
              <button
                className="btn btn-warning col-sm-6"
                onClick={() => navigate("/")}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
