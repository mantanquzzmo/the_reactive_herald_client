import React from "react";
import { shallow } from "enzyme";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import DisplayCurrentArticle from "../components/DisplayCurrentArticle";

const mockStore = configureStore([]);

describe("DisplayCurrentArticle component", () => {
  describe("displays", () => {
    let store;
    let describedComponent;

    beforeEach(() => {
      store = mockStore({
        currentArticle: null,
        currentArticleId: null,
        message: "Loading..."
      });

      describedComponent = shallow(
        <Provider store={store}>
          <DisplayCurrentArticle />
        </Provider>
      ).dive();
    });

    it("Loading... when no article is present", () => {
      expect(
        describedComponent.findWhere(
          object => object.type() === "p" && object.contains("Loading...")
        )
      );
    });
  });

  describe("displays", () => {
    let store;
    let describedComponent;

    beforeEach(() => {
      store = mockStore({
        currentArticle: { id: 1, title: "Test title 1", body: "Test body 1" },
        currentArticleId: "1"
      });

      describedComponent = shallow(
        <Provider store={store}>
          <DisplayCurrentArticle />
        </Provider>
      ).dive();
    });

    it("When one article is present", () => {
      expect(
        describedComponent
          .findWhere(
            tag => tag.type() === "h2" && tag.contains("Test title 1")
          )
          .findWhere(
            tag => tag.type() === "p" && tag.contains("Test body 1")
          )
      );
    });
  });
});
