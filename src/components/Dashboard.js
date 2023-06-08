import React, { useState } from "react";
import { Button, Alert, Navbar, Nav, Table, Container } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";

export default function Dashboard() {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const history = useHistory();

  const [fixAmount, setFixAmount] = useState("");
  const [expenseAmount, setExpenseAmount] = useState("");
  const [date, setDate] = useState("");
  const [itemName, setItemName] = useState("");
  const [expenses, setExpenses] = useState([]);
 
  const [emailSent, setEmailSent] = useState(false);

  async function handleLogout() {
    setError("");
    setEmailSent(false);

    try {
      await logout();
      history.push("/login");
    } catch {
      setError("Failed to log out");
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    // Handle the submission logic here
    // You can access the input values with fixAmount, expenseAmount, date, and itemName

    // Calculate remaining amount after deducting the expense
    
     const remainingAmount =
      fixAmount -
      expenses.reduce((total, exp) => total + parseInt(exp.expenseAmount), 0);

    // Create a new expense object
    const newExpense = {
      itemName,
      expenseAmount,
      date,
    };

    // Add the new expense to the expenses array
    setExpenses((prevExpenses) => [...prevExpenses, newExpense]);

    // Clear the input fields
    setExpenseAmount("");
    setDate("");
    setItemName("");
  }

  function handleShare() {
    // Create the email content
    const emailContent = `
      Expense List:
      ${expenses
        .map(
          (expense, index) =>
            `${index + 1}. Item Name: ${expense.itemName}, Expense Amount: ${expense.expenseAmount}, Date: ${expense.date}`
        )
        .join("\n")}`;

    const emailSubject = "Expense List";
    const toEmail = currentUser.email;

    // Construct the mailto URL
    const mailtoUrl = `mailto:${toEmail}?subject=${encodeURIComponent(
      emailSubject
    )}&body=${encodeURIComponent(emailContent)}`;

    // Open the user's default email client
    window.location.href = mailtoUrl;
  }

  function handleDownload() {
    // Create the file content
    const fileContent = `Expense List:\n${expenses
      .map(
        (expense, index) =>
          `${index + 1}. Item Name: ${expense.itemName}, Expense Amount: ${expense.expenseAmount}, Date: ${expense.date}`
      )
      .join("\n")}`;
  
    // Create a Blob from the file content
    const blob = new Blob([fileContent], { type: "text/plain" });
  
    // Create a URL for the Blob
    const url = URL.createObjectURL(blob);
  
    // Create a temporary <a> element to trigger the download
    const link = document.createElement("a");
    link.href = url;
    link.download = "expense-list.txt";
    link.click();
  
    // Clean up the URL and the temporary <a> element
    URL.revokeObjectURL(url);
    link.remove();
  }

  return (
    <>
      <Navbar bg="light" expand="lg" variant="light" className="fixed-top w-100">
        <Navbar.Brand as={Link} to="/">
          Expense Tracker App
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <button
              type="button"
              className="btn btn-primary ml-2"
              onClick={handleDownload}
            >
              Download
            </button>
            <Button variant="link" onClick={handleShare}>
              Share
            </Button>
            <Nav.Link as={Link} to="/update-profile">
              Update Profile
            </Nav.Link>
            <Button variant="link" onClick={handleLogout}>
              Log Out
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <Container fluid className="mt-4">
        <div className="bg-white p-4">
          <h2 className="text-center mb-4">Expense Calculator</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <strong>Email:</strong> {currentUser.email}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="fixAmount">Fixed Amount:</label>
              <input
                type="text"
                className="form-control"
                id="fixAmount"
                value={fixAmount}
                onChange={(e) => setFixAmount(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="expenseAmount">Expense Amount:</label>
              <input
                type="text"
                className="form-control"
                id="expenseAmount"
                value={expenseAmount}
                onChange={(e) => setExpenseAmount(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="date">Date:</label>
              <input
                type="date"
                className="form-control"
                id="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="itemName">Item Name:</label>
              <input
                type="text"
                className="form-control"
                id="itemName"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
              />
            </div>
            <div className="text-center">
              <button type="submit" className="btn btn-primary">
                Add Expense
              </button>
            </div>
          </form>
        </div>
      </Container>

      <Container fluid className="mt-4">
        <div className="bg-white p-4 mb-4 container-fluid w-100">
          <div className="row">
            <div className="col">
              <h2 className="text-center mb-4">Expense List</h2>
              {expenses.length === 0 ? (
                <p className="text-center">No expenses added yet.</p>
              ) : (
                <Table striped bordered>
                  <thead>
                    <tr>
                      <th>Item Name</th>
                      <th>Expense Amount</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {expenses.map((expense, index) => (
                      <tr key={index}>
                        <td>{expense.itemName}</td>
                        <td>{expense.expenseAmount}</td>
                        <td>{expense.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
              {fixAmount && (
                <div className="text-center mt-3">
                  <strong>Remaining Amount:</strong>{" "}
                  {fixAmount -
                    expenses.reduce(
                      (total, exp) => total + parseInt(exp.expenseAmount),
                      0
                    )}
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
