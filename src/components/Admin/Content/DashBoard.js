import './DashBoard.scss';
import {
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
} from "recharts";
import {useState, useEffect} from 'react';
import { getOverview } from '../../../services/apiService';
import { useTranslation, Trans } from "react-i18next";

const DashBoard = (props) => {
    const [dataOverView, setDataOverView] = useState([]);
    const [dataChart, setDataChart] = useState([]);
    const { t } = useTranslation();

    useEffect(() => {
        fetchDataOverView();
    }, []);
    const fetchDataOverView = async() => {
        let res = await getOverview();
        if(res && res.EC === 0) {
            setDataOverView(res.DT);
            //process chart data
            let Qz = 0, Qs = 0, As = 0;
            Qz = res?.DT?.others?.countQuiz?? 0;
            Qs = res?.DT?.others?.countQuestions?? 0;
            As = res?.DT?.others?.countAnswers ?? 0;
                const data = [
                  {
                    "name": "Quizzes",
                    "Qz": Qz,
                  },
                  {
                    "name": "Quizzes",
                    "Qs": Qs,
                  },
                  {
                    "name": "Answers",
                    "As": As,
                  },
                ];
                setDataChart(data);
        }
        console.log("check res: ", res)
    }

    console.log(">>>dataIverView: ", dataOverView)
    return (
      <div className="dashboard-container">
        <div className="title">{t("admin.dashboard.title")}</div>
        <div className="content">
          <div className="c-left">
            <div className="child">
              <span className="text-1">{t("admin.dashboard.total-user")}</span>
              <span className="text-2">
                {dataOverView &&
                dataOverView.users &&
                dataOverView.users.total ? (
                  <>{dataOverView.users.total}</>
                ) : (
                  <>0</>
                )}
              </span>
            </div>
            <div className="child">
              <span className="text-1">{t("admin.dashboard.total-quiz")}</span>
              <span className="text-2">
                {dataOverView &&
                dataOverView.others &&
                dataOverView.others.countQuiz ? (
                  <>{dataOverView.others.countQuiz}</>
                ) : (
                  <>0</>
                )}
              </span>
            </div>
            <div className="child">
              <span className="text-1">
                {t("admin.dashboard.total-question")}
              </span>
              <span className="text-2">
                {dataOverView &&
                dataOverView.others &&
                dataOverView.others.countQuestions ? (
                  <>{dataOverView.others.countQuestions}</>
                ) : (
                  <>0</>
                )}
              </span>
            </div>
            <div className="child">
              <span className="text-1">
                {t("admin.dashboard.total-answer")}
              </span>
              <span className="text-2">
                {dataOverView &&
                dataOverView.others &&
                dataOverView.others.countAnswers ? (
                  <>{dataOverView.others.countAnswers}</>
                ) : (
                  <>0</>
                )}
              </span>
            </div>
          </div>
          <div className="c-right">
            <ResponsiveContainer width="95%" height={"100%"}>
              <BarChart data={dataChart}>
                {/* <CartesianGrid strokeDasharray="3 3" /> */}
                <XAxis dataKey="name" />
                {/* <YAxis /> */}
                <Tooltip />
                <Legend />
                <Bar dataKey="Qz" fill="#8884d8" />
                <Bar dataKey="Qs" fill="#82ca9d" />
                <Bar dataKey="As" fill="#fcb12a" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    );
}
export default DashBoard;