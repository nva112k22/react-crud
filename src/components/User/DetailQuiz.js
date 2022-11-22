import { useEffect, useState} from "react";
import { useParams, useLocation, NavLink } from "react-router-dom";
import { getDataQuiz, postSubmitQuiz } from "../../services/apiService";
import _ from 'lodash';
import "./DetailQiuz.scss";
import Question from "./Question";
import ModalResult from "./ModalResult";
import RightContent from "./Content/RightContent";
import { Breadcrumb } from "react-bootstrap";
import { useTranslation, Trans } from "react-i18next";

const DetailQuiz = (props) => {
    const params = useParams();
    const quizId = params.id;
    const location = useLocation();
    const [dataQuiz, setDataQuiz] = useState([]);
    const [index, setIndex] = useState(0);

    const [isShowModalResult, setIsShowModalResult] = useState(false);
    const { t } = useTranslation();

    const [dataModalResult, setDataModalResult] = useState({})
  useEffect(() => {
    fetchQuestions();
  }, [quizId])
  const fetchQuestions = async() => {
    let res = await getDataQuiz(quizId);
    if(res && res.EC === 0) {
        let raw = res.DT;
        let data= _.chain(raw)
           // Group the elements of Array based on `color` property
           .groupBy("id")
           // `key` is group's name (color), `value` is the array of objects
           .map((value, key) => {
            let answers = [];
            let questionDescription, image = null;

            value.forEach((item, index) => {
                if(index === 0) {
                    questionDescription = item.description;
                    image = item .image;
                }
                item.answers.isSelected = false;
                answers.push(item.answers);
            })
            answers = _.orderBy(answers, ['id'], ['asc']);
            return { questionId: key, answers, questionDescription, image };
        })
           .value();
           console.log(data)
           setDataQuiz(data)
    }
  }
  const handlePrev = () => {
    if (index - 1 < 0 ) return; 
    setIndex(index - 1);
  }
  const handleNext = () => {
    if(dataQuiz && dataQuiz.length > index + 1)
    setIndex(index + 1)
  }
  //React hook doesn't merge state
  const handleCheckDbox = (answerId, questionId) => {
    let dataQuizClone = _.cloneDeep(dataQuiz);
    let question = dataQuizClone.find(item => +item.questionId === +questionId)
    if(question && question.answers) {
       question.answers.map(item => {
        if(+item.id === +answerId) {
          item.isSelected = !item.isSelected;
        }
        return item;
      })
    }
    let index = dataQuizClone.findIndex(item => +item.questionId === +questionId)
    if(index > -1) {
      dataQuizClone[index] = question;
      setDataQuiz(dataQuizClone);
    }
  }

  const handleFinishQuiz = async() => {
//     {
//     "quizId": 1,
//     "answers": [
//         { 
//             "questionId": 1,
//             "userAnswerId": [3]
//         },
//         { 
//             "questionId": 2,
//             "userAnswerId": [6]
//         }
//     ]
// }
    console.log(">>> check data before submit: ", dataQuiz)
    let payload = {
      quizId: +quizId,
      answers: []
    };
    let answers = [];
    if(dataQuiz && dataQuiz.length > 0) {
        dataQuiz.forEach(question => {
          let questionId = question.questionId;
          let userAnswerId = [];
          //todo: userAnswerId
          question.answers.forEach(a => {
            if(a.isSelected === true) {
              userAnswerId.push(a.id)
            }
          })
          answers.push({
            questionId: +questionId,
            userAnswerId: userAnswerId
          })
        })
        payload.answers = answers;
        //submit api
        let res = await postSubmitQuiz(payload);
        console.log('Check res: ', res)
        if(res && res.EC === 0) {
          setDataModalResult({
            countCorrect: res.DT.countCorrect,
            countTotal: res.DT.countTotal,
            quizData : res.DT.quizData
          })
          setIsShowModalResult(true);
        } else {
          alert('something wrongs....')
        }
    }
  }
  return (
    <>
      <Breadcrumb className="quiz-detail-new-header">
        <NavLink to="/" className="breadcrumb-item">
          {t("header.home")}
        </NavLink>
        <NavLink to="/users" className="breadcrumb-item">
          {t("header.user")}
        </NavLink>
        <Breadcrumb.Item active>
          {t('header.quiz')}
        </Breadcrumb.Item>
      </Breadcrumb>
      <div className="detail-quiz-container">
        <div className="left-content">
          <div className="title">
            Quiz {quizId} : {location?.state?.quizTitle}
          </div>
          <hr />
          <div className="q-body">
            <img />
          </div>
          <div className="q-content">
            <Question
              index={index}
              handleCheckDbox={handleCheckDbox}
              data={dataQuiz && dataQuiz.length > 0 ? dataQuiz[index] : []}
            />
          </div>
          <div className="footer">
            <button className="btn btn-secondary" onClick={() => handlePrev()}>
              Prev
            </button>
            <button className="btn btn-primary" onClick={() => handleNext()}>
              Next
            </button>
            <button
              className="btn btn-warning"
              onClick={() => handleFinishQuiz()}
            >
              Finish
            </button>
          </div>
        </div>
        <div className="right-content">
          <RightContent
            dataQuiz={dataQuiz}
            handleFinishQuiz={handleFinishQuiz}
            setIndex={setIndex}
          />
        </div>
        <ModalResult
          show={isShowModalResult}
          setShow={setIsShowModalResult}
          dataModalResult={dataModalResult}
        />
      </div>
    </>
  );
};
export default DetailQuiz;
