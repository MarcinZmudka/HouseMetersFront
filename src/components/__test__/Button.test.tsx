import React from "react";
import { render, fireEvent, wait, act } from "@testing-library/react";
import axios from "axios";
import Button from "../Button";
import { ActualStateProvider } from "../../context/ActualState";
import { PreviousStateProvider } from "../../context/PreviousState";
import "@testing-library/jest-dom/extend-expect";
import validReceivedData from "../__mocks__/validReceivedData.json";
import normalReceivedData from "../__mocks__/normalReceivedData.json";
import { creatInitialObjects } from "../../context/interfaces";
import { url } from "../../config/config";
import halfGoodData from "../__mocks__/halfGoodData.json";
import secondHalfGood from "../__mocks__/secondHalfGood.json";
// import { act } from "react-dom/test-utils";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;
beforeEach((done) => {
	mockedAxios.post.mockRestore();
	mockedAxios.get.mockRestore();
	done();
});

const config = {
	headers: {
		"Access-Control-Allow-Origin": "*",
	},
};

describe("Button test", () => {
	it("testing post", async () => {
		const onChange = jest.fn();
		mockedAxios.post.mockImplementationOnce(() => {
			return Promise.resolve({ data: "" });
		});
		mockedAxios.get.mockImplementationOnce(() => {
			return Promise.resolve(validReceivedData);
		});
		const { getByText } = render(
			<ActualStateProvider>
				<PreviousStateProvider>
					<Button onChange={onChange} />
				</PreviousStateProvider>
			</ActualStateProvider>
		);
		const button = getByText("Wyślij dane z liczników");
		fireEvent.click(button);
		expect(axios.post).toBeCalledTimes(1);
		await wait(() => {
			expect(onChange).toBeCalledTimes(1);
			expect(onChange).toBeCalledWith({
				message: "Dane zostały przesłane na server!",
				show: true,
			});
		});
	});
	/* Reseolve takes huge amount of time so i increased it to 10 000 */
	it("testing empty values in actual state, should send previous values instead", async () => {
		const onChange = jest.fn();

		mockedAxios.post.mockImplementationOnce(() => {
			return Promise.resolve({ data: "" });
		});
		mockedAxios.get.mockImplementationOnce(() =>
			Promise.resolve(normalReceivedData)
		);
		const { getByText, rerender } = render(
			<ActualStateProvider>
				<PreviousStateProvider value={normalReceivedData}>
					<Button onChange={onChange} />
				</PreviousStateProvider>
			</ActualStateProvider>
		);
		const button = getByText("Wyślij dane z liczników");

		fireEvent.click(button);
		await wait(() => {
			expect(axios.post).toBeCalledWith(
				`${url}/post`,
				normalReceivedData,
				config
			);
			expect(axios.post).toBeCalledTimes(1);
		});
	}, 10000);

	test("testing half empty values in actual state, should pass actual values instead", async () => {
		const onChange = jest.fn();
		jest.mock("../../context/interfaces");
		// const creatInitialObjects = () => secondHalfGood;
		mockedAxios.post.mockImplementation(() => {
			return Promise.resolve({ data: "" });
		});
		mockedAxios.get.mockImplementation(() => {
			return Promise.resolve(secondHalfGood);
		});
		const { getByText } = render(
			<ActualStateProvider value={halfGoodData}>
				<PreviousStateProvider value={secondHalfGood}>
					<Button onChange={onChange} />
				</PreviousStateProvider>
			</ActualStateProvider>
		);
		const button = getByText("Wyślij dane z liczników");
		fireEvent.click(button);
		await wait(() => {
			expect(axios.post).toBeCalledWith(
				`${url}/post`,
				normalReceivedData,
				// halfGoodData,
				config
			);
			expect(axios.post).toBeCalledTimes(1);
		});
	}, 10000);
});
