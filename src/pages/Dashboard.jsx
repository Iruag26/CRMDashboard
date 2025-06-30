// src/pages/Dashboard.jsx
import PageWrapper from "../components/PageWrapper";
import { Card, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

/* --------------- chart.js --------------- */
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Line, Bar, Pie } from "react-chartjs-2";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

/* ------------ shared card -------------- */
const CARD_BG = "rgba(29,53,87,.63)";
const CardBox = ({ children, className = "", style = {}, grow = false }) => (
  <Card
    className={`p-3 text-white ${className}`}
    style={{
      background: CARD_BG,
      border: "none",
      borderRadius: 8,
      boxShadow: "0 2px 6px rgba(0,0,0,.18)",
      ...(grow && { flex: 1 }),
      ...style,
    }}
  >
    {children}
  </Card>
);

/* -------------- data ------------------- */
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const sales = [8, 12, 10, 13, 15, 14, 17, 18, 20, 24, 27, 29];
const regions = [25, 16, 23, 14];
const sources = [40, 25, 20, 15];

/* small badge for KPI icons */
const IconBadge = ({ icon }) => (
  <div
    className="d-flex align-items-center justify-content-center"
    style={{
      width: 44,
      height: 44,
      borderRadius: "50%",
      background: "#17315a" /* slightly darker inner circle */,
      boxShadow: "0 0 4px rgba(0,0,0,.25)",
    }}
  >
    <i className={`bi ${icon} fs-4`} />
  </div>
);

export default function Dashboard() {
  return (
    <PageWrapper>
      <Row className="g-4">
        {/* ========== LEFT COLUMN ==================================== */}
        <Col lg={3}>
          <div className="d-flex flex-column h-100 gap-4">
            {/* KPI card ------------------------------------------------ */}
            <CardBox>
              {[
                { icon: "bi-people", label: "Total Clients", value: 230 },
                { icon: "bi-person-plus", label: "Total Leads", value: 438 },
              ].map(({ icon, label, value }) => (
                <div
                  key={label}
                  className="d-flex align-items-center gap-3 mb-3"
                >
                  <IconBadge icon={icon} />
                  <div>
                    <div className="fw-semibold">{label}</div>
                    <div style={{ fontSize: 18 }}>{value}</div>
                  </div>
                </div>
              ))}
            </CardBox>

            <CardBox grow>
              <h6 className="fw-semibold mb-3">Recent Activity</h6>
              {[
                "New Lead – John Doe",
                "Meeting Scheduled – ACME Co.",
                "Proposal Sent – Globex Corp",
                "Deal Closed – BetaCorp",
                "Follow-up Call – Jane Smith",
                "Quote Requested – Umbrella Ltd.",
                "Demo Completed – Stark Industries",
                "Contract Renewal – Wayne Enterprises",
                "Support Ticket Solved – Hooli",
                "New Opportunity – Soylent Inc.",
              ].map((t) => (
                <div
                  key={t}
                  className="small pb-2 mb-2 border-bottom border-light opacity-50"
                >
                  {t}
                </div>
              ))}
            </CardBox>
          </div>
        </Col>

        {/* ========== CENTER COLUMN ================================= */}
        <Col lg={5}>
          <CardBox style={{ minHeight: 640 }}>
            {/* Line */}
            <div style={{ height: 200 }}>
              <Line
                data={{
                  labels: months,
                  datasets: [
                    {
                      data: sales,
                      borderColor: "#FFCE56",
                      backgroundColor: "rgba(255,206,86,.25)",
                      tension: 0.35,
                      pointRadius: 0,
                      borderWidth: 2,
                      fill: true,
                    },
                  ],
                }}
                options={{
                  maintainAspectRatio: false,
                  plugins: { legend: { display: false } },
                  scales: {
                    x: { ticks: { color: "#fff" } },
                    y: { ticks: { color: "#fff" } },
                  },
                }}
              />
            </div>

            {/* Bar */}
            <div style={{ height: 200 }}>
              <Bar
                data={{
                  labels: ["North", "South", "East", "West"],
                  datasets: [{ data: regions, backgroundColor: "#4BC0C0" }],
                }}
                options={{
                  maintainAspectRatio: false,
                  plugins: { legend: { display: false } },
                  scales: {
                    x: { ticks: { color: "#fff" } },
                    y: { ticks: { color: "#fff" } },
                  },
                }}
              />
            </div>

            {/* Pie */}
            <div style={{ height: 200 }}>
              <Pie
                data={{
                  labels: ["Website", "Email", "Ads", "Referral"],
                  datasets: [
                    {
                      data: sources,
                      backgroundColor: [
                        "#36A2EB",
                        "#FF9F40",
                        "#FF6384",
                        "#4BC0C0",
                      ],
                    },
                  ],
                }}
                options={{
                  maintainAspectRatio: false,
                  plugins: {
                    legend: { position: "bottom", labels: { color: "#fff" } },
                  },
                }}
              />
            </div>
          </CardBox>
        </Col>

        {/* ========== RIGHT COLUMN ================================== */}
        <Col lg={4}>
          <div className="d-flex flex-column h-100 gap-4">
            <CardBox>
              <h6 className="fw-semibold mb-2">Smart Sales Insights</h6>
              <ul className="small ps-3 mb-0">
                <li>
                  Top Product: <strong>Product X</strong>
                </li>
                <li>
                  Top Rep: <strong>Michael Scott</strong>
                </li>
              </ul>
            </CardBox>

            <CardBox>
              <h6 className="fw-semibold mb-3">Lead Conversion Rate</h6>
              {[
                ["Initial", 65],
                ["Demo", 70],
                ["Proposal", 90],
                ["Closed", 65],
              ].map(([s, v]) => (
                <div
                  key={s}
                  className="d-flex justify-content-between small pb-2 mb-2 border-bottom border-light opacity-50"
                >
                  <span>{s}</span>
                  <span>{v}%</span>
                </div>
              ))}
            </CardBox>

            {/* Quick links ------------------------------------------------ */}
            <CardBox grow>
              <h6 className="fw-semibold mb-2">Quick Links</h6>
              <ul className="small ps-3 mb-0">
                {[
                  "Create New Lead",
                  "View All Tasks",
                  "Monthly Report",
                  "Import CSV Data",
                  "AI Opportunity Forecast",
                  "Generate Invoice Draft",
                ].map((txt) => (
                  <li key={txt}>
                    <a
                      href="#"
                      className="link-light text-decoration-underline"
                    >
                      {txt}
                    </a>
                  </li>
                ))}
              </ul>
            </CardBox>
          </div>
        </Col>
      </Row>
    </PageWrapper>
  );
}
