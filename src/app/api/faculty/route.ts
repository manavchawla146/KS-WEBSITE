import { NextResponse } from "next/server";

const REMOTE_FACULTY_URL = "https://ks-server-hqsn.onrender.com/api/faculty";

const sampleFaculty = [
  {
    _id: "f1",
    name: "Dr. Alice Example",
    designation: "Assistant Professor",
    department: "Computer Science",
    qualification: "Ph.D. Computer Science",
    email: "alice@example.com",
    profileImage: "Public/Faculty/default.jpg",
    category: "MSCIT",
  },
];

export async function GET() {
  try {
    const res = await fetch(REMOTE_FACULTY_URL, { method: 'GET' });
    if (!res.ok) throw new Error(`remote responded ${res.status}`);
    const json = await res.json();
    const faculty = json.faculty || json || [];
    return NextResponse.json({ success: true, faculty });
  } catch (err) {
    console.warn('Failed to fetch remote faculty, returning sample data.', err);
    return NextResponse.json({ success: true, faculty: sampleFaculty });
  }
}
