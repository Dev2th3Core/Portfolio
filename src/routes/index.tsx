import React from "react"
import PathConstants from "./pathConstants"
import About from "../components/About"

const Experience = React.lazy(() => import("../components/Experience"))

const Projects = React.lazy(() => import("../components/Projects"))

const Techstack = React.lazy(() => import("../components/Techstack"))

const Contact = React.lazy(() => import("../components/Contact"))

const routes = [
    { path: PathConstants.ABOUT, element: <About /> },
    { path: PathConstants.EXPERIENCE, element: <Experience />},
    { path: PathConstants.PROJECTS, element: <Projects />},
    { path: PathConstants.TECHSTACK, element: <Techstack />},
    { path: PathConstants.CONTACT, element: <Contact />},
]


export default routes;