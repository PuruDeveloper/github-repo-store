import React, { useState, useEffect } from "react";
import "./Issues.css";

function Issues({ owner, repository }) {
  const [issues, setIssues] = useState([]);
  useEffect(() => {
    //Fetching repo issues
    // fetch("https://api.github.com/repos/octocat/hello-world/issues")
    //   .then((response) => response.json())
    //   .then((data) => console.log(data[0].title, data[0].body))
    //   .catch((error) => console.log(error));
    //Fetching repo branches
    fetch(`https://api.github.com/repos/${owner}/${repository}/issues`)
      .then((response) => response.json())
      .then((data) => {
        // var obj = JSON.parse(data);
        // var length = JsonGetArrayLength(data);
        // console.log(length);
        data.map((item, index) => {
          setIssues((prevArray) => [...prevArray, data[index].title]);
        });
      })
      .catch((error) => console.log(error));
  });
  return (
    <div className="issues">
      {issues.map((item, index) => {
        return <p className="individual__issue">{item}</p>;
      })}
    </div>
  );
}

export default Issues;
