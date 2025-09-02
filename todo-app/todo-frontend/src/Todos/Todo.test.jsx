// src/components/Todo.test.jsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom';
import Todo from "./Todo";

describe("Todo component", () => {
  const todo = { id: 1, text: "Learn Docker", done: false };
  const mockDelete = vi.fn();
  const mockComplete = vi.fn();

  it("renders todo text", () => {
    render(<Todo todo={todo} deleteTodo={mockDelete} completeTodo={mockComplete} />);
    expect(screen.getByText("Learn Docker")).toBeInTheDocument();
  });

  it("calls delete when Delete button clicked", () => {
    render(<Todo todo={todo} deleteTodo={mockDelete} completeTodo={mockComplete} />);
    fireEvent.click(screen.getByText("Delete"));
    expect(mockDelete).toHaveBeenCalledWith(todo);
  });

  it("calls complete when Set as done button clicked", () => {
    render(<Todo todo={todo} deleteTodo={mockDelete} completeTodo={mockComplete} />);
    fireEvent.click(screen.getByText("Set as done"));
    expect(mockComplete).toHaveBeenCalledWith(todo);
  });

  it("shows correct info when done", () => {
    render(<Todo todo={{ ...todo, done: true }} deleteTodo={mockDelete} completeTodo={mockComplete} />);
    expect(screen.getByText("This todo is done")).toBeInTheDocument();
    expect(screen.getByText("Delete")).toBeInTheDocument();
    expect(screen.queryByText("Set as done")).toBeNull();
  });
});
