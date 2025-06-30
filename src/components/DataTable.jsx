// src/components/DataTable.jsx
const DataTable = ({ columns, rows, onDelete, onEdit }) => (
  <table className="table table-sm table-hover align-middle">
    <thead className="table-light">
      <tr>
        {columns.map(col => (
          <th key={col.key} className="px-3 py-2">
            {col.label}
          </th>
        ))}
        {(onEdit || onDelete) && <th className="px-3 py-2" />}
      </tr>
    </thead>

    <tbody>
      {rows.map(r => (
        <tr key={r.id}>
          {columns.map(col => (
            <td key={col.key} className="px-3 py-2">
              {col.render ? col.render(r[col.key], r) : r[col.key]}
            </td>
          ))}

          {(onEdit || onDelete) && (
            <td className="text-nowrap px-3 py-2">
              {onEdit   && (
                <i
                  className="bi bi-pencil me-2"
                  onClick={() => onEdit(r)}
                  style={{ cursor: 'pointer' }}
                />
              )}
              {onDelete && (
                <i
                  className="bi bi-trash text-danger"
                  onClick={() => onDelete(r.id)}
                  style={{ cursor: 'pointer' }}
                />
              )}
            </td>
          )}
        </tr>
      ))}
    </tbody>
  </table>
);

export default DataTable;
