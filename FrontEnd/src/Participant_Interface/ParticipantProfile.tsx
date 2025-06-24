import { useState } from 'react';
import * as React from 'react';
import { Box, Typography, Dialog, DialogTitle, DialogContent, DialogActions, TextField, ToggleButton} from '@mui/material';
import { Button } from '@mui/joy';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../components/Logout';
import CheckIcon from '@mui/icons-material/Check';
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import logo from './wc-stacked-vertical-blue-rgb-900px-w-72ppi.png'
import './styles.css'


export const ParticipantProfile = () => {

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const navigate = useNavigate();

  const deleteAccount = () => {
    handleCloseDialog();
    navigate("/");
  };

  const [isEditing, setIsEditing] = useState(false);
  const [firstName, setFirstName] = useState("John");
  const [lastName, setLastName] = useState("Doe");
  const [email, setEmail] = useState("doej@whitman.edu");
  const [gradDate, setGradDate] = React.useState<Dayjs | null>(
    dayjs("2025-05-25"),
  );
  const [birthday, setBirthday] = React.useState<Dayjs | null>(
    dayjs("2000-01-01"),
  );
  const [receiveStudyEmail, setReceiveStudyEmail] = React.useState(true);
  const [receiveReminderEmail, setReceiveReminderEmail] = React.useState(true);

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        background: "#EFF2F9",
        position: "relative",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Horizontal Menu Bar */}
      <Box className="horizontal-menu-bar">
        <Box className="logo-section">
          <img
            src="https://www.whitman.edu/images/global/logos/Whitman-College-White-no-icon.svg"
            alt="College Logo"
          />
          <Box className="text-section">
            <Link
              to="/main_participant_page/profile"
              style={{ textDecoration: "none" }}
            >
              <Typography className="menu-item">Name</Typography>
            </Link>
            <Typography className="menu-item" onClick={() => logout(navigate)}>Logout</Typography>
            <a href="#" style={{ textDecoration: 'none', color: 'inherit' }}>
              <Typography className="menu-item" component="span">Help</Typography>
            </a>
          </Box>
        </Box>

        <Box className="navigation-bar">
          <Link to="/main_participant_page" style={{ textDecoration: "none" }}>
            <Button
              className={`nav-button ${location.pathname === "/main_participant_page" ? "active" : ""}`}
            >
              Home
            </Button>
          </Link>
          <Link
            to="/main_participant_page/studies"
            style={{ textDecoration: "none" }}
          >
            <Button
              className={`nav-button ${location.pathname === "/main_participant_page/studies" ? "active" : ""}`}
            >
              Studies
            </Button>
          </Link>
          <Link
            to="/main_participant_page/calendar"
            style={{ textDecoration: "none" }}
          >
            <Button
              className={`nav-button ${location.pathname === "/main_participant_page/calendar" ? "active" : ""}`}
            >
              Calendar
            </Button>
          </Link>
          <Link
            to="/main_participant_page/profile"
            style={{ textDecoration: "none" }}
          >
            <Button
              className={`nav-button ${location.pathname === "/main_participant_page/profile" ? "active" : ""}`}
            >
              Profile
            </Button>
          </Link>
        </Box>
      </Box>

      {/* Dialog Box */}
      <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
        <DialogTitle
          sx={{ font: "Montserrat", fontWeight: "bold", fontSize: "20px" }}
        >
          Are you sure?
        </DialogTitle>
        <DialogContent>
          <Typography sx={{ font: "Montserrat", fontSize: "14px" }}>
            Deleting your account will delete all information associated with
            it. This includes study completion and associated credits. Are you
            sure you want to delete your account?
          </Typography>
        </DialogContent>
        <DialogActions>
          {/* Confirm Delete Account Button */}
          <Button
            onClick={deleteAccount}
            variant="soft"
            sx={{
              backgroundColor: "#D30000",
              color: "#FFFFFF",
              fontSize: "14px",
              textTransform: "none",
              "&:hover": {
                backgroundColor: "#B20000",
              },
            }}
          >
            Yes, Delete Account
          </Button>

          {/* "Close" Button */}
          <Button
            onClick={handleCloseDialog}
            variant="soft"
            sx={{ fontSize: "14px", textTransform: "none" }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Profile Content */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          width: "100%",
          padding: "30px 0px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            height: "auto",
            width: "auto",
            maxWidth: "600px",
            background: "#FFFFFF",
            borderRadius: "10px",
            boxShadow: "0px 2px 4px rgba(51, 51, 51, 0.4)",
            padding: "25px",
            flexWrap: "wrap",
            marginLeft: 18,
          }}
        >
          {/* Participant Profile */}
          <Box
            sx={{ flex: 1, mr: 4, display: "flex", flexDirection: "column" }}
          >
            <Typography variant="h5" sx={{ fontWeight: "bold", mb: 3, mt: 1 }}>
              Participant Profile
            </Typography>

            {/* First and Last Name */}
            <div className="textFieldContainer">
              <TextField
                label="First Name"
                variant="outlined"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                disabled={!isEditing}
                className={`textField ${isEditing ? "editing" : ""}`}
                sx={{ width: "200px" }}
              />
              <TextField
                label="Last Name"
                variant="outlined"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                disabled={!isEditing}
                className={`textField ${isEditing ? "editing" : ""}`}
                sx={{ width: "200px" }}
              />
            </div>

            {/* Email */}
            <div className="textFieldContainer">
              <TextField
                label="Email"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={!isEditing}
                className={`textField ${isEditing ? "editing" : ""}`}
                sx={{ mt: 3, mb: 3, width: "450px" }}
              />
            </div>

            <div className="textFieldContainer">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Birthdate"
                  value={birthday}
                  onChange={(newValue) => setBirthday(newValue)}
                  disabled={!isEditing}
                  className={`textField ${isEditing ? "editing" : ""}`}
                  sx={{ width: "200px" }}
                />
                <DatePicker
                  label="Graduation date"
                  value={gradDate}
                  onChange={(newValue) => setGradDate(newValue)}
                  disabled={!isEditing}
                  className={`textField ${isEditing ? "editing" : ""}`}
                  sx={{ width: "200px" }}
                />
              </LocalizationProvider>
            </div>

            <Typography sx={{ fontWeight: "bold", mb: 2, mt: 3 }}>
              Notification Settings
            </Typography>

            <Box display="flex" alignItems="center" gap={2} mb={2}>
              <ToggleButton
                value="check"
                selected={receiveStudyEmail}
                onChange={() =>
                  setReceiveStudyEmail((prevSelected) => !prevSelected)
                }
                disabled={!isEditing}
                className="custom-toggle"
              >
                {receiveStudyEmail && <CheckIcon />}
              </ToggleButton>
              <Typography variant="body2">
                Receive email notifications about open studies
              </Typography>
            </Box>

            <Box display="flex" alignItems="center" gap={2} mb={2}>
              <ToggleButton
                value="check"
                selected={receiveReminderEmail}
                onChange={() =>
                  setReceiveReminderEmail((prevSelected) => !prevSelected)
                }
                disabled={!isEditing}
                className="custom-toggle"
              >
                {receiveReminderEmail && <CheckIcon />}
              </ToggleButton>
              <Typography variant="body2">
                Receive email reminders for upcoming appointments
              </Typography>
            </Box>

            {/* Edit Button */}
            <Button
              onClick={toggleEdit}
              className="body-button"
              sx={{ width: "150px", ml: 20, mt: 3 }}
            >
              {isEditing ? "Save Changes" : "Edit Profile"}
            </Button>

            {/* Delete Account */}
            <Button
              variant="soft"
              onClick={handleOpenDialog}
              sx={{
                ml: 20,
                mt: 3,
                fontSize: "14px",
                width: "150px",
                height: "30px",
                backgroundColor: "transparent",
                color: "#D30000",
                "&:hover": {
                  backgroundColor: "#D30000",
                  color: "#FFFFFF",
                },
              }}
            >
              Delete Account
            </Button>
          </Box>
        </Box>
        {/* Image */}
        <Box
          sx={{
            position: "sticky",
            top: "auto",
            left: "250px",
            width: "350px",
            height: "350px",
            marginLeft: 31,
            marginTop: 15,
            minWidth: "350px",
          }}
        >
          <img
            src={logo}
            alt="Whitman College Logo"
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
          />
        </Box>
      </Box>
    </Box>
  );
};
