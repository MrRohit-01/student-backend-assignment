import Express from "express";
import axios from "axios";
const app = Express();
const port = 3000;

app.use(Express.json());

let inMemeoryData = null;

async function userData() {
  const data = await axios.get("https://dummyjson.com/users");
  return data.data;
}

(async () => {
  try {
    inMemeoryData = await userData();
    console.log("✅ User data fetched");
  } catch (e) {
    console.log("❌ Error fetching data:", e);
  }
})();

app.get("/students", (req, res) => {
  return res.json(inMemeoryData);
});

app.post("/students", (req, res) => {
  try {
    const body = req.body;
    inMemeoryData.users.push(body);
    return res.json({ msg: "Student Data Added" });
  } catch (e) {
    return res.status(500).json({ msg: "error" });
  }
});

app.delete("/students/:id", (req, res) => {
  const id = Number(req.params.id);
  const length = inMemeoryData.users.length;
  try {
    inMemeoryData.users = inMemeoryData.users.filter((data) => data.id !== id);
    if (length > inMemeoryData.users.length) {
      return res.json({ msg: "id removed" });
    } else {
      return res.json({ msg: "id not found" });
    }
  } catch (e) {
    return res.status(500).json({ msg: "error" });
  }
});

app.get("/students/:id", (req, res) => {
  const id = Number(req.params.id);
  try {
    const user = inMemeoryData.users.find((data) => data.id === id);
    if (user) {
      return res.json({ user });
    } else {
      return res.status(404).json({ msg: "id not found" });
    }
  } catch (e) {
    return res.status(500).json({ msg: "error" });
  }
});

app.get("/dashboard/stats", (req, res) => {
  try {
    const { users = [], projects = [] } = inMemeoryData;

    const stats = {
      totalUsers: users.length,
      totalProjects: projects.length,
      totalEmails: users.length,
      avgAge: users.length
        ? (users.reduce((sum, u) => sum + (u.age || 0), 0) / users.length).toFixed(1)
        : 0,
      activeUsers: users.filter((u) => u.isActive).length,
      latestUser: users.at(-1) || null,
    };

    return res.json(stats);
  } catch (e) {
    return res.status(500).json({ msg: "error" });
  }
});

app.listen(port, () => {
  console.log(`🚀 Server is running on http://localhost:${port}`);
});
