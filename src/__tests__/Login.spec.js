import React from "react";
import { shallow } from "enzyme";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import Login from "../components/Login";

const mockStore = configureStore([]);

describe("Login component", () => {
  describe("displays", () => {
    let store;
    let describedComponent;

    beforeEach(() => {
      store = mockStore({
        authenticated: false
      });

      describedComponent = shallow(
        <Provider store={store}>
          <Login />
        </Provider>
      ).dive();
    });

    it("A login button at pageload", () => {
      expect(
        describedComponent.findWhere(
          tag => tag.type() === "button" && tag.contains("Login")
        )
      );
    });
  });

  describe("displays", () => {
    let store;
    let describedComponent;

    beforeEach(() => {
      store = mockStore({
        authenticated: true
      });

      describedComponent = shallow(
        <Provider store={store}>
          <Login />
        </Provider>
      ).dive();
    });

    it("A login button at pageload", () => {
      expect(
        describedComponent.findWhere(
          tag => tag.type() === "p" && tag.contains("Logged in as:")
        )
      );
    });
  });
});
