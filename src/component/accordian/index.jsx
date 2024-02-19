import { useState } from "react";
import data from "./data";
import "./style.css";

export default function Accordian() {
  const [selected, setSelected] = useState(null);
  const [enableMulti, setEnableMulti] = useState(false);
  const [multiple, setMultiple] = useState([]);

  function handleSelectionElement(currentId) {
    setSelected(currentId === selected ? null : currentId);
  }

  function handleMultiSelection(currentId) {
    let copyMultiple = [...multiple];
    const findIndexOfCurrentId = copyMultiple.indexOf(currentId);
    console.log(findIndexOfCurrentId);

    if(findIndexOfCurrentId===-1) copyMultiple.push(currentId)
    else copyMultiple.splice(findIndexOfCurrentId,1)

    setMultiple(copyMultiple)
  }

  console.log(selected,multiple)

  return (
    <div className="wrapper">
      <button onClick={() => setEnableMulti(!enableMulti)}>
        Enable multiselection{" "}
      </button>
      <div className="accordian">
        {data && data.length > 0 ? (
          data.map((dataItem) => (
            <div className="item">
              <div
                onClick={
                  enableMulti
                    ? () => handleMultiSelection(dataItem.id)
                    : () => handleSelectionElement(dataItem.id)
                }
                className="title"
              >
                <h3>{dataItem.question}</h3>
                <span>+</span>
              </div>
              {enableMulti
                ? multiple.indexOf(dataItem.id) !== -1 && (
                    <div className="acc-content ">{dataItem.answer}</div>
                  )
                : selected === dataItem.id && (
                    <div className="acc-content ">{dataItem.answer}</div>
                  )}
            </div>
          ))
        ) : (
          <div> no data </div>
        )}
      </div>
    </div>
  );
}
