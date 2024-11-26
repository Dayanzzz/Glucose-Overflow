import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import Layout from './Layout';
import HomePage from '../components/HomePage/HomePage';
import GlucoseTracker from '../components/GlucoseTracker/GlucoseTracker';
import NewGlucose from '../components/GlucoseTracker/NewGlucose';
import CreateQuestion from '../components/Question/CreateQuestion';
import UpdateGlucose from '../components/GlucoseTracker/UpdateGlucose';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <HomePage/>,
      },
      {
        path: "login",
        element: <LoginFormPage />,
      },
      {
        path: "signup",
        element: <SignupFormPage />,
      },
      // {
      //   path: "recipes",
      //   element: <Recipes />,
      // },
      // {
      //   path: "recipe/new",
      //   element: <CreateRecipe />,
      // },
      // {
      //   path: "recipe/manage",
      //   element: <RecipeManager />,
      // },
      {
        path: "glucose",
        element: <GlucoseTracker />,
      },
      {
        path: "glucose/new",
        element: <NewGlucose />,
      },
      {
        path: "glucose/:entryId",
        element: <UpdateGlucose />,
      },
      // {
      //   path: "favorites",
      //   element: <Favorites />,
      // },
      // {
      //   path: "stars",
      //   element: <StarQuestions />,
      // },
      // {
      //   path: "questions",
      //   element: <Questions />,
      // },
      // {
      //   path: "questions/manage",
      //   element: <QuestionManage />,
      // },
      {
        path: "questions/ask",
        element: <CreateQuestion />,
      },
    ],
  },
]);