// rrd imports
import { useLoaderData } from "react-router-dom";

// library imports
import { toast } from "react-toastify";

// components
import Intro from "../components/Intro";

//  helper functions
import { createBudget, fetchData } from "../helpers"
import AddBudgetForm from "../components/AddBudgetForm";

// loader
export function dashboardLoader() {
	const userName = fetchData("userName");
	const budgets = fetchData("budgets");
	return { userName, budgets }
}

// action
export async function dashboardAction({ request }) {
	const data = await request.formData();
	const {_action, ...values} = Object.fromEntries(data)

	// new user submission
	if(_action === "newUser") {
		try {
			localStorage.setItem("userName", JSON.stringify(values.userName))
			return toast.success(`Welcome, ${values.userName}! You're all set up!`)
		} catch (e) {
			throw new Error("There was a problem creating your account.")
		}
	}

	// create new budget
	if (_action === "createBudget") {
		try {
			createBudget({
				name: values.newBudget,
				amount: values.newBudgetAmount,
			})
			return toast.success("Budget created successfully!")	
		} catch (e) {
			throw new Error("There was a problem creating your budget.")
		}
	}
}

const Dashboard = () => {
  const { userName, budgets } = useLoaderData()

  return (
    <>
      {userName ? (
		<div className="dashboard">
			<h1>Welcome back, <span className="accent">{userName}</span></h1>
			<div className="grid-sm">
				{/* {budgets ? () : ()} */}
				<div className="grid-lg">
					<div className="flex-lg">
						<AddBudgetForm/>
					</div>
				</div>
			</div>
		</div>
		) : <Intro />}
    </>
  )
}
export default Dashboard