import { createBrowserRouter } from "react-router-dom";

// video----------
import VideoHome from "../views/video/home";

const router = createBrowserRouter([
  // video
  {
    path: "/",
    element: <VideoHome />,
  },
]);

export default router;
