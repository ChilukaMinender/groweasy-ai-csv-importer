interface Props {
  columns: string[];
}

export default function MappingTable({ columns }: Props) {
  return (
    <div className="mt-8 bg-white rounded-xl shadow border p-6">
      <h2 className="text-2xl font-bold mb-4">
        AI Field Mapping
      </h2>

      <table className="w-full">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 text-left">CSV Field</th>
            <th className="p-3 text-left">CRM Field</th>
            <th className="p-3 text-left">Confidence</th>
          </tr>
        </thead>

        <tbody>
          {columns.map((col, index) => (
            <tr key={index} className="border-b">
              <td className="p-3">{col}</td>

              <td className="p-3 text-green-700 font-semibold">
                {col}
              </td>

              <td className="p-3">
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">
                  98%
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}