import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  List,
  ListItem,
  Divider,
  Menu,
  MenuItem,
} from "@mui/joy";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../components/Logout";

ChartJS.register(ArcElement, Tooltip, Legend);

export const MainParticipantPage = () => {
  const navigate = useNavigate();

  // helpAnchorEl state
  const [helpAnchorEl, setHelpAnchorEl] = useState<null | HTMLElement>(null);

  // Create a ref for the menu container
  const menuRef = useRef<HTMLDivElement>(null);

  // Attach a global click listener to close the menu if user clicks outside
  useEffect(() => {
    function handleDocumentClick(e: MouseEvent) {
      // If the menu is open and the click target is not inside the menu
      if (
        helpAnchorEl &&
        menuRef.current &&
        !menuRef.current.contains(e.target as Node)
      ) {
        setHelpAnchorEl(null);
      }
    }

    document.addEventListener("mousedown", handleDocumentClick);
    return () => {
      document.removeEventListener("mousedown", handleDocumentClick);
    };
  }, [helpAnchorEl]);

  const handleHelpClick = (event: React.MouseEvent<HTMLElement>) => {
    setHelpAnchorEl(event.currentTarget);
  };

  const handleHelpClose = () => {
    setHelpAnchorEl(null);
  };

  const pieData = {
    labels: [
      "In Progress",
      "Completed — ECON",
      "Completed — PSYC",
      "Completed — SOC",
    ],
    datasets: [
      {
        data: [25, 25, 25, 25],
        backgroundColor: ["#333333", "#E73336", "#FFC627", "#6CB2E2"],
        borderColor: "#fff",
        borderWidth: 2,
      },
    ],
  };

  

  return (
    <Box sx={{ width: '100vw', height: '100vh', background: '#EFF2F9', display: 'flex', flexDirection: 'column' }}>
      {/* Horizontal Menu Bar. Feature-complete as currently specified */}
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


            <Typography
              className="menu-item"
              component="span"
              onClick={handleHelpClick}
              sx={{ cursor: 'pointer' }}
            >
              Help
            </Typography>
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

      {/* Main Content */}
      <Box sx={{ display: "flex", gap: 4, padding: 4, flex: 1 }}>
        {/* Left Section: Open Studies */}
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 4 }}>
          <Card
            variant="outlined"
            sx={{
              padding: 2,
              borderRadius: "10px",
              boxShadow: "0px 2px 4px rgba(51, 51, 51, 0.25)",
              marginTop: 0,
              minWidth: "250px",
              minHeight: "70vh",
            }}
          >
            <List>
              <ListItem
                sx={{
                  paddingY: 0.5,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Box>
                  <Typography
                    sx={{
                      fontSize: "36px",
                      fontWeight: "bold",
                      textAlign: "center",
                    }}
                  >
                    Open Studies
                  </Typography>
                </Box>
              </ListItem>
              <ListItem sx={{ paddingY: 0.5 }}>
                <Box>
                  <Typography>Memory and Cognition</Typography>
                  <Typography>
                    This study will be used for the Memory and Cognition course
                    offered
                  </Typography>
                </Box>
              </ListItem>
              <Divider />
              <ListItem sx={{ paddingY: 0.5 }}>
                <Box>
                  <Typography>Social Behavior Analysis</Typography>
                  <Typography>
                    This study will be used for the Social Behavior Analysis
                    course offered
                  </Typography>
                </Box>
              </ListItem>
              <Divider />
              <ListItem sx={{ paddingY: 0.5 }}>
                <Box>
                  <Typography>Market Research Analysis</Typography>
                  <Typography>
                    This study will be used for the Market Research Analysis
                    course offered
                  </Typography>
                </Box>
              </ListItem>
              <Divider />
            </List>
            <Box sx={{ display: "flex", justifyContent: "center", mb: 1 }}>
              <Link
                to="/main_participant_page/studies"
                style={{ textDecoration: "none" }}
              >
                <Button className="body-button">See All Studies</Button>
              </Link>
            </Box>
          </Card>
        </Box>

        {/* Right Section: Upcoming Appointments */}
        <Box
          sx={{ flex: 0.75, display: "flex", flexDirection: "column", gap: 4 }}
        >
          {/* Status Section with Pie Chart */}
          <Card
            variant="outlined"
            sx={{
              padding: 2,
              borderRadius: "10px",
              boxShadow: "0px 2px 4px rgba(51, 51, 51, 0.25)",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                height: "100%",
                gap: "20px",
                minWidth: "350px",
              }}
            >
              <Box
                sx={{
                  width: "10vw",
                  height: "10vw",
                  padding: 1,
                  minWidth: "100px",
                  minHeight: "100px",
                }}
              >
                <Pie
                  data={pieData}
                  options={{ plugins: { legend: { display: false } } }}
                />
              </Box>
              <Box
                sx={{
                  width: "50%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  paddingLeft: 2,
                }}
              >
                {pieData.labels.map((label, index) => (
                  <Typography
                    key={index}
                    sx={{
                      fontSize: "18px",
                      marginBottom: 1,
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Box
                      sx={{
                        width: 12,
                        height: 12,
                        backgroundColor:
                          pieData.datasets[0].backgroundColor[index],
                        marginRight: 1,
                      }}
                    />
                    {label}
                  </Typography>
                ))}
              </Box>
            </Box>
          </Card>

          {/* Upcoming Appointments Section */}
          <Card
            variant="outlined"
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              padding: 3,
              borderRadius: "10px",
              boxShadow: "0px 2px 4px rgba(51, 51, 51, 0.25)",
              overflow: "auto",
            }}
          >
            <Typography sx={{ fontWeight: "bold", fontSize: "24px" }}>
              Upcoming Appointments
            </Typography>
            <List>
              <Divider sx={{ margin: 0 }} />
              <ListItem
                sx={{
                  display: "flex",
                  gap: 2,
                  alignItems: "center",
                  padding: 0,
                  marginTop: 0,
                }}
              >
                <Box sx={{ textAlign: "center", minWidth: "50px" }}>
                  <Typography
                    sx={{ fontWeight: "bold", fontSize: "24px", color: "#333" }}
                  >
                    Nov
                  </Typography>
                  <Typography
                    sx={{ fontWeight: "bold", fontSize: "36px", color: "#333" }}
                  >
                    02
                  </Typography>
                </Box>
                <Box>
                  <Typography sx={{ fontSize: "16px", fontWeight: "500" }}>
                    With Researcher and Researcher
                  </Typography>
                  <Typography sx={{ fontSize: "14px", color: "#666" }}>
                    14:00-15:30
                  </Typography>
                  <Typography sx={{ fontSize: "14px", color: "#666" }}>
                    Maxey 201
                  </Typography>
                </Box>
              </ListItem>
              <Divider sx={{ marginY: 0 }} />
              <ListItem
                sx={{
                  display: "flex",
                  gap: 2,
                  alignItems: "center",
                  padding: 0,
                }}
              >
                <Box sx={{ textAlign: "center", minWidth: "50px" }}>
                  <Typography
                    sx={{ fontWeight: "bold", fontSize: "24px", color: "#333" }}
                  >
                    Nov
                  </Typography>
                  <Typography
                    sx={{ fontWeight: "bold", fontSize: "36px", color: "#333" }}
                  >
                    17
                  </Typography>
                </Box>
                <Box>
                  <Typography sx={{ fontSize: "16px", fontWeight: "500" }}>
                    With Researcher and Researcher
                  </Typography>
                  <Typography sx={{ fontSize: "14px", color: "#666" }}>
                    09:00-10:00
                  </Typography>
                  <Typography sx={{ fontSize: "14px", color: "#666" }}>
                    Olin 307
                  </Typography>
                </Box>
              </ListItem>
              <Divider sx={{ marginY: 0 }} />
            </List>
            <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
              <Link
                to="/main_participant_page/studies"
                style={{ textDecoration: "none" }}
              >
                <Button className="body-button">Open Studies</Button>
              </Link>
              <Link
                to="/main_participant_page/calendar"
                style={{ textDecoration: "none" }}
              >
                <Button className="body-button">My Calendar</Button>
              </Link>
            </Box>
          </Card>
        </Box>
      </Box>

      {/* 
        Wrap the Menu in a <div ref={menuRef}> 
        so we can detect outside clicks 
      */}
      <div ref={menuRef}>
        <Menu
          anchorEl={helpAnchorEl}
          open={Boolean(helpAnchorEl)}
          onClose={handleHelpClose}
        >
          <MenuItem onClick={handleHelpClose}>
            <Typography level="body-md">
              <strong>Q:</strong>  Where do I sign up?<br />
              <strong>A:</strong>  Go to Studies - See More - Sign up.
            </Typography>
          </MenuItem>
          <MenuItem onClick={handleHelpClose}>
            <Typography level="body-md">
              <strong>Q:</strong> How do I see my appointments?<br />
              <strong>A:</strong> Check the “Calendar” page for your schedule!
            </Typography>
          </MenuItem>
          <MenuItem onClick={handleHelpClose}>
            <Typography level="body-md">
              <strong>Q:</strong> How do I change my profile info?
              <br />
              <strong>A:</strong> Visit your “Profile” page to edit personal
              details.
            </Typography>
          </MenuItem>
        </Menu>
      </div>
    </Box>
  );
};
