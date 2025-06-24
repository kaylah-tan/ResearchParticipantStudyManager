import { Box, Typography, Button, Card } from '@mui/joy';
import { Link, useLocation, useNavigate} from 'react-router-dom';
import { logout } from '../components/Logout';
import { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';

export const ParticipantStudy = () => {
  const navigate = useNavigate();
  // We now read the 'study' object from the route state:
  const location = useLocation();
  const study = location.state?.study;

  // confirmation dialog
  const [confirmOpen, setConfirmOpen] = useState(false);
  const handleOpenConfirm = () => setConfirmOpen(true);
  const handleCloseConfirm = () => setConfirmOpen(false);
  const handleConfirmSignUp = () => {
    alert("You have successfully signed up for the study!");
    setConfirmOpen(false);
  };

  // If somehow the user navigated here without the "study" data, we show an error
  if (!study) {
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
            <Link
              to="/main_participant_page"
              style={{ textDecoration: "none" }}
            >
              <Button className="nav-button">Home</Button>
            </Link>
            <Link
              to="/main_participant_page/studies"
              style={{ textDecoration: "none" }}
            >
              <Button className="nav-button">Studies</Button>
            </Link>
            <Link
              to="/main_participant_page/calendar"
              style={{ textDecoration: "none" }}
            >
              <Button className="nav-button">Calendar</Button>
            </Link>
            <Link
              to="/main_participant_page/profile"
              style={{ textDecoration: "none" }}
            >
              <Button className="nav-button">Profile</Button>
            </Link>
          </Box>
        </Box>

        {/* Main Content */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "Montserrat",
          }}
        >
          <Typography>Study not found.</Typography>
        </Box>
      </Box>
    );
  }

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
            <Button className="nav-button">Home</Button>
          </Link>
          <Link
            to="/main_participant_page/studies"
            style={{ textDecoration: "none" }}
          >
            <Button className="nav-button">Studies</Button>
          </Link>
          <Link
            to="/main_participant_page/calendar"
            style={{ textDecoration: "none" }}
          >
            <Button className="nav-button">Calendar</Button>
          </Link>
          <Link
            to="/main_participant_page/profile"
            style={{ textDecoration: "none" }}
          >
            <Button className="nav-button">Profile</Button>
          </Link>
        </Box>
      </Box>

      {/* Study */}
      <Box sx={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: 4, fontFamily: "Montserrat", }}>
        <Card variant="outlined" sx={{ padding: 4, maxWidth: "600px", height: "auto", textAlign: "center" }}>
          <Typography level="h4" sx={{ fontFamily: "Lora", textAlign: "center", }}>
            {study.title}
          </Typography>

          <Typography sx={{ marginTop: 1 }}>
            <strong>Description:</strong> {study.description}
          </Typography>
          <Typography sx={{ marginTop: 1 }}>
            <strong>Department:</strong> {study.department}
          </Typography>
          <Typography sx={{ marginTop: 1 }}>
            <strong>Length:</strong> {study.length}
          </Typography>
          <Typography sx={{ marginTop: 1 }}>
            <strong>Location:</strong> {study.location}
          </Typography>
          <Typography sx={{ marginTop: 1 }}>
            <strong>Incentive:</strong> {study.incentive}
          </Typography>
          <Typography sx={{ marginTop: 1 }}>
            <strong>Researchers:</strong> {study.researchers.join(", ")}
          </Typography>

          {study.link && study.link.trim() !== "" && (
            <Typography sx={{ marginTop: 1 }}>
              <strong>Study Link:</strong>{" "}
              <a href={study.link} target="_blank" rel="noopener noreferrer">
                {study.link}
              </a>
            </Typography>
          )}

          {study.timeslots && study.timeslots.length > 0 && (
            <Box sx={{ marginTop: 1 }}>
              <Typography>
                <strong>Timeslots:</strong>
              </Typography>
              <ul>
                {study.timeslots.map((slot: string, index: number) => (
                  <li key={index}>{slot}</li>
                ))}
              </ul>
            </Box>
          )}

          {/* Sign Up Button */}
          <Button className="body-button" sx={{ alignSelf: "center", marginTop: "10px", }} onClick={handleOpenConfirm}>
            Sign Up!
          </Button>

          <Link to="/main_participant_page/studies" style={{ textDecoration: "none", display: "center", }}>
            <Button className="body-button">Back to Studies</Button>
          </Link>
        </Card>
      </Box>

      {/* Confirmation Dialog */}
      <Dialog open={confirmOpen} onClose={handleCloseConfirm}>
        <DialogTitle>Confirm Sign Up</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to sign up for the study "{study.title}"?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirmSignUp}>Confirm</Button>
          <Button onClick={handleCloseConfirm}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
