import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import StarRating from "./StarRating";

describe("StarRating", () => {
  it("renders correct number of stars", () => {
    const { container } = render(<StarRating rating={3} />);
    const stars = container.querySelectorAll("svg");
    expect(stars).toHaveLength(5);
  });

  it("renders with correct aria-label", () => {
    render(<StarRating rating={4} />);
    expect(screen.getByRole("img", { name: /rating: 4 out of 5/i })).toBeTruthy();
  });

  it("calls onRate when interactive and clicked", async () => {
    const onRate = vi.fn();
    render(<StarRating rating={0} interactive onRate={onRate} />);
    const buttons = screen.getAllByRole("radio");
    await userEvent.click(buttons[2]); // click 3rd star
    expect(onRate).toHaveBeenCalledWith(3);
  });

  it("does not render interactive buttons when not interactive", () => {
    render(<StarRating rating={3} />);
    expect(screen.queryAllByRole("radio")).toHaveLength(0);
  });
});
