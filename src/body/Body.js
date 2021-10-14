import { useState, useEffect, useRef } from "react";
import React from "react";
import Details from "./body/Branches";
import Sidebar from "./body/Issues";
import "./Body.css";
import Branches from "./body/Branches";
import Issues from "./body/Issues";
import SidebarHolder from "./body/SidebarHolder";
import Commits from "./body/Commits";

function Body() {
  const [add, setAdd] = useState(false);
  var [currentRepo, setCurrentRepo] = useState("");
  const [bi, setBi] = useState("");
  var [indexValue, setIndexValue] = useState();
  const [owner, setOwner] = useState("");
  const [repo, setRepo] = useState("");
  var [des, setDes] = useState("");
  const [ownerName, setOwnerName] = useState([]);
  var [repoName, setRepoName] = useState([]);
  const [repoList, setRepoList] = useState([
    { ownerName: "PuruDeveloper", repository: "internshala-clone" },
  ]);

  const showAddRepo = (e) => {
    e.preventDefault();
    setAdd(true);
  };

  const disableAddRepo = (e) => {
    e.preventDefault();
    setAdd(false);
  };

  const changeOwner = (e) => {
    e.preventDefault();
    setOwner(e.target.value);
  };

  const changeRepo = (e) => {
    e.preventDefault();
    setRepo(e.target.value);
  };

  const updateRepo = (e) => {
    e.preventDefault();
    // setRepoList((prevArray) => [
    //   ...prevArray,
    //   {
    //     ownerName: owner,
    //     repository: repo,
    //   },
    // ]);
    setOwnerName((prevArray) => [...prevArray, owner]);
    setRepoName((prevArray) => [...prevArray, { repo: repo, des: "" }]);
    setAdd(false);
    setOwner("");
    setRepo("");
    //Fetching repo name and description

    fetch(`https://api.github.com/repos/${owner}/${repo}/`)
      .then((response) => response.json())
      .then((data) => {
        repoName[repoName.length].repo = data.name;
        repoName[repoName.length].des = data.description;
      })
      .catch((error) => console.log(error));

    if (repoName.length < 1) {
      setIndexValue(0);
    }
    // repoList.map((sty) => {
    //   console.log(sty.ownerName);
    // });
  };

  const changeIndex = (e, i) => {
    e.preventDefault();
    setIndexValue(i);
    setCurrentRepo(repoName[i].repo);
    setBi("branch");
  };

  const changeBi = (e, value) => {
    e.preventDefault();
    setBi(value);
  };

  const deleteRepo = (e) => {
    e.preventDefault();
    setBi("");
    setRepoName(
      repoName.filter((item, index) => {
        return index < indexValue || index > indexValue;
      })
    );
    setIndexValue(--indexValue);
  };

  //api.github.com/repos/PuruDeveloper/portfolio-website-react/commits?sha=master
  return (
    <div className="body">
      <div className="body__left">
        {repoName.map((item, index) => {
          return (
            <div className="sidebar" onClick={(e) => changeIndex(e, index)}>
              <h4>{item.repo}</h4>
              <p>{item.des ? item.des : "No description"}</p>
            </div>
          );
        })}
      </div>
      <div className="body__right">
        <div className="details">
          <div className="details__top">
            <button onClick={(e) => deleteRepo(e)}>DELETE</button>
          </div>
          <div className="details__bottom">
            <div className="details__option">
              <button onClick={(e) => changeBi(e, "branch")}>Branches</button>
              <button onClick={(e) => changeBi(e, "issue")}>Issues</button>
              <button onClick={(e) => changeBi(e, "commit")}>Commits</button>
            </div>
            <div className="branch__issues">
              {bi === "branch" && (
                <Branches
                  owner={ownerName[indexValue]}
                  repository={currentRepo}
                />
              )}{" "}
              {bi === "issue" && (
                <Issues
                  owner={ownerName[indexValue]}
                  repository={currentRepo}
                />
              )}
              {bi === "commit" && (
                <Commits
                  owner={ownerName[indexValue]}
                  repository={currentRepo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="add__button">
        <button onClick={(e) => showAddRepo(e)}>+</button>
      </div>
      <div className={add ? "visible__add__repo" : "disable__add__repo"}>
        <button className="cross__button" onClick={(e) => disableAddRepo(e)}>
          X
        </button>
        <p>ADD NEW PEPOSITORY</p>
        <div className="left__oriented">
          <p>Owner/Organisation</p>
          <input
            type="text"
            value={owner}
            onChange={(e) => changeOwner(e)}
          ></input>
          <p>Repository Name</p>
          <input
            type="text"
            value={repo}
            onChange={(e) => changeRepo(e)}
          ></input>
          <br />
          <button onClick={(e) => updateRepo(e)}>Add</button>
        </div>
      </div>
    </div>
  );
}

export default Body;
