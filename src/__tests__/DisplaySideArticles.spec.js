import React from "react";
import { shallow } from "enzyme";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import DisplaySideArticles from "../components/DisplayCurrentArticle";

const mockStore = configureStore([]);

describe("DisplaySideArticles component", () => {
  describe("displays", () => {
    let store;
    let describedComponent;

    beforeEach(() => {
      store = mockStore({
        sideArticles: null,
        currentArticleId: null,
        currentPage: null
      });

      describedComponent = shallow(
        <Provider store={store}>
          <DisplaySideArticles />
        </Provider>
      ).dive();
    });

    it("Error message when no articles found", () => {
      expect(
        describedComponent.findWhere(
          tag => tag.type() === "p" && tag.contains("No articles found")
        )
      );
    });
  });

  describe("displays", () => {
    let store;
    let describedComponent;

    beforeEach(() => {
      store = mockStore({
        sideArticles: {
          articles: [
            {
              id: 1,
              title: "Test1",
              body: "TestBody1"
            },
            {
              id: 2,
              title: "Test2",
              body: "TestBody2"
            },
            {
              id: 3,
              title: "Test3",
              body: "TestBody3"
            },
            {
              id: 4,
              title: "Test4",
              body: "TestBody4"
            }
          ],
          meta: {
            current_page: 1,
            next_page: 2,
            prev_page: null,
            total_pages: 2,
            total_count: 5
          }
        },
        currentArticleId: "1",
        currentPage: "1"
      });

      describedComponent = shallow(
        <Provider store={store}>
          <DisplaySideArticles />
        </Provider>
      ).dive();
    });

    it("When four articles are present", () => {
      expect(
        describedComponent
          .findWhere(tag => tag.type() === "a" && tag.contains("Test2"))
          .findWhere(tag => tag.type() === "a" && tag.contains("Test3"))
          .findWhere(tag => tag.type() === "a" && tag.contains("Test4"))
      );
    });
  });
});
