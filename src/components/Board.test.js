import { fireEvent, render, screen } from "@testing-library/react";
import Board from "./Board";
import { shallow } from "enzyme";

describe("Basic rendering of Board", () => {
  it("Should have 9 squares", () => {
    const board = shallow(<Board />);
    expect(board.find(".square").length).toBe(9);
  });

  it("should render 3 rows of square boards", () => {
    const board = shallow(<Board />);
    expect(board.find(".board-row")).toHaveLength(3);
  });
});

describe("Testing square button clicking functionality", () => {
  it("should render X on odd number of clicks", () => {
    render(<Board />);
    const square0 = screen.getByTestId("square-0");
    fireEvent.click(square0);
    expect(square0).toHaveValue("X");
  });

  it("should render O on even number of clicks", () => {
    render(<Board />);
    const square0 = screen.getByTestId("square-0");
    const square1 = screen.getByTestId("square-1");
    fireEvent.click(square0);
    fireEvent.click(square1);
    expect(square1).toHaveValue("O");
  });
});

describe("Testing functionality of status button", () => {
  it("should render Next Player: X initially", () => {
    render(<Board />);
    expect(screen.getByTestId("status")).toHaveTextContent("Next Player: X");
  });

  it("should render Next Player: O after first click", () => {
    render(<Board />);
    fireEvent.click(screen.getByTestId('square-0'))
    expect(screen.getByTestId("status")).toHaveTextContent("Next Player: O");
  })
});

describe("Testing for winner", () => {
  it("should render Winner: X when player X wins", () => {
    render(<Board />);
    fireEvent.click(screen.getByTestId("square-0")); // X on square 0
    fireEvent.click(screen.getByTestId("square-1")); // O on square 1
    fireEvent.click(screen.getByTestId("square-4")); // X on square 4
    fireEvent.click(screen.getByTestId("square-2")); // O on square 2
    fireEvent.click(screen.getByTestId("square-8")); // X on square 8

    // At this stage X should have won
    expect(screen.getByTestId("status")).toHaveTextContent("Winner: X");
  });

  it("should render Winner: O when player O wins", () => {
    render(<Board />);
    fireEvent.click(screen.getByTestId("square-0")); // X on square 0
    fireEvent.click(screen.getByTestId("square-6")); // O on square 6
    fireEvent.click(screen.getByTestId("square-8")); // X on square 8
    fireEvent.click(screen.getByTestId("square-4")); // O on square 4
    fireEvent.click(screen.getByTestId("square-7")); // X on square 7
    fireEvent.click(screen.getByTestId("square-2")); // O on square 2

    // At this stage O should have won
    expect(screen.getByTestId("status")).toHaveTextContent("Winner: O");
  });
});
 11 changes: 11 additions & 0 deletions11  
