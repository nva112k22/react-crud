import './ManageQuiz.scss';
import Select from "react-select";
import { FcPlus } from "react-icons/fc";
import { useEffect, useState } from 'react';
import { toast } from "react-toastify";
import {
  postCreateNewQuiz,
  getUserWithPaginate,
  getAllQuizForAdmin
} from "../../../../services/apiService";
import TableQuiz from './TableQuiz';
import Accordion from "react-bootstrap/Accordion";
import ModalUpdateQuiz from './ModalUpdateQuiz';
import ModalDeleteQuiz from './ModalDeleteQuiz';
import QuizQA from './QuizQA';
import AssignQuiz from './AssignQuiz';
import { useTranslation, Trans } from "react-i18next";

const options = [
  { value: "EASY", label: "EASY" },
  { value: "MEDIUM", label: "MEDIUM" },
  { value: "HARD", label: "HARD" },
];
const ManageQuiz = (props) => {
  const LIMIT_USER = 3;
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("EASY");
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState("");
  const [pageCount, setPageCount] = useState(0);
  const [showModalUpdateQuiz, setShowModalUpdateQuiz] = useState(false);
  const [showModalDeleteQuiz, setShowModalDeleteQuiz] = useState(false);
  const [listQuizs, setListUser] = useState([]);
  const [dataUpdate, setDataUpdate] = useState({});
  const [dataDelete, setDataDelete] = useState({});
  const { t } = useTranslation();

  //Componentdidmount
  useEffect(() => {
    fetchListQuizs();
  }, []);
  const handleChangeFile = (event) => {
    if (event.target && event.target.files && event.target.files[0]) {
      setPreviewImage(URL.createObjectURL(event.target.files[0]));
      setImage(event.target.files[0]);
    } else {
      setPreviewImage("");
    }
  };

  const handleSubmitQuiz = async () => {
    //Validate
    if (!name || !description) {
      toast.error("Name/Description is required");
    }
    let res = await postCreateNewQuiz(description, name, type?.value, image);
    if (res && res.EC === 0) {
      fetchListQuizs();
      toast.success(res.EM);
      setName("");
      setDescription("");
    } else {
      toast.error(res.EM);
    }
  };
  const fetchListQuizs = async () => {
    let res = await getAllQuizForAdmin();
    console.log(res);
    if (res.EC === 0) {
      setListUser(res.DT);
    }
  };

  const handleClickBtnUpdate = (quiz) => {
    setShowModalUpdateQuiz(true);
    setDataUpdate(quiz);
  };
  const resetUpdateData = () => {
    setDataUpdate({});
  };
  const handleClickBtnDelete = (quiz) => {
    setShowModalDeleteQuiz(true);
    setDataDelete(quiz);
  };
  return (
    <div className="quiz-container">
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header>{t("admin.manage-quiz.a1")}</Accordion.Header>
          <Accordion.Body>
            <div className="add-new">
              <fieldset className="border rounded-3 p-3">
                <legend className="float-none w-auto px-3">
                  {t("admin.manage-quiz.add-quiz")}
                </legend>
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="your quiz name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                  />
                  <label>Name</label>
                </div>
                <div className="form-floating">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="description..."
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                  />
                  <label> {t("admin.manage-quiz.d")}</label>
                </div>
                <div className="my-3">
                  <Select
                    //   value={selectedOption}
                    //   onChange={this.handleChange}
                    defaultValue={type}
                    onChange={setType}
                    options={options}
                    placeholder={"Quiz type..."}
                  />
                </div>
                <div className="more-actions form-group">
                  <label className="mb-1">
                    {t("admin.manage-quiz.quiz-upload")}
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    onChange={(event) => handleChangeFile(event)}
                  />

                  {/* <div className="col-md-12 img-preview">
                    {previewImage ? (
                      <img src={previewImage} />
                    ) : (
                      <span>Preview image</span>
                    )}
                  </div> */}
                </div>
                <div className="mt-3">
                  <button
                    onClick={() => handleSubmitQuiz()}
                    className="btn btn-warning"
                  >
                    {t("admin.manage-quiz.sq")}
                  </button>
                </div>
              </fieldset>
            </div>
            <div className="list-detail">
              <TableQuiz
                listQuizs={listQuizs}
                handleClickBtnUpdate={handleClickBtnUpdate}
                handleClickBtnDelete={handleClickBtnDelete}
                fetchListQuizs={fetchListQuizs}
              />
              <ModalUpdateQuiz
                show={showModalUpdateQuiz}
                setShow={setShowModalUpdateQuiz}
                dataUpdate={dataUpdate}
                fetchListQuizs={fetchListQuizs}
                resetUpdateData={resetUpdateData}
              />
              <ModalDeleteQuiz
                show={showModalDeleteQuiz}
                setShow={setShowModalDeleteQuiz}
                dataDelete={dataDelete}
                fetchListQuizs={fetchListQuizs}
              />
            </div>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header> {t("admin.manage-quiz.a2")}</Accordion.Header>
          <Accordion.Body>
            <QuizQA />
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="2">
          <Accordion.Header> {t("admin.manage-quiz.a3")}</Accordion.Header>
          <Accordion.Body>
            <AssignQuiz />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
};
export default ManageQuiz;
