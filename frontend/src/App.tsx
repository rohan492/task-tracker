import { Routes, Route } from "react-router-dom"

import CheckList from "./components/CheckList"
import Calendar from "./components/Calendar"

function App() {
  return (
    <Routes>
      <Route path="/" element={<CheckList />} />
      <Route path="/calendar" element={<Calendar />} />
    </Routes>
  )
}

export default App
