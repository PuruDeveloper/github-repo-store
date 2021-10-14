import React, { useState, useEffect } from "react";

function Commits({ owner, repository }) {
  //Fetching repo commits
  fetch(
    "https://api.github.com/repos/PuruDeveloper/portfolio-website-react/commits"
  )
    .then((response) => response.json())
    .then((data) => console.log(data[2].commit.message))
    .catch((error) => console.log(error));
  return <div></div>;
}

export default Commits;
