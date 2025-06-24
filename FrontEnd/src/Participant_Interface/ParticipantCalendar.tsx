import React, { useState } from "react";
import { Box, Typography, Popover, Card, Modal } from "@mui/material";
import { Button } from "@mui/joy";
import dayjs from "dayjs";
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../components/Logout';
import "./styles.css";


export const MainParticipantCalendar: React.FC = () => {

  const [currentMonth, setCurrentMonth] = useState(dayjs().month());
  const [currentYear, setCurrentYear] = useState(dayjs().year());
  const nextMonth = currentMonth + 1;

  const navigate = useNavigate();

//APPOINTMENTS
// //Defining data type for appointment descriptions
  type Appointment = {
    date: dayjs.Dayjs;
    time: string;
    title: string;
    department: string;
    length?: string;
    location: string;
    incentive?: string;
  };

  //used to mark all studies after the date has passed
  const pastStudies = (studies: Appointment[]): Appointment[] => {
    const today = dayjs();
    return studies.map((study) => ({
      ...study,
      department: study.date.isBefore(today, "day") ? "Past" : study.department,
    }));
  };

  //dummy appointments
  //should end up calling the backend
  const [appointments, _setAppointments] = useState<Appointment[]>(
    () =>
      pastStudies([
        {
        date: dayjs().year(currentYear).month(currentMonth).date(21),
        time: "10:00-10:30",
        title: "Economic Mobility and Inflation",
        department: "Economics",
        length: "30 mins",
        location: "In-Person",
        incentive: "None",
        },
        {
          date: dayjs().year(currentYear).month(currentMonth).date(17),
          time: "14:00-15:00",
          title: "Memory Game",
          department: "Psychology",
          length: "45 mins",
          location: "Online",
          incentive: "None",
        },
        {
          date: dayjs().year(currentYear).month(currentMonth).date(17),
          time: "10:00-10:30",
          title: "Problem Solving and Child Development",
          department: "Psychology",
          length: "30 mins",
          location: "In-Person",
          incentive: "None",
        },
        {
          date: dayjs().year(currentYear).month(nextMonth).date(4),
          time: "10:00-10:30",
          title: "Urbanization and Job Finding",
          department: "Sociology",
          length: "30 mins",
          location: "In-Person",
          incentive: "None",
        },
      ]) as Appointment[],
  );

  const getColorByDepartment = (department: string) => {
    switch (department) {
      case "Economics":
        return "rgba(204, 121, 167, 0.9)"; // Faded Orange
      case "Psychology":
        return "rgba(0, 114, 178, 0.9)"; // Faded Sky Blue
      case "Sociology":
        return "rgba(188, 183, 106, 0.9)"; // Faded Bluish Green
      case "Completed":
        return "rgba(55, 165, 233, 0.9)"; // Faded Yellow
      case "Past":
        return "rgba(213, 94, 0, 0.9)"; // Faded Blue
  
    }
  };
  const departmentColors = {
    Economics: "rgba(204, 121, 167, 0.9)", // Magenta (Easier to distinguish from other colors)
    Psychology: "rgba(0, 114, 178, 0.9)", // Deep Blue (Improved contrast over faded blue)
    Sociology: "rgb(188, 183, 106, 0.9)", // Yellow (Still bright, but more accessible)
    Completed: "rgba(55, 165, 233, 0.9)", // Faded Yellow
     // Light Blue (Matches visual expectations)
    Past: "rgba(213, 94, 0, 0.9)", // Strong Orange (Instead of faded vermillion)
  };

  // CALENDAR
  //This section uses all of dayjs library components to iterate through each month
  const calendarDate = (
    month: number = dayjs().month(),
    year: number = dayjs().year(),
  ): dayjs.Dayjs[] => {
    const firstDateOfMonth = dayjs().year(year).month(month).startOf("month"); //dayjs first day of month
    const lastDateOfMonth = dayjs().year(year).month(month).endOf("month"); // dayjs last day of month

    const startOfCalendar = firstDateOfMonth.startOf("week");
    const endOfCalendar = lastDateOfMonth.endOf("week");

    const arrayOfDate: dayjs.Dayjs[] = [];
    let currentDate = startOfCalendar;

    while (
      currentDate.isBefore(endOfCalendar) ||
      currentDate.isSame(endOfCalendar, "day")
    ) {
      arrayOfDate.push(currentDate);
      currentDate = currentDate.add(1, "day");
    }

    return arrayOfDate;
  };

  const dates = calendarDate(currentMonth, currentYear);
  const handlePrevMonth = () => {
    setCurrentMonth((prev) => (prev === 0 ? 11 : prev - 1));
    if (currentMonth === 0) setCurrentYear((prev) => prev - 1);
  };

  const handleNextMonth = () => {
    setCurrentMonth((prev) => (prev === 11 ? 0 : prev + 1));
    if (currentMonth === 11) setCurrentYear((prev) => prev + 1);
  };

  const days_of_week = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]; //need this for styling

  //INTERATIVE COMPONENTS
  //This allows the appoinments to have a popup when interacted
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDateAppointments, setSelectedDateAppointments] = useState<
    Appointment[]
  >([]);
  const handleMoreClick = (appointments: Appointment[]) => {
    setAnchorEl(null); // Close popover
    setSelectedDateAppointments(appointments); // Set selected appointments
    setModalOpen(true); // Open modal
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [selectedAppointment, setSelectedAppointment] =
    useState<Appointment | null>(null);
  const [_selectedDate] = useState<dayjs.Dayjs | null>(null);
  const handleDateClick = (
    event: React.MouseEvent<HTMLDivElement>,
    date: dayjs.Dayjs,
  ) => {
    const appointment = appointments.find((appt) =>
      appt.date.isSame(date, "day"),
    );
    if (appointment) {
      setSelectedAppointment(appointment);
      setAnchorEl(event.currentTarget);
    } else {
      setSelectedAppointment(null);
      setAnchorEl(null);
    }
  };
  const open = Boolean(anchorEl);
  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  //STYLING
  return (
    //Main box
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        background: "EFF2F9",
      }}
    >
      {/*Header*/}
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
              <a href="#" style={{ textDecoration: "none", color: "inherit" }}>
                <Typography className="menu-item" component="span">
                  Help
                </Typography>
              </a>
            </Box>
          </Box>
          <Box className="navigation-bar">
            <Link
              to="/main_participant_page"
              style={{ textDecoration: "none" }}
            >
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

        {/* Parent Container */}
        <Box
          sx={{
            display: "flex",
            //flexDirection: "row",
            justifyContent: "space-between",
            //alignItems: "flex-start",
            padding: 2,
            background: "#EFF2F9",
            paddingLeft: "140px",
            paddingRight: "30px",
            width: "85vw",
            height: "25vh",
          }}
        >
          {/* Calendar Section */}
          <Box
            sx={{
              backgroundColor: "#EFF2F9",
              padding: 2,
              width: "75vw",
              height: "25vh",
            }}
          >
            {/* Dark Blue Calendar Header with MMMM*/}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                backgroundColor: "#002868",
                color: "white", //font color
                //width: "100%",
                ariaLabel: dayjs().month(currentMonth).format("MMMM"),
              }}
            >
              {/* Arrow Buttons for prev and next months */}
              <Button
                onClick={handlePrevMonth}
                sx={{ fontSize: 24, backgroundColor: "#002868" }}
              >
                &#9664;
              </Button>
              <Typography variant="h5">
                {dayjs().month(currentMonth).format("MMMM")} {currentYear}
              </Typography>
              <Button
                onClick={handleNextMonth}
                sx={{ fontSize: 24, backgroundColor: "#002868" }}
              >
                &#9654;
              </Button>
            </Box>

            {/* Grid */}
            <Box
              sx={{
                //width: "100%",
                display: "grid",
                gridRowStart: 1,
                gridTemplateRows: "repeat (6, 1fr)",
                gridTemplateColumns: "repeat(7, 1fr)",
                gridAutoFlow: "dense",
              }}
            >
              {/*Days of the week box*/}
              {days_of_week.map((day) => (
                <Box
                  key={day}
                  sx={{
                    padding: "1",
                    textAlign: "center",
                    fontWeight: "bold",
                    backgroundColor: "#EFF2F9",
                    border: "0.5px solid #ddd",
                    maxHeight: "fit-content",
                    display: "grid",
                  }}
                >
                  {day}
                </Box>
              ))}
              {/*Mapping dates*/}
              {dates.map((date, index) => {
                const appointmentsForDate = appointments.filter((appt) =>
                  appt.date.isSame(date, "day"),
                );
                return (
                  <Box
                    key={index}
                    onClick={(event) => handleDateClick(event, date)}
                    sx={{
                      border: "1px solid #ddd", // Add border to each date cell
                      height: "10vh",
                      opacity: date.month() === currentMonth ? 1 : 0.5,
                      //display: "flex",
                      alignItems: "stretch",
                      justifyContent: "space-evenly",
                      backgroundColor: "white",
                    }}
                  >
                    <Typography sx={{ fontWeight: "bold" }}>
                      {date.date()}
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        //gap: "2px",
                        //alignItems: "stretch",
                        //marginTop: "5px",
                        //maxHeight: "60px",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                        overflow: "hidden",
                      }}
                    >
                      {appointmentsForDate
                        .slice(0, 1)
                        .map((appointment, index) => (
                          <Box
                            key={index}
                            sx={{
                              //mt: 1,
                              p: 0.25,
                              border: `1px solid ${getColorByDepartment(
                                appointment.department,
                              )}`,
                              borderRadius: 0.5,
                              backgroundColor: `${getColorByDepartment(
                                appointment.department,
                              )}15`,
                              color: getColorByDepartment(
                                appointment.department,
                              ),
                              //display: "flex",
                              //alignItems: "center",
                              cursor: "pointer",
                              whiteSpace: "wrap",
                              //textOverflow: "ellipsis",
                              overflow: "hidden",
                            }}
                          >
                            <Typography
                              sx={{ fontSize: "10px", fontWeight: "bold"}}
                            >
                              {appointment.title}
                            </Typography>
                          </Box>
                        ))}
                      {appointmentsForDate.length > 1 && (
                        <Typography
                          sx={{
                            fontSize: "10px",
                            color: "light grey",
                            marginTop: "2px",
                            cursor: "pointer",
                            borderRadius: 3
                          }}
                          onClick={() => handleMoreClick(appointmentsForDate)}
                        >
                          +{appointmentsForDate.length - 1} more
                        </Typography>
                      )}
                    </Box>
                  </Box>
                );
              })}
            </Box>
          </Box>
          <Box
            sx={{
              //width: "15vw",
              //height: "40vh",
              backgroundColor: "#EFF2F9",
              padding: 2,
              //margin: 10,
              //cursor: "pointer"
            }}
          >
            <Card
              sx={{
                backgroundColor: "white",
                padding: 2,
                boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
                //borderRadius: 2,
              }}
            >
              <Typography
                variant="h5"
                sx={{ fontWeight: "bold", fontSize: "1.5rem"}}
              >
                Events
              </Typography>
              <Box
                sx={{ display: "flex", flexDirection: "column", gap: 1, mt: 1, }}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Box
                    sx={{
                      width: 15,
                      height: 10,
                      backgroundColor: departmentColors["Completed"],
                      marginRight: 1,
                    }}
                  />
                  <Typography>Completed Studies</Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Box
                    sx={{
                      width: 10,
                      height: 10,
                      backgroundColor: departmentColors["Economics"],
                      marginRight: 1,
                    }}
                  />
                  <Typography>ECON Studies</Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Box
                    sx={{
                      width: 10,
                      height: 10,
                      backgroundColor: departmentColors["Psychology"],
                      marginRight: 1,
                    }}
                  />
                  <Typography>PSYCH Studies</Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Box
                    sx={{
                      width: 10,
                      height: 10,
                      backgroundColor: departmentColors["Sociology"],
                      marginRight: 1,
                    }}
                  />
                  <Typography>SOC Studies</Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Box
                    sx={{
                      width: 10,
                      height: 10,
                      backgroundColor: departmentColors["Past"],
                      marginRight: 1,
                    }}
                  />
                  <Typography>Past Studies</Typography>
                </Box>
              </Box>
            </Card>
            {/* Popover */}
            <Popover
              open={open}
              anchorEl={anchorEl}
              onClose={handlePopoverClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
              sx={{
                "& .MuiPopover-paper": {
                  padding: 2,
                  borderRadius: 2,
                  boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
                },
              }}
            >
              {selectedAppointment ? (
                <Box sx={{ padding: 2, maxWidth: "100" }}>
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    {selectedAppointment.title}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Time:</strong> {selectedAppointment.time}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Department:</strong>{" "}
                    {selectedAppointment.department}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Location:</strong> {selectedAppointment.location}
                  </Typography>
                  {selectedAppointment.incentive && (
                    <Typography variant="body2">
                      <strong>Incentive:</strong>{" "}
                      {selectedAppointment.incentive}
                    </Typography>
                  )}
                </Box>
              ) : (
                <Typography sx={{ padding: 2 }}>No appointments</Typography>
              )}
              {/*THIS HAS FORMATTING ISSUES*/}
              <Modal
                open={modalOpen}
                onClose={handleModalClose}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
              >
                <Box
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 500,
                    bgcolor: "white",
                    boxShadow: 24,
                    p: 4,
                    borderRadius: 2,
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    vertical: "bottom",
                    horizontal: "center",
                  }}
                >
                  <Typography
                    id="modal-title"
                    variant="h5"
                    sx={{
                      fontWeight: "bold",
                      textAlign: "center",
                      borderBottom: "2px solid #ccc",
                      pb: 1,
                    }}
                  >
                    Appointments
                  </Typography>

                  <Box id="modal-description" sx={{ mt: 1 }}>
                    {selectedDateAppointments.map((appointment, index) => (
                      <Box
                        key={index}
                        sx={{
                          p: 2,
                          mb: 1,
                          backgroundColor: "#f5f5f5",
                          borderRadius: 2,
                          boxShadow: "0px 1px 3px rgba(0,0,0,0.2)",
                        }}
                      >
                        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                          {appointment.title}
                        </Typography>
                        <Typography variant="body2" sx={{ color: "gray" }}>
                          <strong>Time:</strong> {appointment.time}
                        </Typography>
                        <Typography variant="body2" sx={{ color: "gray" }}>
                          <strong>Department:</strong> {appointment.department}
                        </Typography>
                        <Typography variant="body2" sx={{ color: "gray" }}>
                          <strong>Location:</strong> {appointment.location}
                        </Typography>
                        {appointment.incentive && (
                          <Typography variant="body2" sx={{ color: "gray" }}>
                            <strong>Incentive:</strong> {appointment.incentive}
                          </Typography>
                        )}
                      </Box>
                    ))}
                  </Box>

                  <Button
                    onClick={handleModalClose}
                    sx={{
                      backgroundColor: "#002868",
                      color: "white",
                      "&:hover": { backgroundColor: "#001f4d" },
                      alignSelf: "center",
                    }}
                  >
                    Close
                  </Button>
                </Box>
              </Modal>
            </Popover>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
