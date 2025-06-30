const PageHeader = ({ title, buttonText, onAdd }) => (
  <div className="d-flex justify-content-between align-items-center mb-3">
    <h2>{title}</h2>
    <button className="btn btn-primary btn-sm" onClick={onAdd}>{buttonText}</button>
  </div>
);
export default PageHeader;
