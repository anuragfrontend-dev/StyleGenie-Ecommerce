import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import "./ProfilePage.css";

export function ProfilePage() {
  const [user, setUser] = useState(null);
  const [pic, setPic] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({ name: "", email: "" });
  const navigate=useNavigate();

  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (loggedUser) {
      setUser(loggedUser);
      setForm({ name: loggedUser.name || "", email: loggedUser.email });
      setPic(loggedUser.profilePic || "");
    }
  }, []);

  const saveToStorage = (updatedUser) => {
    localStorage.setItem("loggedInUser", JSON.stringify(updatedUser));
    window.dispatchEvent(new Event("userUpdated"));
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const newUsers = users.map(u => u.email === user.email? updatedUser : u);
    localStorage.setItem("users", JSON.stringify(newUsers));
    setUser(updatedUser);
  };

  const handleLogout=()=>{
    localStorage.removeItem('loggedInUser');
    window.dispatchEvent(new Event("userUpdated"));
    navigate('/Login',{replace:true});
  }

  const handlePicChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setPic(reader.result);
      saveToStorage({...user, profilePic: reader.result });
    };
    reader.readAsDataURL(file);
  };

  const handleRemovePic = () => {
    setPic("");
    const { profilePic,...rest } = user;
    saveToStorage(rest);
  };

  const handleSaveDetails = () => {
    saveToStorage({...user, name: form.name, email: form.email });
    setEditMode(false);
  };

  if (!user) return null;

  return (
    <div className="profile-wrapper">
      <Header />
      <div className="profile-card">

        <div className="pic-container">
          <img
            className="profile-img"
            src={pic ||'user.png'}
            alt="profile"
            onError={(e)=>e.target.src='/user.png'}
          />
          <label className="pic-add-btn">
            +
            <input type="file" accept="image/*" hidden onChange={handlePicChange} />
          </label>
        </div>

        {pic && <button className="remove-btn" onClick={handleRemovePic}>Remove photo</button>}

        {!editMode? (
          <>
            <h2 className="profile-name">{user.name}</h2>
            <p className="profile-email">{user.email}</p>

            <div className="info-box">
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Username:</strong> {`${user.name.replaceAll(' ','').toLowerCase()+user.name.length}`}</p>
            </div>

            <button className="primary-btn" onClick={() => setEditMode(true)}>Edit Profile</button>
            <button className="primary-btn logout-btn" onClick={handleLogout}>Log out</button>
          </>
        ) : (
          <>
            <input className="profile-input" value={form.name} onChange={(e) => setForm({...form, name: e.target.value })} placeholder="Name" />
            <input className="profile-input" value={form.email} onChange={(e) => setForm({...form, email: e.target.value })} placeholder="Email" />
            <div className="btn-row">
              <button className="secondary-btn" onClick={() => setEditMode(false)}>Cancel</button>
              <button className="primary-btn" onClick={handleSaveDetails}>Save</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}