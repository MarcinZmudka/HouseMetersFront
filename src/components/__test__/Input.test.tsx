import React from "react";
import { render, fireEvent, wait } from "@testing-library/react";
import Input from "../Input";
import { ActualStateProvider } from "../../context/ActualState";

describe("Testing input", () => {
	test("Putting letters to input", () => {
		const onChange = jest.fn();
		const { getByPlaceholderText } = render(
			<ActualStateProvider>
				<Input
					placeholder="coldWater"
					previousValue={100}
					onChange={onChange}
					id={"1"}
				/>
			</ActualStateProvider>
		);
		const input = getByPlaceholderText("Zimna Woda") as HTMLInputElement;
		fireEvent.change(input, { target: { value: "aaa" } });
		expect(onChange).toBeCalledTimes(0);
		expect(input.value).toBe("");
	});
	test("Putting coma instead of dot", () => {
		const onChange = jest.fn();
		const { getByPlaceholderText } = render(
			<ActualStateProvider>
				<Input
					placeholder="coldWater"
					previousValue={100}
					onChange={onChange}
					id={"1"}
				/>
			</ActualStateProvider>
		);
		const input = getByPlaceholderText("Zimna Woda") as HTMLInputElement;
		fireEvent.change(input, { target: { value: "127,7" } });
		expect(onChange).toBeCalledTimes(1);
		expect(input.value).toBe("127.7");
	});
	test("Putting letters at the end of number", () => {
		const onChange = jest.fn();
		const { getByPlaceholderText } = render(
			<ActualStateProvider>
				<Input
					placeholder="coldWater"
					previousValue={100}
					onChange={onChange}
					id={"1"}
				/>
			</ActualStateProvider>
		);
		const input = getByPlaceholderText("Zimna Woda") as HTMLInputElement;
		fireEvent.change(input, { target: { value: "127,7!" } });
		expect(onChange).toBeCalledTimes(1);
		expect(input.value).toBe("127.7");
	});
	test("Putting letters inside number", () => {
		const onChange = jest.fn();
		const { getByPlaceholderText } = render(
			<ActualStateProvider>
				<Input
					placeholder="coldWater"
					previousValue={100}
					onChange={onChange}
					id={"1"}
				/>
			</ActualStateProvider>
		);
		const input = getByPlaceholderText("Zimna Woda") as HTMLInputElement;
		fireEvent.change(input, { target: { value: "1a27,7!a" } });
		expect(onChange).toBeCalledTimes(1);
		expect(input.value).toBe("127.7");
	});
	test("Putting number lower than actual value", async () => {
		const onChange = jest.fn();
		const { getByPlaceholderText, getByText } = render(
			<ActualStateProvider>
				<Input
					placeholder="coldWater"
					previousValue={100}
					onChange={onChange}
					id={"1"}
				/>
			</ActualStateProvider>
		);
		const input = getByPlaceholderText("Zimna Woda") as HTMLInputElement;
		fireEvent.change(input, { target: { value: "90" } });
		await wait(() => {
			const info = getByText(
				"Wartość mniejsza od stanu z poprzedniego miesiąca"
			);
			expect(info).toBeInTheDocument();
		});
	});
});
