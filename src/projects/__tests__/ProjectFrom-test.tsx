import React from "react";
import { screen, render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "react-query";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";

import { Project } from "../Project";
import { store } from "../../state";
import ProjectForm from "../ProjectForm";


describe("<ProjectForm />", () => {
    let project: Project;
    let updatedProject: Project;
    let handleCancel: jest.Mock;
    let nameTextBox: any;
    let descriptionTextBox: HTMLElement;
    let budgetTextBox: HTMLElement;

    const queryClient = new QueryClient();
    const renderComponent = () => {
        render(
            <QueryClientProvider client={queryClient}>
                <Provider store={store}>
                    <MemoryRouter>
                        <ProjectForm project={project} onCancel={handleCancel} />
                    </MemoryRouter>
                </Provider>
            </QueryClientProvider>
        );
    }

    const setup = () => {
        renderComponent();
        nameTextBox = screen.getByRole('textbox', {
            name: /project name/i,
        });
        descriptionTextBox = screen.getByRole('textbox', {
            name: /project description/i,
        });
        budgetTextBox = screen.getByRole('spinbutton', {
            name: /project budget/i,
        });
    }

    beforeEach(() => {
        project = new Project({
            id: 1,
            name: "Mission Impossible",
            description: "This is really difficult",
            budget: 100,
        });
        updatedProject = new Project({
            name: "Ghost Protocol",
            description: "Blamed for a terrorist attack on the Kremlin, Ethan Hunt (Tom Cruise) and the entire IMF agency...",
        });
        handleCancel = jest.fn();
    });

    // Loading data into form
    test("should load project into form", () => {
        setup();
        expect(
            screen.getByRole('form', { name: /edit a project/i })
        ).toHaveFormValues({
            name: project.name,
            description: project.description,
            budget: project.budget,
            isActive: project.isActive
        });
    });

    // Updating form values
    test("should accept input", async () => {
        setup();
        const user = userEvent.setup();

        await user.clear(nameTextBox);
        await user.type(nameTextBox, updatedProject.name);
        expect(nameTextBox).toHaveValue(updatedProject.name);

        await user.clear(descriptionTextBox);
        await user.type(descriptionTextBox, updatedProject.description);
        expect(descriptionTextBox).toHaveValue(updatedProject.description);

        await user.clear(budgetTextBox);
        await user.type(budgetTextBox, updatedProject.budget.toString());
        expect(budgetTextBox).toHaveValue(updatedProject.budget);
    });
    
    // Tests validation rules
    test("name should display required validation", async () => {
        setup();
        const user = userEvent.setup();
        await user.clear(nameTextBox);
        expect(screen.getByRole("alert")).toBeInTheDocument();
    });
    test("name should display minLength validation", async () => {
        setup();
        const user = userEvent.setup();
        await user.clear(nameTextBox);
        await user.type(nameTextBox, "ab")
        expect(screen.getByRole("alert")).toBeInTheDocument();
        await user.type(nameTextBox, "c")
        expect(screen.queryByRole("alert")).not.toBeInTheDocument();
    });
    test("budget should display not 0 validation", async () => {
        setup();
        const user = userEvent.setup();
        await user.clear(budgetTextBox);
        await user.type(budgetTextBox, "0");
        expect(screen.getByRole("alert")).toBeInTheDocument();
        await user.type(budgetTextBox, "1");
        expect(screen.queryByRole("alert")).not.toBeInTheDocument();
    });
})