import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { getRandomUuid } from "~/lib/utils";

export type Technology = {
  id: string;
  name: string;
  category: string;
};

export type Project = {
  id: string;
  name: string;
  companyName: string;

  shortDescription: string;
  fullDescription: string;

  startDate: Date;
  endDate: Date | null;

  technologyIds: string[];
};

type State = {
  projects: Project[];
  technologies: Technology[];
};

type Actions = {
  getProject: (projectId: Project["id"]) => Project | undefined;

  createProject: (project: Omit<Project, "id">) => void;

  updateProject: (
    projectId: Project["id"],
    project: Partial<Omit<Project, "id">>
  ) => void;

  deleteProject: (id: Project["id"]) => void;

  getTechnology: (technologyId: Technology["id"]) => Technology | undefined;

  createTechnology: (technology: Omit<Technology, "id">) => void;

  updateTechnology: (
    technologyId: Technology["id"],
    technology: Partial<Omit<Technology, "id">>
  ) => void;

  deleteTechnology: (id: Technology["id"]) => void;

  load: (state: State) => void;
};

export const useStore = create<State & Actions>()(
  persist(
    immer((set, get) => ({
      projects: [],

      technologies: [],

      getProject: (projectId: Project["id"]) => {
        return get().projects.find(project => project.id === projectId);
      },

      createProject: (project: Omit<Project, "id">) => {
        set(state => {
          state.projects.push({ id: getRandomUuid(), ...project });
        });
      },

      updateProject: (
        projectId: Project["id"],
        updatedProject: Partial<Omit<Project, "id">>
      ) => {
        set(state => {
          const project = state.projects.find(item => item.id === projectId);

          if (!project) {
            throw new Error("Project is not found");
          }

          Object.assign(project, updatedProject);
        });
      },

      deleteProject: (projectId: Project["id"]) => {
        set(state => {
          state.projects = state.projects.filter(
            project => project.id !== projectId
          );
        });
      },

      getTechnology: (technologyId: Technology["id"]) =>
        get().technologies.find(technology => technology.id === technologyId),

      createTechnology: (technology: Omit<Technology, "id">) => {
        set(state => {
          state.technologies.push({ id: getRandomUuid(), ...technology });
        });
      },

      updateTechnology: (
        technologyId: Technology["id"],
        updatedTechnology: Partial<Omit<Technology, "id">>
      ) => {
        set(state => {
          const technology = state.technologies.find(
            item => item.id === technologyId
          );

          if (!technology) {
            throw new Error("Technology is not found");
          }

          Object.assign(technology, updatedTechnology);
        });
      },

      deleteTechnology: (technologyId: Technology["id"]) => {
        set(state => {
          state.technologies = state.technologies.filter(
            technology => technology.id !== technologyId
          );
        });
      },

      load: (newState: State) => {
        set(state => {
          state.projects = newState.projects;
          state.technologies = newState.technologies;
        });
      },
    })),
    {
      name: "root-store",
      storage: createJSONStorage(() => window.localStorage),
    }
  )
);
