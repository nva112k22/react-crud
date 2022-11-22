import { useEffect, useState } from "react";
import { getAllQuizForAdmin } from "../../../../services/apiService";
const TableQuiz = (props) => {
    const { listQuizs } = props;
    // useEffect(() => {
    //     fetchQuiz();
    // }, [])
    // const fetchQuiz = async() => {
    //     let res = await getAllQuizForAdmin();
    //     if(res && res.EC === 0) {
    //         setListQuiz(res.DT)
    //     }
    //     console.log('res: ', res)
    // }
    return (
      <>
        <div>List Quizzes:</div>
        <table className="table table-hover table-bordered mt-2">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Name</th>
              <th scope="col">Desciption</th>
              <th scope="col">Type</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {listQuizs &&
              listQuizs.map((item, index) => {
                return (
                  <tr key={`table-quiz-${index}`}>
                    <th>{item.id}</th>
                    <td>{item.name}</td>
                    <td>{item.description}</td>
                    <td>{item.difficulty}</td>
                    <td style={{ display: "flex", gap: "15px" }}>
                      <button
                        onClick={() => props.handleClickBtnUpdate(item)}
                        className="btn btn-warning"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => props.handleClickBtnDelete(item)}
                        className="btn btn-danger"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </>
    );
}
export default TableQuiz;