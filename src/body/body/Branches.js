import React, { useState, useEffect } from "react";
import "./Branches.css";

function Branches({ owner, repository }) {
  const [branchNames, setBranchNames] = useState([]);
  let i = 0;
  let branchTemp = "";
  useEffect(() => {
    //Fetching repo branches
    fetch(`https://api.github.com/repos/${owner}/${repository}/branches`)
      .then((response) => response.json())
      .then((data) =>
        data.map((item, index) => {
          branchTemp = item.name;
          branchNames.map((it, ind) => {
            if (branchTemp === it) {
              i = 1;
            }
          });
          if (i === 0) {
            setBranchNames((prevArray) => [...prevArray, item.name]);
          } else {
            i = 0;
          }
        })
      )
      .catch((error) => console.log(error));
    // setBranchNames([...new Set(branchNames)]);
  });
  return (
    <div className="branches">
      {branchNames.map((item, index) => {
        return <p className="individual__branch">{item}</p>;
      })}
    </div>
  );
}

export default Branches;
