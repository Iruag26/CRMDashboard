// src/pages/Leads.jsx
import { useState, useMemo } from 'react';
import PageWrapper  from '../components/PageWrapper';
import PageHeader   from '../components/PageHeader';
import CsvToolbar   from '../components/CSVToolbar';
import SearchBar    from '../components/SearchBar';
import DataTable    from '../components/DataTable';
import Badge        from '../components/Badge';
import Papa from 'papaparse';
import { Modal, Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';  // once per app is fine

/* ---------- seed leads ---------- */
const seed = [
  { id: 1, name: 'John Doe',  email: 'john@abc.com',  company: 'ABC Inc', score: 'Low',  last: '3 days ago' },
  { id: 2, name: 'Jane Smith',email: 'jane@xyz.com',  company: 'XYZ Ltd', score: 'High', last: '3 days ago' },
  { id: 3, name: 'Jim Brown', email: 'jim@123.com',  company: '123 Corp', score: 'High', last: '2 days ago' },
  { id: 4,  name: 'Sara Lee',     email: 'sara@acme.com',    company: 'Acme Co',        score: 'Med',  last: '1 day ago'  },
  { id: 5,  name: 'Mike Evans',   email: 'mike@waynetech.com',company:'WayneTech',      score: 'Low',  last: '4 days ago' },
  { id: 6,  name: 'Linda Park',   email: 'linda@hooli.com',  company: 'Hooli',          score: 'High', last: '5 days ago' },
  { id: 7,  name: 'Carlos Diaz',  email: 'carlos@umbrella.com',company: 'Umbrella PLC', score: 'Med',  last: '6 days ago' },
  { id: 8,  name: 'Emily Wong',   email: 'emily@massdyn.com',company: 'Massive Dynamic',score: 'Low',  last: '2 days ago' },
  { id: 9,  name: 'Raj Stark',    email: 'raj@stark.com',    company: 'Stark Industries',score:'High', last: '7 days ago' },
  { id: 10, name: 'Hannah Kim',   email: 'hannah@wonka.com', company: 'Wonka Industries',score:'Med',  last: '1 day ago' },
];

/* ---------- table columns ---------- */
const columns = [
  { key: 'name',    label: 'Name'    },
  { key: 'email',   label: 'Email'   },
  { key: 'company', label: 'Company' },
  { key: 'score',   label: 'Score', render: s => <Badge label={s} /> },
  { key: 'last',    label: 'Last Contact' },
];

export default function Leads () {
  /* state */
  const [rows,   setRows]   = useState(seed);
  const [search, setSearch] = useState('');
  const [score,  setScore]  = useState('All');
  const [show,   setShow]   = useState(false);

  /* derived list */
  const filtered = useMemo(() =>
    rows.filter(r =>
      (score === 'All' || r.score === score) &&
      [r.name, r.email, r.company].some(field =>
        field.toLowerCase().includes(search.toLowerCase())
      )
    ), [rows, search, score]);

  /* handlers */
  const addRow    = obj => setRows([...rows, { id: Date.now(), ...obj }]);
  const deleteRow = id  => setRows(rows.filter(r => r.id !== id));

  const exportCSV = () => {
    const csv = Papa.unparse(rows);
    const blob = new Blob([csv], { type:'text/csv;charset=utf-8;' });
    const a = Object.assign(document.createElement('a'), {
      href: URL.createObjectURL(blob),
      download: 'leads.csv',
    });
    a.click();
  };
  const importCSV = e => {
    const file = e.target.files[0];
    if (!file) return;
    Papa.parse(file, {
      header: true,
      complete: ({ data }) =>
        setRows([...rows, ...data.filter(d => d.name)]),
    });
  };

  /* ---------- inline modal ---------- */
  const AddLeadModal = () => {
    const blank = { name:'', email:'', company:'', score:'Low', last:'today' };
    const [form,setForm] = useState(blank);
    const change = e => setForm({ ...form, [e.target.name]: e.target.value });
    const save   = () => { addRow(form); setForm(blank); setShow(false); };

    return (
      <Modal show={show} onHide={() => setShow(false)} centered>
        <Modal.Header closeButton><Modal.Title>Add Lead</Modal.Title></Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-2">
              <Form.Label>Name</Form.Label>
              <Form.Control name="name" value={form.name} onChange={change}/>
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Email</Form.Label>
              <Form.Control name="email" value={form.email} onChange={change}/>
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Company</Form.Label>
              <Form.Control name="company" value={form.company} onChange={change}/>
            </Form.Group>
            <Form.Group>
              <Form.Label>Score</Form.Label>
              <Form.Select name="score" value={form.score} onChange={change}>
                <option>Low</option><option>Med</option><option>High</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={()=>setShow(false)}>Cancel</Button>
          <Button variant="primary"   onClick={save}>Save</Button>
        </Modal.Footer>
      </Modal>
    );
  };

  /* ---------- UI ---------- */
  return (
    <PageWrapper>

      <PageHeader title="Leads" buttonText="Add Lead" onAdd={() => setShow(true)} />

      <CsvToolbar onExport={exportCSV} onImport={importCSV} />

      <div className="d-flex gap-2 mb-3">
        <SearchBar value={search} onChange={setSearch} placeholder="Search leads…" />
        <select className="form-select" style={{maxWidth:160}} value={score} onChange={e=>setScore(e.target.value)}>
          <option>All</option><option>Low</option><option>Med</option><option>High</option>
        </select>
      </div>

      <DataTable columns={columns} rows={filtered} onDelete={deleteRow} />

      {show && <AddLeadModal />}
    </PageWrapper>
  );
}
