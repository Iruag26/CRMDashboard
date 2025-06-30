const CsvToolbar = ({ onExport, onImport, accept = '.csv' }) => (
  <div className="d-flex gap-2 mb-3">
    <button className="btn btn-outline-light btn-sm" onClick={onExport}>CSV Export</button>
    <input type="file" accept={accept} id="csvInput" hidden onChange={onImport} />
    <label htmlFor="csvInput" className="btn btn-outline-light btn-sm mb-0">CSV Import</label>
  </div>
);
export default CsvToolbar;
