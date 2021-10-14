import React from "react";

function SidebarHolder({ repoName, repoDes }) {
  return (
    <div className="sidebar__holder">
      <h4>{repoName}</h4>
      {repoDes ? <p>{repoDes}</p> : <p>No description added</p>}
    </div>
  );
}

export default SidebarHolder;
