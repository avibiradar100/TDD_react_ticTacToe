import { fireEvent, render} from "@testing-library/react";
import Game from "./Game.js";
import { shallow } from "enzyme";

describe("Basic rendering of the Game", () => {

  test("Board should have 9 squares", () => {
    const board = shallow(<Game />);
    expect(board.find(".square").length).toBe(9);
  });

  test("Board row should render 3 rows", () => {
    const board = shallow(<Game />);
    expect(board.find(".board-row")).toHaveLength(3);
  });
});

describe("Square button should be clickable and able to render", () => {

  test("should render X on odd number of clicks", () => {
    const {getByTestId} = render(<Game />);
    const square0 = getByTestId("square-0");
    fireEvent.click(square0);
    expect(square0).toHaveValue("X");
  });

  test("should render O on even number of clicks", () => {
    const {getByTestId} = render(<Game />);
    const square0 = getByTestId("square-0");
    const square1 = getByTestId("square-1");
    fireEvent.click(square0);
    fireEvent.click(square1);
    expect(square1).toHaveValue("O");
  });
});

describe("Functionality Testing of status button", () => {

  test("should render Next Player: X initially", () => {
    const {getByTestId} = render(<Game />);
    expect(getByTestId("status")).toHaveTextContent("Next Player: X");
  });

  test("should render Next Player: O after first click", () => {
    const {getByTestId} = render(<Game />);
    fireEvent.click(getByTestId('square-0'))
    expect(getByTestId("status")).toHaveTextContent("Next Player: O");
  })
});

describe("Testing for winner", () => {

  test("should render Winner: X when player X wins", () => {
    const {getByTestId} = render(<Game />);
    fireEvent.click(getByTestId("square-0")); // X on square 0
    fireEvent.click(getByTestId("square-1")); // O on square 1
    fireEvent.click(getByTestId("square-4")); // X on square 4
    fireEvent.click(getByTestId("square-2")); // O on square 2
    fireEvent.click(getByTestId("square-8")); // X on square 8

    // At this stage X should have won
    expect(getByTestId("status")).toHaveTextContent("Winner: X");
  });

  test("should render Winner: O when player O wins", () => {
    const {getByTestId} = render(<Game />);
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