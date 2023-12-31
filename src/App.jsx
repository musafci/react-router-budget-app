import {
	createBrowserRouter,
	RouterProvider,
  } from "react-router-dom";

  // Libray
  import { ToastContainer } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
  
  // Layouts
  import Main, { mainLoader } from "./layouts/Main";
  
  // Actions
  import { logoutAction } from "./actions/logout";
  
  // Routes
  import Dashboard, { dashboardAction, dashboardLoader } from "./pages/Dashboard";
  import Error from "./pages/Error";
  import ExpensesPage, { expensesAction, expensesLoader } from "./pages/ExpensesPage";
  import BudgetPage, { budgetAction, budgetLoader } from "./pages/BudgetPage";
import { deleteBudget } from "./actions/deleteBudget";
  
  const router = createBrowserRouter([
	{
		path: "/",
		element: <Main />,
		loader: mainLoader,
		errorElement: <Error />,
		children: [
			{
				index: true,
				element: <Dashboard />,
				loader: dashboardLoader,
				action: dashboardAction,
				errorElement: <Error />
			},
			{
				path: "budgets/:id",
				element: <BudgetPage />,
				action: budgetAction,
				loader: budgetLoader,
				errorElement: <Error />,
				children: [
					{
						path: "delete",
						action: deleteBudget,
					},
				],
			},
			{
				path: "expenses",
				element: <ExpensesPage />,
				action: expensesAction,
				loader: expensesLoader,
				errorElement: <Error />
			},
			{
				path: "logout",
				action: logoutAction
			}
		]
	},
  ]);
  
  function App() {
	return <div className="App">
		<RouterProvider router={router} />
		<ToastContainer />
	</div>;
  }
  
  export default App;