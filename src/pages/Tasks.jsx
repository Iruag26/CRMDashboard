// src/pages/Tasks.jsx
import { useState, useMemo } from 'react';
import PageWrapper  from '../components/PageWrapper';
import PageHeader   from '../components/PageHeader';
import SearchBar    from '../components/SearchBar';
import DataTable    from '../components/DataTable';
import Badge        from '../components/Badge';
import { Modal, Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

/* ---------- seed tasks ---------- */
const seed = [
  { id: 1, name: 'Follow up with new client',   priority: 'Low',  due: 'Apr 20, 2024', status: 'Open' },
  { id: 2, name: 'Send proposal to client',     priority: 'Low',  due: 'Apr 20, 2024', status: 'Open' },
  { id: 3, name: 'Prepare presentation',        priority: 'Med',  due: 'Apr 20, 2024', status: 'Open' },
  { id: 4, name: 'Update client information',   priority: 'Low',  due: 'Apr 21, 2024', status: 'Open' },
  { id: 5, name: 'Schedule meeting',            priority: 'Med',  due: 'Apr 21, 2024', status: 'Open' },
  { id: 6, name: 'Research industry trends',    priority: 'High', due: 'May  2, 2024', status: 'Open' },
  { id: 7,  name: 'Draft quarterly report',      priority: 'High', due: 'May  5, 2024', status: 'In Progress' },
  { id: 8,  name: 'Client onboarding checklist', priority: 'Low',  due: 'May 10, 2024', status: 'Open' },
  { id: 9,  name: 'Product demo rehearsal',      priority: 'Med',  due: 'May 12, 2024', status: 'In Progress' },
  { id: 10, name: 'Finalize contract terms',     priority: 'High', due: 'May 15, 2024', status: 'Open' },
  { id: 11, name: 'Team retrospective meeting',  priority: 'Low',  due: 'May 18, 2024', status: 'Completed' },
  { id: 12, name: 'Update CRM fields',           priority: 'Low',  due: 'May 18, 2024', status: 'Completed' },
  { id: 13, name: 'Design marketing flyer',      priority: 'Med',  due: 'May 22, 2024', status: 'Open' },
  { id: 14, name: 'Bug-fix QA round',            priority: 'High', due: 'May 25, 2024', status: 'In Progress' },
  { id: 15, name: 'Schedule performance reviews',priority: 'Low',  due: 'May 30, 2024', status: 'Open' },
];

/* ---------- table columns ---------- */
const columns = [
  { key: 'name',     label: 'Task' },
  { key: 'priority', label: 'Priority', render: p => <Badge label={p} /> },
  { key: 'due',      label: 'Due Date' },
  { key: 'status',   label: 'Status' },
];

export default function Tasks () {
  /* ------------- state ------------- */
  const [rows,       setRows]       = useState(seed);
  const [search,     setSearch]     = useState('');
  const [statusTab,  setStatusTab]  = useState('All');
  const [sortBy,     setSortBy]     = useState('Priority');
  const [showModal,  setShowModal]  = useState(false);

  /* --------- derived rows ---------- */
  const filtered = useMemo(() => {
    let list = rows.filter(r =>
      (statusTab === 'All' || r.status === statusTab) &&
      r.name.toLowerCase().includes(search.toLowerCase())
    );

    if (sortBy === 'Priority') {
      const order = { High: 0, Med: 1, Low: 2 };
      list.sort((a,b) => order[a.priority] - order[b.priority]);
    } else if (sortBy === 'Due Date') {
      list.sort((a,b) => new Date(a.due) - new Date(b.due));
    }
    return list;
  }, [rows, search, statusTab, sortBy]);

  /* ------------- handlers ---------- */
  const deleteRow = id => setRows(rows.filter(r => r.id !== id));
  const addRow    = obj => setRows([...rows, { id: Date.now(), ...obj }]);

  /* ---------- Add-Task Modal (inline) ---------- */
  const AddTaskModal = () => {
    const blank = { name:'', priority:'Low', due:'', status:'Open' };
    const [form,setForm] = useState(blank);
    const change = e => setForm({ ...form, [e.target.name]: e.target.value });
    const save   = () => { addRow(form); setShowModal(false); };

    return (
      <Modal show={showModal} onHide={()=>setShowModal(false)} centered>
        <Modal.Header closeButton><Modal.Title>Add Task</Modal.Title></Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-2">
              <Form.Label>Task</Form.Label>
              <Form.Control name="name" value={form.name} onChange={change}/>
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Priority</Form.Label>
              <Form.Select name="priority" value={form.priority} onChange={change}>
                <option>Low</option><option>Med</option><option>High</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Due Date</Form.Label>
              <Form.Control type="date" name="due" value={form.due} onChange={change}/>
            </Form.Group>

            <Form.Group>
              <Form.Label>Status</Form.Label>
              <Form.Select name="status" value={form.status} onChange={change}>
                <option>Open</option><option>In Progress</option><option>Completed</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={()=>setShowModal(false)}>Cancel</Button>
          <Button variant="primary"   onClick={save}>Save</Button>
        </Modal.Footer>
      </Modal>
    );
  };

  /* ------------------- UI ------------------- */
  return (
    <PageWrapper>

      <PageHeader title="Tasks" buttonText="Add Task" onAdd={() => setShowModal(true)} />

      {/* unified filter / search / sort bar */}
      <div className="d-flex flex-wrap align-items-center gap-2 mb-3">

        {/* status tabs */}
        <div className="btn-group">
          {['All','Open','In Progress','Completed'].map(lbl => (
            <button
              key={lbl}
              className={`btn btn-sm ${statusTab===lbl ? 'btn-primary' : 'btn-outline-light'}`}
              onClick={() => setStatusTab(lbl)}
            >
              {lbl}
            </button>
          ))}
        </div>

        {/* search (stretches) */}
        <div className="flex-grow-1 mx-2">
          <SearchBar
            value={search}
            onChange={setSearch}
            placeholder="Search tasks…"
          />
        </div>

        {/* sort dropdown */}
        <div className="d-flex align-items-center gap-1">
          <span className="text-light small">Sort&nbsp;By:</span>
          <select
            className="form-select form-select-sm"
            style={{ maxWidth: 160 }}
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
          >
            <option>Priority</option>
            <option>Due Date</option>
          </select>
        </div>
      </div>

      <DataTable columns={columns} rows={filtered} onDelete={deleteRow} />

      {showModal && <AddTaskModal />}
    </PageWrapper>
  );
}
