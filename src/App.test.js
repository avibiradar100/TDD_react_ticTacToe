import { fireEvent, render} from "@testing-library/react";
import Board from "./Board";
import { shallow } from "enzyme";

describe("Basic rendering of the Board", () => {

  test("Should have 9 squares", () => {
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
    const {getByTestId} = render(<Board />);
    const square0 = getByTestId("square-0");
    fireEvent.click(square0);
    expect(square0).toHaveValue("X");
  });

  it("should render O on even number of clicks", () => {
    const {getByTestId} = render(<Board />);
    const square0 = getByTestId("square-0");
    const square1 = getByTestId("square-1");
    fireEvent.click(square0);
    fireEvent.click(square1);
    expect(square1).toHaveValue("O");
  });
});

describe("Testing functionality of status button", () => {
  it("should render Next Player: X initially", () => {
    const {getByTestId} = render(<Board />);
    expect(getByTestId("status")).toHaveTextContent("Next Player: X");
  });

  it("should render Next Player: O after first click", () => {
    const {getByTestId} = render(<Board />);
    fireEvent.click(getByTestId('square-0'))
    expect(getByTestId("status")).toHaveTextContent("Next Player: O");
  })
});

describe("Testing for winner", () => {
  it("should render Winner: X when player X wins", () => {
    const {getByTestId} = render(<Board />);
    fireEvent.click(getByTestId("square-0")); // X on square 0
    fireEvent.click(getByTestId("square-1")); // O on square 1
    fireEvent.click(getByTestId("square-4")); // X on square 4
    fireEvent.click(getByTestId("square-2")); // O on square 2
    fireEvent.click(getByTestId("square-8")); // X on square 8

    // At this stage X should have won
    expect(getByTestId("status")).toHaveTextContent("Winner: X");
  });

  it("should render Winner: O when player O wins", () => {
    const {getByTestId} = render(<Board />);
    fireEvent.click(getByTestId("square-0")); // X on square 0
    fireEvent.click(getByTestId("square-6")); // O on square 6
    fireEvent.click(getByTestId("square-8")); // X on square 8
    fireEvent.click(getByTestId("square-4")); // O on square 4
    fireEvent.click(getByTestId("square-7")); // X on square 7
    fireEvent.click(getByTestId("square-2")); // O on square 2

    // At this stage O should have won
    expect(getByTestId("status")).toHaveTextContent("Winner: O");
  });
});