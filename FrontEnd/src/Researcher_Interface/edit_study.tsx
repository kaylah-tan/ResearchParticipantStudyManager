import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { StudyObject } from "./studyObject";

export const EditStudy = () => {
  const navigate = useNavigate();
  const { studyId } = useParams<{ studyId: string }>();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [modules, setModules] = useState<string[]>([]);
  const [editors, setEditors] = useState<string[]>([]);
  const [maxParticipants, setMaxParticipants] = useState<number>(0);
  const [irbStatus, setIrbStatus] = useState<boolean>(false);
  const [status, setStatus] = useState<boolean>(true);
  const [published, setPublished] = useState<boolean>(false);
  const [creditValue, setCreditValue] = useState<number>(0);
  const [restrictions, setRestrictions] = useState<string[]>([]);
  const [links, setLinks] = useState<string[]>([]);
  const [department, setDepartment] = useState<string>("");

  useEffect(() => {
    if (studyId && studyId !== "new") {
      const fetchStudyData = async () => {
        try {
          const response = await fetch(`http://localhost:3000/api/studies/${studyId}`, {
            headers: {
              "Authorization": `Bearer ${localStorage.getItem("authToken")}`,
            },
          });
          if (!response.ok) {
            throw new Error(`Failed to fetch study data. Status: ${response.status}`);
          }
          const data = await response.json();
          setTitle(data.title);
          setDescription(data.description);
          setModules(data.modules);
          setEditors(data.editors || []);
          setMaxParticipants(data.maxParticipants);
          setIrbStatus(data.irbStatus);
          setStatus(data.status);
          setPublished(data.published);
          setCreditValue(data.creditValue);
          setRestrictions(data.restrictions);
          setLinks(data.links);
          setDepartment(data.department);
        } catch (error) {
          console.error("Error fetching study data:", error);
          alert("Failed to load study data. Please try again.");
        }
      };
      fetchStudyData();
    }
  }, [studyId]);

  const handleSaveStudy = async () => {
    const studyObject: StudyObject = {
      title,
      description,
      modules,
      irbStatus,
      status,
      published,
      maxParticipants,
      creditValue,
      restrictions,
      links,
      department,
      primaryInvestigatorId: "cm7kquu2q0001sfs8iglmo1r2",
    };

    try {
      const url =
        studyId && studyId !== "new"
          ? `http://localhost:3000/api/studies/${studyId}`
          : "http://localhost:3000/api/studies";
      const method = studyId && studyId !== "new" ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("authToken")}`,
        },
        body: JSON.stringify(studyObject),
      });

      if (!response.ok) {
        throw new Error(`Failed to save study. Status: ${response.status}`);
      }

      await response.json();
      alert(studyId && studyId !== "new" ? "Study updated successfully!" : "Study created successfully!");
      navigate("/main_research_page");
    } catch (error) {
      console.error("Error saving study:", error);
      alert("Failed to save study. Please try again.");
    }
  };

  return (
    <div className="Research_Side">
      <form className="login-form">
        <header className="Research_Side-header">
          <h1 style={{ textAlign: "center", fontSize: "36px" }}>
            {studyId && studyId !== "new" ? "Edit Study" : "Create New Study"}
          </h1>
          <div>
            <button type="button" onClick={() => navigate(studyId === "new" ? "/view_existing_studies" : "/edit_study/new")}>
              {studyId === "new" ? "Create New Study" : "Create New Study"}
            </button>
            <button type="button" onClick={() => navigate("/view_existing_studies")}>View Existing Studies</button>
            <button type="button" onClick={() => navigate("/view_archived_studies")}>View Archived Studies</button>
            <button type="button" onClick={() => navigate("/logout")}>Logout</button>
          </div>
        </header>

        <div className="Research_Side-body">
          <p>
            {studyId && studyId !== "new"
              ? "Here you can edit the information for a study."
              : "Here you can create a new study."}
          </p>
          <div className="study_entry_element">
            <h2>Name of Study:</h2>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div className="study_entry_element">
            <h2>Short Description:</h2>
            <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>
          <div className="study_entry_element">
            <h2>Keywords:</h2>
            <input
              type="text"
              value={modules.join(",")}
              onChange={(e) => setModules(e.target.value.split(",").map((s) => s.trim()))}
            />
            <p>Note: These will be used to show similar studies</p>
          </div>
          <div className="study_entry_element">
            <h2>Collaborators:</h2>
            <input
              type="text"
              value={editors.join(",")}
              onChange={(e) => setEditors(e.target.value.split(",").map((s) => s.trim()))}
            />
          </div>
          <div className="study_entry_element">
            <h2>Seats Available:</h2>
            <input type="number" value={maxParticipants} onChange={(e) => setMaxParticipants(parseInt(e.target.value, 10))} />
          </div>
          <div className="study_entry_element">
            <h2>IRB Status (Approved?):</h2>
            <input type="checkbox" checked={irbStatus} onChange={(e) => setIrbStatus(e.target.checked)} />
          </div>
          <div className="study_entry_element">
            <h2>Study Status (Current Study?):</h2>
            <input type="checkbox" checked={status} onChange={(e) => setStatus(e.target.checked)} />
          </div>
          <div className="study_entry_element">
            <h2>Published (Ready to Publish?):</h2>
            <input type="checkbox" checked={published} onChange={(e) => setPublished(e.target.checked)} />
          </div>
          <div className="study_entry_element">
            <h2>Credit Value for Participation:</h2>
            <input type="number" value={creditValue} onChange={(e) => setCreditValue(parseInt(e.target.value, 10))} />
          </div>
          <div className="study_entry_element">
            <h2>Restrictions (comma separated):</h2>
            <input
              type="text"
              value={restrictions.join(",")}
              onChange={(e) => setRestrictions(e.target.value.split(",").map((s) => s.trim()))}
            />
          </div>
          <div className="study_entry_element">
            <h2>Links to Documents:</h2>
            <input
              type="text"
              value={links.join(",")}
              onChange={(e) => setLinks(e.target.value.split(",").map((s) => s.trim()))}
            />
          </div>
          <div className="study_entry_element">
            <h2>Department:</h2>
            <input type="text" value={department} onChange={(e) => setDepartment(e.target.value)} />
          </div>
          <button type="button" onClick={handleSaveStudy}>
            Save Study
          </button>
        </div>
      </form>
    </div>
  );
};
