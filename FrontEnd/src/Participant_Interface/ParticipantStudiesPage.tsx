import { useState } from 'react';
import { Box, Typography, Button, Card, Checkbox, FormControl, FormLabel } from '@mui/joy';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, FormGroup, FormControlLabel } from '@mui/material';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { logout } from '../components/Logout';

export const ParticipantStudiesPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [availabilityFilters, setAvailabilityFilters] = useState({
    openStudies: false,
    openAndAvailable: false,
    pastStudies: false,
  });

  const [departmentFilters, setDepartmentFilters] = useState({
    psychology: false,
    sociology: false,
    economics: false,
    other: false,
  });

  const [formatFilters, setFormatFilters] = useState({
    inPerson: false,
    online: false,
    both: false,
  });

  const [incentiveFilters, setIncentiveFilters] = useState({
    none: false,
    money: false,
    giftCard: false,
  });

  // Handlers for changes
  const handleAvailabilityChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setAvailabilityFilters({
      ...availabilityFilters,
      [event.target.name]: event.target.checked,
    });
  };

  const handleDepartmentChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setDepartmentFilters({
      ...departmentFilters,
      [event.target.name]: event.target.checked,
    });
  };

  const handleFormatChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormatFilters({
      ...formatFilters,
      [event.target.name]: event.target.checked,
    });
  };

  const handleIncentiveChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setIncentiveFilters({
      ...incentiveFilters,
      [event.target.name]: event.target.checked,
    });
  };

  // Fake studies list
  const studies = [
    {
      id: 0,
      title: "Memory and Cognition",
      description: "A study on how we recall information under stress.",
      department: "Psychology",
      length: "45 mins",
      location: "Online",
      incentive: "$5",
      researchers: ["Dr. Jane Doe", "Dr. John Smith"],
      link: "https://example.com/survey",
      timeslots: [],
    },
    {
      id: 1,
      title: "Social Behavior Analysis",
      description: "Exploring how groups interact in unfamiliar situations.",
      department: "Sociology",
      length: "1 hour",
      location: "In-person",
      incentive: "Gift Card",
      researchers: ["Dr. Emily White", "Dr. Mark Green"],
      link: "",
      timeslots: ["9:00 AM - 10:00 AM", "1:00 PM - 2:00 PM"],
    },
    {
      id: 2,
      title: "Market Research Study",
      description: "Examining consumer behavior on campus.",
      department: "Economics",
      length: "30 mins",
      location: "Both",
      incentive: "None",
      researchers: ["Dr. Alice Brown"],
      link: "https://example.com/market-survey",
      timeslots: [],
    },
  ];

  // Filter logic
  const filteredStudies = studies.filter((study) => {
    // Department filter
    const departmentActive =
      departmentFilters.psychology ||
      departmentFilters.sociology ||
      departmentFilters.economics ||
      departmentFilters.other;
    let matchesDepartment = true;
    if (departmentActive) {
      matchesDepartment =
        (departmentFilters.psychology && study.department === "Psychology") ||
        (departmentFilters.sociology && study.department === "Sociology") ||
        (departmentFilters.economics && study.department === "Economics") ||
        (departmentFilters.other && study.department === "Other");
    }

    // Format filter
    const formatActive =
      formatFilters.inPerson || formatFilters.online || formatFilters.both;
    let matchesFormat = true;
    if (formatActive) {
      matchesFormat =
        (formatFilters.inPerson && study.location === "In-person") ||
        (formatFilters.online && study.location === "Online") ||
        (formatFilters.both && study.location === "Both");
    }

    // Incentive filter
    const incentiveActive =
      incentiveFilters.none ||
      incentiveFilters.money ||
      incentiveFilters.giftCard;
    let matchesIncentive = true;
    if (incentiveActive) {
      const isNone = study.incentive.toLowerCase() === "none";
      const isGiftCard = study.incentive.toLowerCase().includes("gift card");
      const isMoney = study.incentive.includes("$");
      matchesIncentive =
        (incentiveFilters.none && isNone) ||
        (incentiveFilters.giftCard && isGiftCard) ||
        (incentiveFilters.money && isMoney);
    }

    // (Optional) Availability filter, if your data has a 'status' field

    return matchesDepartment && matchesFormat && matchesIncentive;
  });

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
              <Typography
                className="menu-item"
                sx={{ fontFamily: "Montserrat" }}
              >
                Name
              </Typography>
            </Link>
            <Typography className="menu-item" onClick={() => logout(navigate)}>Logout</Typography>
            <a href="#" style={{ textDecoration: 'none', color: 'inherit' }}>
              <Typography className="menu-item" sx={{ fontFamily: 'Montserrat' }}>Help
              </Typography>
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

      {/* Main Content */}
      <Box className="content" sx={{ display: "flex", padding: 4, flex: 1 }}>
        {/* Filter Box */}
        <Box sx={{ flex: 1, paddingRight: 4 }}>
          <Card
            variant="outlined"
            sx={{ padding: 4, fontFamily: "Montserrat" }}
          >
            <Typography
              sx={{
                fontWeight: "bold",
                fontSize: "1.5rem",
                fontFamily: "Lora",
              }}
            >
              Filter by:
            </Typography>

            {/* Availability */}
            <FormControl component="fieldset" sx={{ marginTop: 2 }}>
              <FormLabel
                component="legend"
                sx={{
                  fontWeight: "bold",
                  fontSize: "1.25rem",
                  fontFamily: "Lora",
                }}
              >
                Availability
              </FormLabel>
              <FormGroup sx={{ marginLeft: 1 }}>
                <FormControlLabel
                  sx={{ alignItems: "center", marginLeft: 0 }}
                  control={
                    <Checkbox
                      checked={availabilityFilters.openStudies}
                      onChange={handleAvailabilityChange}
                      name="openStudies"
                    />
                  }
                  label="Open Studies"
                />
                <FormControlLabel
                  sx={{ alignItems: "center", marginLeft: 0 }}
                  control={
                    <Checkbox
                      checked={availabilityFilters.openAndAvailable}
                      onChange={handleAvailabilityChange}
                      name="openAndAvailable"
                    />
                  }
                  label="Open and Available"
                />
                <FormControlLabel
                  sx={{ alignItems: "center", marginLeft: 0 }}
                  control={
                    <Checkbox
                      checked={availabilityFilters.pastStudies}
                      onChange={handleAvailabilityChange}
                      name="pastStudies"
                    />
                  }
                  label="Past Studies"
                />
              </FormGroup>
            </FormControl>

            {/* Department */}
            <FormControl component="fieldset" sx={{ marginTop: 2 }}>
              <FormLabel
                component="legend"
                sx={{
                  fontWeight: "bold",
                  fontSize: "1.25rem",
                  fontFamily: "Lora",
                }}
              >
                Department
              </FormLabel>
              <FormGroup sx={{ marginLeft: 1 }}>
                <FormControlLabel
                  sx={{ alignItems: "center", marginLeft: 0 }}
                  control={
                    <Checkbox
                      checked={departmentFilters.psychology}
                      onChange={handleDepartmentChange}
                      name="psychology"
                    />
                  }
                  label="Psychology"
                />
                <FormControlLabel
                  sx={{ alignItems: "center", marginLeft: 0 }}
                  control={
                    <Checkbox
                      checked={departmentFilters.sociology}
                      onChange={handleDepartmentChange}
                      name="sociology"
                    />
                  }
                  label="Sociology"
                />
                <FormControlLabel
                  sx={{ alignItems: "center", marginLeft: 0 }}
                  control={
                    <Checkbox
                      checked={departmentFilters.economics}
                      onChange={handleDepartmentChange}
                      name="economics"
                    />
                  }
                  label="Economics"
                />
                <FormControlLabel
                  sx={{ alignItems: "center", marginLeft: 0 }}
                  control={
                    <Checkbox
                      checked={departmentFilters.other}
                      onChange={handleDepartmentChange}
                      name="other"
                    />
                  }
                  label="Other"
                />
              </FormGroup>
            </FormControl>

            {/* Format */}
            <FormControl component="fieldset" sx={{ marginTop: 2 }}>
              <FormLabel
                component="legend"
                sx={{
                  fontWeight: "bold",
                  fontSize: "1.25rem",
                  fontFamily: "Lora",
                }}
              >
                Format
              </FormLabel>
              <FormGroup sx={{ marginLeft: 1 }}>
                <FormControlLabel
                  sx={{ alignItems: "center", marginLeft: 0 }}
                  control={
                    <Checkbox
                      checked={formatFilters.inPerson}
                      onChange={handleFormatChange}
                      name="inPerson"
                    />
                  }
                  label="In-person"
                />
                <FormControlLabel
                  sx={{ alignItems: "center", marginLeft: 0 }}
                  control={
                    <Checkbox
                      checked={formatFilters.online}
                      onChange={handleFormatChange}
                      name="online"
                    />
                  }
                  label="Online"
                />
                <FormControlLabel
                  sx={{ alignItems: "center", marginLeft: 0 }}
                  control={
                    <Checkbox
                      checked={formatFilters.both}
                      onChange={handleFormatChange}
                      name="both"
                    />
                  }
                  label="Both"
                />
              </FormGroup>
            </FormControl>

            {/* Incentive */}
            <FormControl component="fieldset" sx={{ marginTop: 2 }}>
              <FormLabel
                component="legend"
                sx={{
                  fontWeight: "bold",
                  fontSize: "1.25rem",
                  fontFamily: "Lora",
                }}
              >
                Incentive
              </FormLabel>
              <FormGroup sx={{ marginLeft: 1 }}>
                <FormControlLabel
                  sx={{ alignItems: "center", marginLeft: 0 }}
                  control={
                    <Checkbox
                      checked={incentiveFilters.none}
                      onChange={handleIncentiveChange}
                      name="none"
                    />
                  }
                  label="None"
                />
                <FormControlLabel
                  sx={{ alignItems: "center", marginLeft: 0 }}
                  control={
                    <Checkbox
                      checked={incentiveFilters.money}
                      onChange={handleIncentiveChange}
                      name="money"
                    />
                  }
                  label="Money"
                />
                <FormControlLabel
                  sx={{ alignItems: "center", marginLeft: 0 }}
                  control={
                    <Checkbox
                      checked={incentiveFilters.giftCard}
                      onChange={handleIncentiveChange}
                      name="giftCard"
                    />
                  }
                  label="Gift Card"
                />
              </FormGroup>
            </FormControl>
          </Card>
        </Box>

        {/* Table of Studies */}
        <Box sx={{ flex: 3 }}>
          <TableContainer>
            <Table
              sx={{
                borderCollapse: "collapse",
                "& td, & th": { border: "none" },
              }}
            >
              <TableHead>
                <TableRow sx={{ borderBottom: "2px solid #ccc" }}>
                  <TableCell
                    sx={{ fontWeight: "bold", fontFamily: "Montserrat" }}
                  >
                    Title
                  </TableCell>
                  <TableCell
                    sx={{ fontWeight: "bold", fontFamily: "Montserrat" }}
                  >
                    Department
                  </TableCell>
                  <TableCell
                    sx={{ fontWeight: "bold", fontFamily: "Montserrat" }}
                  >
                    Length
                  </TableCell>
                  <TableCell
                    sx={{ fontWeight: "bold", fontFamily: "Montserrat" }}
                  >
                    Location
                  </TableCell>
                  <TableCell
                    sx={{ fontWeight: "bold", fontFamily: "Montserrat" }}
                  >
                    Incentive
                  </TableCell>
                  <TableCell
                    sx={{ fontWeight: "bold", fontFamily: "Montserrat" }}
                  />
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredStudies.map((study, index) => (
                  <TableRow key={index} sx={{ borderBottom: "1px solid #ccc" }}>
                    <TableCell
                      sx={{ border: "none", fontFamily: "Montserrat" }}
                    >
                      {study.title}
                    </TableCell>
                    <TableCell
                      sx={{ border: "none", fontFamily: "Montserrat" }}
                    >
                      {study.department}
                    </TableCell>
                    <TableCell
                      sx={{ border: "none", fontFamily: "Montserrat" }}
                    >
                      {study.length}
                    </TableCell>
                    <TableCell
                      sx={{ border: "none", fontFamily: "Montserrat" }}
                    >
                      {study.location}
                    </TableCell>
                    <TableCell
                      sx={{ border: "none", fontFamily: "Montserrat" }}
                    >
                      {study.incentive}
                    </TableCell>
                    <TableCell sx={{ border: "none" }}>
                      {/* Pass the entire study object via `state` */}
                      <Link
                        to={`/main_participant_page/studies/${study.id}`}
                        state={{ study }}
                        style={{ textDecoration: "none" }}
                      >
                        <Button className="body-button">See More</Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredStudies.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6}>
                      <Typography>No studies match your filters.</Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </Box>
  );
};
