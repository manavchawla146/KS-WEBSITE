import { NextResponse } from "next/server";

const REMOTE_FACULTY_URL = "https://ks-server-hqsn.onrender.com/api/faculty";

const sampleMember = {
  _id: "f1",
  name: "Dr. Alice Example",
  designation: "Assistant Professor",
  department: "Computer Science",
  qualification: "Ph.D. Computer Science",
  email: "alice@example.com",
  profileImage: "Public/Faculty/default.jpg",
  category: "MSCIT",
};

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const res = await fetch(`${REMOTE_FACULTY_URL}/${id}`, { method: 'GET' });
    if (!res.ok) {
      const text = await res.text().catch(() => 'unable to read body');
      console.warn('Remote faculty fetch failed', res.status, text);
      throw new Error(`remote responded ${res.status}`);
    }
    const json = await res.json();
    const member = json.faculty || json || null;
    return NextResponse.json({ success: true, faculty: member });
  } catch (err) {
    console.warn('Failed to fetch remote faculty member, returning sample.', err);
    return NextResponse.json({ success: true, faculty: sampleMember });
  }
}
