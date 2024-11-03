import { ThemeProvider } from "@/components/theme-provider"

import Navbar from './Navbar.tsx'
import { Timeline } from "@/components/ui/timeline.tsx";
import { Internships, Projects, Education } from './AboutData.tsx';
// TODO: timeline from aceternity ui

function App() {

    const glowColor = "122, 67, 250"

    const titleStyle = {
        textShadow: "0 0 10px rgba(" + glowColor + " , 0.5), 0 0 15px rgba(" + glowColor + ", 0.3), 0 0 20px rgba(" + glowColor + ", 0.2)",
        color: "white",
        paddingTop: "12%",
        paddingBottom: "10%",
        textAlign: "left",
    };

    const getTitleElement = (name) => {
        return (
            {
                title: <div className="text-7xl" style={titleStyle}>
                    {name}
                </div>,
                content: <></>
            }

        );
    }

    // const data = [
    //     { title: getTitleElement("Education") },
    //     { title: "MIT", content: (<>2024-2026<br />Computer Science and Mathematics</>) },
    //     { title: "Sharif", content: <>2022-2024<br /> Computer Engineering</> },
    //     { title: getTitleElement("Experience"), content: <></> },
    //     { title: "Reasearch Internship", content: <></> },
    //     { title: getTitleElement("Projects"), content: <></> },
    //     { title: "Project name1", content: <></> },
    //     { title: "Project name2", content: <></> },
    //     { title: "Project name3", content: <></> },
    //     { title: "Project name4", content: <></> },
    //     { title: "Project name5", content: <></> },
    //     { title: getTitleElement("Awards"), content: <></> },
    //     { title: "IPhO", content: <>Silver Medal in International Physics Olympiad (IPhO) 2022</> },
    //     { title: "APhO", content: <>Bronze Medal in Asian Physics Olympiad (APhO) 2022</> }
    // ];


    let data = [];

    data.push(getTitleElement("Internship"))

    Object.keys(Internships).map(key => (
        data.push({ title: key, content: Internships[key] })
    ))

    data.push(getTitleElement("Education"))

    Object.keys(Education).map(key => (
        data.push({ title: key, content: Education[key] })
    ))

    data.push(getTitleElement("Projects"))

    Object.keys(Projects).map(key => (
        data.push({ title: key, content: Projects[key] })
    ))

    return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme" >
            <Navbar />

            <Timeline data={data} />

            <p style={{ padding: "14%" }}></p>

        </ThemeProvider >
    )
}

export default App;