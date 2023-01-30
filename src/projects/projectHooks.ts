import { useState, useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Project } from "./Project";

import { projectAPI } from "./projectAPI";
// import { Project } from "./Project";


export function useProjects() {
    const [page, setPage] = useState(0);
    let queryInfo = useQuery(
        ['projects', page],
        () => projectAPI.get(page + 1),
        {
            keepPreviousData: true,
            // staleTime: 5000,
        }
    );
    console.log(queryInfo);
    return { ...queryInfo, page, setPage };
}

export function useSaveProject() {
    const queryClient = useQueryClient();
    return useMutation((project: Project) => projectAPI.put(project), {
        onSuccess: () => queryClient.invalidateQueries('projects'),
    });
}

// customHook with basic useState,
//------------------------------------------------------------
// export function useProjects() {
//     const [projects, setProjects] = useState<Project[]>([]);
//     const [loading, setLoading] = useState<boolean>(false);
//     const [error, setError] = useState<string>('');
//     const [currentPage, setCurrentPage] = useState<number>(1);
//     const [saving, setSaving] = useState<boolean>(false);
//     const [savingError, setSavingError] = useState<string | undefined>(undefined);

//     useEffect(() => {
//         async function loadProjects() {
//             setLoading(true);
//             try{
//                 const data = await projectAPI.get(currentPage);
//                 setProjects((projects) => [...projects, ...data]);
//             } catch (e) {
//                 if(e instanceof Error) {
//                     setError(e.message);
//                 }
//             } finally {
//                 setLoading(false);
//             }
//         }
//         loadProjects();
//     }, [currentPage]);

//     const saveProject = (project: Project) => {
//         setSaving(true);
//         projectAPI
//             .put(project)
//             .then((updatedProject) => {
//                 // updatedProjects
//                 setProjects(projects.map((p) => {
//                     return project.id === p.id ? new Project(updatedProject): p;
//                 }));
//             }).catch((e) => {
//                 setSavingError(e.message);
//             }).finally(() => {
//                 setSaving(false);
//             })
//     }

//     return {
//         projects,
//         loading,
//         error,
//         currentPage,
//         setCurrentPage,
//         saving,
//         savingError,
//         saveProject
//     };
// }