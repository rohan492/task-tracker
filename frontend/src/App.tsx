import { Routes, Route } from "react-router-dom"

import CheckList from "./components/CheckList"
import Calendar from "./components/Calendar/Calendar"
import Create from "./components/Create"

function App() {
  return (
    <Routes>
      <Route path="/" element={<CheckList />} />
      <Route path="/calendar" element={<Calendar />} />
      <Route path="/create" element={<Create />} />
    </Routes>
  )
}

export default App
