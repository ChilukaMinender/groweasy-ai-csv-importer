interface Props {
  imported: number;
  skipped: number;
}

export default function SummaryCards({
  imported,
  skipped,
}: Props) {
  return (
    <div className="grid grid-cols-3 gap-6 mt-8">

      <div className="bg-green-100 rounded-xl p-6">
        <h2 className="font-bold">Imported</h2>
        <p className="text-4xl">{imported}</p>
      </div>

      <div className="bg-red-100 rounded-xl p-6">
        <h2 className="font-bold">Skipped</h2>
        <p className="text-4xl">{skipped}</p>
      </div>

      <div className="bg-blue-100 rounded-xl p-6">
        <h2 className="font-bold">AI Confidence</h2>
        <p className="text-4xl">98%</p>
      </div>

    </div>
  );
}