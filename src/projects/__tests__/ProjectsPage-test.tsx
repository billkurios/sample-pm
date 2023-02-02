import React from "react";
import { QueryClientProvider, QueryClient } from "react-query";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { 
    render,
    screen,
    waitForElementToBeRemoved
} from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from "msw/node";

import { store } from "../../state";
import ProjectsPage from "../ProjectsPage";
import { url as projectUrl } from "../projectAPI";
import { MOCK_PROJECTS } from "../MockProjects";


// Declare which API resuests to mock
const server = setupServer(
    // capture "GET http://localhost:4000/projects" requests
    rest.get(projectUrl, (req, res, ctx) => {
        // respond using a mocked JSON body
        return res(ctx.json(MOCK_PROJECTS));
    })
);

describe("<ProjectsPage />", () => {
    const queryClient = new QueryClient();

    function renderComponent(queryClient: QueryClient) {
        render(
            <QueryClientProvider client={queryClient}>
                <Provider store={store}>
                    <MemoryRouter>
                        <ProjectsPage />
                    </MemoryRouter>
                </Provider>
            </QueryClientProvider>
        );
    }

    beforeAll(() => server.listen());
    afterEach(() => server.resetHandlers());
    afterAll(() => server.close());

    test("should render without crashing", () => {
        renderComponent(queryClient);
        expect(screen).toBeDefined();
    });

    test("should display loading", () => {
        renderComponent(queryClient);
        expect(screen.getByText(/loading/i)).toBeInTheDocument();
    });

    test("should display projects", async () => {
        renderComponent(queryClient);
        expect(await screen.findAllByRole('img')).toHaveLength(
            MOCK_PROJECTS.length
        );
    });

    test("should display next button", async () => {
        renderComponent(queryClient);
        expect(
            await screen.findByRole("button", { name: /next/i })
        ).toBeInTheDocument();
    });

    // This tests the same as the last test but demonstrates
    // what find* methods are doing
    test("should display next button with get", async () => {
        renderComponent(queryClient);
        try {
            await waitForElementToBeRemoved(() => screen.queryByText(/loading/i));
        } catch(err) {}
        expect(screen.getByRole("button", { name: /next/i })).toBeInTheDocument();
    });

    test("should display custom error on server error", async () => {
        server.use(
            rest.get(projectUrl, (req, res, ctx) => {
                return res(
                    ctx.status(500),
                    ctx.json({ message: "Server error" }),
                );
            })
        );
        renderComponent(new QueryClient({
            defaultOptions: {
                queries: {
                    retry: false,
                }
            }
        }));
        
        try {
            await waitForElementToBeRemoved(() => screen.queryByText(/loading/i));
        } catch(err) {}
        expect(
            await screen.findByText(
                /There was an error retrieving the project(s)./i
            )
        ).toBeInTheDocument();
    });
});
