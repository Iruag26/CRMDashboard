// src/pages/Clients.jsx
import { useState, useMemo } from 'react';
import PageWrapper  from '../components/PageWrapper';
import PageHeader   from '../components/PageHeader';
import CsvToolbar   from '../components/CSVToolbar';
import SearchBar    from '../components/SearchBar';
import DataTable    from '../components/DataTable';
import Papa from 'papaparse';                 // npm i papaparse
import { Modal, Button, Form } from 'react-bootstrap'; // npm i react-bootstrap bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';

/* ---------- seed data ---------- */
const seed = [
  { id: 1, name: 'Acme Corp',   email: 'contact@acme.com',  status: 'Active',   value: 220000, last: 'Updated by Alice on Apr 29' },
  { id: 2, name: 'Globex Corp', email: 'info@globex.com',   status: 'Inactive', value:  40000, last: 'Updated by Bob on Apr 27' },
  { id: 3, name: 'Initech LLC', email: 'mail@initech.com',  status: 'Active',   value: 250000, last: 'Updated by Alice on Apr 29' },
  { id: 4,  name: 'Soylent Inc',    email: 'hello@soylent.com',    status: 'Active',   value: 135000, last: 'Updated by Carol on May 02' },
  { id: 5,  name: 'Umbrella PLC',   email: 'hq@umbrella.com',      status: 'Inactive', value:  97000, last: 'Updated by Dave on May 01'  },
  { id: 6,  name: 'Stark Industries', email: 'info@stark.com',     status: 'Active',   value: 880000, last: 'Updated by Tony on May 03'  },
  { id: 7,  name: 'Wayne Enterprises', email: 'contact@wayne.com', status: 'Active',   value: 640000, last: 'Updated by Bruce on Apr 30' },
  { id: 8,  name: 'Hooli',          email: 'support@hooli.com',    status: 'Inactive', value: 120000, last: 'Updated by Jared on May 02' },
  { id: 9,  name: 'Massive Dynamic', email: 'admin@massivedyn.com',status: 'Active',   value: 310000, last: 'Updated by Nina on May 04' },
  { id:10,  name: 'Wonka Industries', email:'sales@wonka.com',     status: 'Active',   value:  75000, last: 'Updated by Willy on May 05' },
];

/* ---------- generic table columns ---------- */
const columns = [
  { key: 'name',   label: 'Name' },
  { key: 'email',  label: 'Email' },
  { key: 'status', label: 'Status' },
  { key: 'value',  label: 'Value', render: v => `$${v.toLocaleString()}` },
  { key: 'last',   label: 'Last Activity' },
];

export default function Clients () {
  /* state */
  const [rows,   setRows]   = useState(seed);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('All');
  const [show,   setShow]   = useState(false);

  /* derived list */
  const filtered = useMemo(() =>
    rows.filter(r =>
      (status === 'All' || r.status === status) &&
      (r.name.toLowerCase().includes(search.toLowerCase()) ||
       r.email.toLowerCase().includes(search.toLowerCase()))
    ), [rows, search, status]);

  /* CRUD handlers */
  const addRow    = obj => setRows([...rows, { id: Date.now(), ...obj }]);
  const deleteRow = id  => setRows(rows.filter(r => r.id !== id));

  /* CSV handlers */
  const exportCSV = () => {
    const csv  = Papa.unparse(rows);
    const blob = new Blob([csv], { type:'text/csv;charset=utf-8;' });
    const link = Object.assign(document.createElement('a'), {
      href: URL.createObjectURL(blob),
      download: 'clients.csv'
    });
    link.click();
  };
  const importCSV = e => {
    const file = e.target.files[0];
    if (!file) return;
    Papa.parse(file, {
      header: true,
      complete: ({ data }) => setRows([...rows, ...data.filter(d => d.name)]),
    });
  };

  /* ----- inline modal component (kept inside page file) ----- */
  const AddModal = () => {
    const empty = { name:'', email:'', status:'Active', value:'' };
    const [form,setForm] = useState(empty);
    const change = e => setForm({ ...form, [e.target.name]: e.target.value });
    const save   = () => { addRow(form); setForm(empty); setShow(false); };

    return (
      <Modal show={show} onHide={() => setShow(false)} centered>
        <Modal.Header closeButton><Modal.Title>Add Client</Modal.Title></Modal.Header>
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
              <Form.Label>Status</Form.Label>
              <Form.Select name="status" value={form.status} onChange={change}>
                <option>Active</option><option>Inactive</option>
              </Form.Select>
            </Form.Group>
            <Form.Group>
              <Form.Label>Value ($)</Form.Label>
              <Form.Control name="value" value={form.value} onChange={change}/>
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

      <PageHeader title="Clients" buttonText="Add Client" onAdd={() => setShow(true)} />

      <CsvToolbar onExport={exportCSV} onImport={importCSV} />

      <div className="d-flex gap-2 mb-3">
        <SearchBar value={search} onChange={setSearch} placeholder="Search clients…" />
        <select className="form-select" style={{maxWidth:160}} value={status} onChange={e=>setStatus(e.target.value)}>
          <option>All</option><option>Active</option><option>Inactive</option>
        </select>
      </div>

      <DataTable columns={columns} rows={filtered} onDelete={deleteRow} />

      {show && <AddModal />}

    </PageWrapper>
  );
}
