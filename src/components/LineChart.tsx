import { Line } from "react-chartjs-2";
import { Col, Row, Typography } from "antd";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LineController,
  CategoryScale,
  LinearScale,
  Title as Titles,
  Tooltip,
  Legend,
} from "chart.js";
import { coinHistoryType } from "./CryptoDetails";
const { Title } = Typography;
ChartJS.register(
  LineController,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Titles,
  Tooltip,
  Legend
);

const LineChart = ({
  coinHistory,
  currentPrice,
  coinName,
  timeStamp,
}: {
  coinHistory: coinHistoryType;
  currentPrice: string;
  coinName: string;
  timeStamp: string;
}) => {
  const coinPrice = [];
  const coinTimestamp = [];

  for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
    coinPrice.push(coinHistory?.data?.history[i].price);
  }

  for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
    const date = new Date(coinHistory?.data?.history[i].timestamp * 1000);
    if (timeStamp == "24h" || timeStamp == "3h") {
      coinTimestamp.push(date.toLocaleString().split(",")[1]);
    } else {
      coinTimestamp.push(date.toLocaleString().split(",")[0]);
    }
  }
  const data = {
    labels: coinTimestamp,
    datasets: [
      {
        label: "Price In USD",
        data: coinPrice,
        fill: false,
        backgroundColor: "#0071bd",
        borderColor: "#0071bd",
      },
    ],
  };
  const options = {
    scales: {
      y: {
        beginAtZero: false, 
      },
    },
  };

  return (
    <>
      <Row className="chart-header">
        <Title level={2} className="chart-title">
          {coinName} Price Chart{" "}
        </Title>
        <Col className="price-container">
          <Title level={5} className="price-change">
            Change: {coinHistory?.data?.change}%
          </Title>
          <Title level={5} className="current-price">
            Current {coinName} Price: $ {currentPrice}
          </Title>
        </Col>
      </Row>
      <Line data={data} options={options} />
    </>
  );
};

export default LineChart;
