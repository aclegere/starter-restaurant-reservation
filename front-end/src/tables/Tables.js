import React, { useState } from "react";
import { useHistory } from "react-router";
import { createTable } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";

export default function Tables() {
  const history = useHistory();
  const initForm = { table_name: "", capacity: 0 };
  const [tableForm, setTableForm] = useState({ ...initForm });
  const [tableError, setTableError] = useState(null);

  function handleFormChange(e) {
    setTableForm({
      ...tableForm,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const abortController = new AbortController();
    try {
      tableForm.capacity = Number(tableForm.capacity);
      const response = await createTable(tableForm, abortController.signal);
      if (response) {
        history.push("/dashboard");
      }
    } catch (error) {
      setTableError(error);
    }
    return () => abortController.abort();
  }

  function handleCancel() {
    history.goBack();
  }

  return (
    <>
      <div className="d-flex justify-content-center pt-3">
        <h3>Create a New Table</h3>
      </div>
      <ErrorAlert error={tableError} />
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="table_name"
          className="form-control mb-1"
          id="table_name"
          placeholder="Table"
          value={tableForm.table_name}
          onChange={handleFormChange}
          minLength={2}
          required
        />
        <input
          type="number"
          name="capacity"
          className="form-control mb-1"
          id="capacity"
          placeholder="Number of guests"
          value={Number(tableForm.capacity)}
          onChange={handleFormChange}
          min="1"
          required
        />
        <div className="d-flex justify-content-center">
          <button type="submit" className="btn btn-primary mr-1">
            Submit
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </form>
    </>
  );
}
