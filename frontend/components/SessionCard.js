export default function SessionCard({ session }) {
  const statusColor = session.status === "Pending" ? "orange" : "green";
  return (
    <div className="border p-4 rounded shadow mb-2 flex justify-between items-center">
      <div>
        <p><strong>Date:</strong> {session.date}</p>
        <p><strong>Time:</strong> {session.time}</p>
        <p><strong>Type:</strong> {session.sessionType}</p>
        <p><strong>Status:</strong> <span className={`text-${statusColor}-500 font-semibold`}>{session.status}</span></p>
      </div>
      {session.status === "Approved" && (
        <a href={`/dashboard/session/${session.id}`} className="bg-blue-600 text-white px-4 py-2 rounded">Join</a>
      )}
    </div>
  );
}
