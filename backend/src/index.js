import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Login from './pages/Login';
import AdminIndex from './pages/AdminIndex';
import AddArticle from './pages/AddArticle';
import ArticleList from './pages/ArticleList';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Login />}></Route>
      <Route path="index" element={<AdminIndex />}>
        <Route index element={<AddArticle />} />
        <Route path="add" element={<AddArticle />} />
        <Route path="add/:id" element={<AddArticle />} />
        <Route path="list" element={<ArticleList />} />
        
      </Route>
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
