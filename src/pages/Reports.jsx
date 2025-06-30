// src/pages/Reports.jsx
import { useState } from 'react';
import PageWrapper from '../components/PageWrapper';
import PageHeader  from '../components/PageHeader';
import { Row, Col, Card, Dropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

/* ---------- chart.js setup ---------- */
import {
  Chart as ChartJS,
  CategoryScale, LinearScale, PointElement, LineElement, BarElement,
  Tooltip, Legend, ArcElement
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Tooltip, Legend);

/* ---------- small helper ---------- */
const StatCard = ({ label, value }) => (
  <Card className="text-center shadow-sm">
    <Card.Body>
      <div className="text-muted small">{label}</div>
      <h4 className="fw-semibold mb-0">{value}</h4>
    </Card.Body>
  </Card>
);

const ChartCard = ({ title, children }) => (
  <Card className="shadow-sm">
    <Card.Header className="bg-white fw-semibold py-2">{title}</Card.Header>
    <Card.Body style={{ height: 280 }}>{children}</Card.Body>
  </Card>
);

/* ---------- mock CRM data ---------- */
const monthLabels = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug'];
const monthlySales = [12000,15000,14000,18000,20000,23000,26000,29000];
const predicted    = [/* gap */,13000,16000,17000,19500,22500,25500,30000];

const funnelLabels = ['Visited','Contacted','Proposal Sent','Closed'];
const funnelCounts = [1200,800,350,120];

const churnLabels  = ['Low','Medium','High'];
const churnPerc    = [70,20,10];

/* KPI calculations (mock) */
const totalSales  = monthlySales.reduce((a,b)=>a+b,0).toLocaleString('en-US',{style:'currency',currency:'USD'});
const totalClients= 784;
const avgDeal     = (totalSales.replace(/[^0-9]/g,'')/funnelCounts[3]).toLocaleString('en-US',{style:'currency',currency:'USD'});
const conversion  = `${((funnelCounts[3]/funnelCounts[0])*100).toFixed(1)}%`;

export default function Reports() {
  /* --------- simple date-range filter --------- */
  const [range,setRange] = useState('YTD');

  /* could recalc data based on range here */
  const handleRange = (label) => setRange(label);

  /* ------ base chart options ------ */
  const base = { maintainAspectRatio:false, plugins:{ legend:{ display:false } } };

  return (
    <PageWrapper>
      <PageHeader title="Reports" />

      {/* KPI cards */}
      <Row xs={2} md={4} className="g-3 mb-4">
        <Col><StatCard label="Total Sales (YTD)" value={totalSales} /></Col>
        <Col><StatCard label="Total Clients"      value={totalClients} /></Col>
        <Col><StatCard label="Avg. Deal Size"     value={avgDeal} /></Col>
        <Col><StatCard label="Visit → Close %"    value={conversion} /></Col>
      </Row>

      {/* date-range dropdown */}
      <div className="d-flex justify-content-end mb-3">
        <Dropdown onSelect={handleRange}>
          <Dropdown.Toggle size="sm" variant="outline-light">
            Range: {range}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {['YTD','Last 90 Days','Last 30 Days'].map(r=>(
              <Dropdown.Item eventKey={r} key={r}>{r}</Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </div>

      {/* charts */}
      <Row xs={1} lg={2} className="g-3">
        <Col>
          <ChartCard title="Monthly Sales Trend">
            <Line
              data={{ labels: monthLabels, datasets:[{ data:monthlySales, borderColor:'#ff9f40', tension:.3, pointRadius:0, borderWidth:2 }] }}
              options={base}
            />
          </ChartCard>
        </Col>
        <Col>
          <ChartCard title="Predictive Sales Forecast">
            <Line
              data={{
                labels: monthLabels,
                datasets:[
                  { label:'Actual', data:monthlySales, borderColor:'#4bc0c0', tension:.3, pointRadius:0, borderWidth:2 },
                  { label:'Predicted', data:predicted, borderColor:'#ff6384', borderDash:[6,6], tension:.3, pointRadius:0, borderWidth:2 }
                ]
              }}
              options={{ ...base, plugins:{ legend:{ display:true, position:'bottom' } } }}
            />
          </ChartCard>
        </Col>
      </Row>

      <Row xs={1} md={3} className="g-3 mt-0">
        <Col>
          <ChartCard title="Conversion Funnel">
            <Bar
              data={{ labels:funnelLabels, datasets:[{ backgroundColor:'#36a2eb', data:funnelCounts }] }}
              options={base}
            />
          </ChartCard>
        </Col>
        <Col>
          <ChartCard title="Client Growth (New Clients)">
            <Bar
              data={{ labels:monthLabels.slice(0,6), datasets:[{ backgroundColor:'#ff9f40', data:[15,22,30,45,55,65] }] }}
              options={base}
            />
          </ChartCard>
        </Col>
        <Col>
          <ChartCard title="Churn Risk Breakdown">
            <Doughnut
              data={{ labels:churnLabels, datasets:[{ backgroundColor:['#4bc0c0','#ff9f40','#ff6384'], data:churnPerc }] }}
              options={{ maintainAspectRatio:false, plugins:{ legend:{ position:'bottom' } } }}
            />
          </ChartCard>
        </Col>
      </Row>
    </PageWrapper>
  );
}
