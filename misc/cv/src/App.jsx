import { MapPinIcon, EnvelopeIcon, PhoneIcon, GlobeAltIcon } from "@heroicons/react/20/solid";
import GitHubIcon from "./GitHubIcon";
import { useEffect, useRef } from "react";
import { drawBackgroundLines } from "./lines";

const Hero = () => {
    return (<>
        <header className="p-8 bg-gray-800 flex flex-row justify-between gap-8">
            <div className="flex flex-col gap-4">
                <h1 className="text-3xl font-semibold text-white">
                    Laurenz Weixlbaumer
                </h1>

                <p className="text-gray-300">
                    Computer Science student, enthusiastic about everything
                    programming-related, looking to expand my knowledge and
                    gain experience working in a professional environment.
                    Tiny bit of a nerd.
                </p>
            </div>

            <img className="object-cover w-36 h-36 rounded-md" src="./portrait.jpeg" />
        </header>

        <section className="px-8 py-4 bg-gray-900 grid grid-cols-3 gap-4 text-gray-400">
            <span className="flex flex-row gap-2 items-center">
                <EnvelopeIcon className="h-4 w-4" />

                <a href="mailto:root@fsoc.space">root@fsoc.space</a>
            </span>

            <span className="flex flex-row gap-2 items-center">
                <PhoneIcon className="h-4 w-4" />

                0699 17057679
            </span>

            <span className="flex flex-row gap-2 items-center">
                <MapPinIcon className="h-4 w-4" />

                Hittmairstraße 64, Linz
            </span>

            <span className="flex flex-row gap-2 items-center">
                <GlobeAltIcon className="h-4 w-4" />

                <a href="https://fsoc.space">fsoc.space</a>
            </span>

            <span className="flex flex-row gap-2 items-center">
                <GitHubIcon className="h-4 w-4 fill-gray-400" />

                <a href="https://github.com/fs-c">fs-c</a>
            </span>
        </section>
    </>);
};

const Experience = () => {
    const ExperienceItem = ({ title, from, to, time, children }) => (
        <div>
            <div className="flex flex-row gap-4 justify-between">
                <span className="font-bold">
                    {title}
                </span>

                <span className="italic">
                    {time ? time : <span>{from} &mdash; {to}</span>}
                </span>
            </div>

            <p className="text-gray-700">
                {children}
            </p>
        </div>
    );

    return (<>
        <section className="p-8 flex flex-col gap-6">
            <ExperienceItem title="BORG Linz" from="2015" to="2020">
                In a branch with particular consideration for Informatics. Also attended HeadStart@Informatics classes at JKU during this time.
            </ExperienceItem>

            <ExperienceItem title="Software Architects, Internship" time="Summer 2019">
                Developed a prototype for a component of a client project using TypeScript, Angular and an internal DSL.
            </ExperienceItem>

            <ExperienceItem title="Abendgymnasium Linz für Berufstätige" from="2020" to="2021">
                Obtained Matura with VWA about the efficiency of selected sorting and searching algorithms, and how to determine it.
            </ExperienceItem>

            <ExperienceItem title="Kinderfreunde OÖ, Zivildienst" time="2021" />

            <ExperienceItem title="JKU" from="2021" to="">
                Studying to obtain a Bachelor's degree in Computer Science. 
            </ExperienceItem>
        </section>
    </>);
};

const Page = ({ children }) => (
    <section className="w-[210mm] h-[296mm] bg-gray-200 flex flex-col">
        {children}

        <div className="grow"></div>

        <footer class="px-8 py-4 text-gray-600 text-sm">
            This CV and cover letter are built with React and TailwindCSS. <a href="">See source.</a>
        </footer>
    </section>
);

const App = () => {
    return (<>
        <section className="w-[210mm] h-[296mm] bg-gray-200 flex flex-col">
            <Hero />

            <Experience />
        </section>

        <section className="w-[210mm] h-[296mm] bg-gray-200">
            <div className="px-8 py-16 text-gray-700 flex flex-col gap-4">
                <p className="text-lg">
                    I am a motivated developer and quick learner with years of 
                    experience working on a variety of personal projects, primarily using JavaScript, 
                    TypeScript, React and C++. 
                    Independently of language or framework, I strongly value clean 
                    and efficient code, and have high-quality standards for my work.
                </p>

                <p>
                    I maintain a blog on <a href="https://fsoc.space/words">fsoc.space/words</a> to 
                    document some of my personal projects. It particularly showcases my interest in 
                    low-level programming and reverse engineering, see for example <a href="https://fsoc.space/words/ctf-writeup-index/">my collection 
                    of CTF and CrackMe writeups</a> and this post about <a href="https://fsoc.space/words/refactoring-a-pattern-scanner/">pattern scanning process memory on Windows</a>. 
                    Another post that I feel like is worth highlighting is an interactive exploration of <a href="https://fsoc.space/words/drawing-squiggly-lines/">randomly generating smooth shapes</a>, using JavaScript and the Canvas API.
                </p>

                <p>
                    My proudest project is <a href="https://github.com/fs-c/maniac">maniac</a>, 
                    a cheat for the game osu!mania. It reads game state from memory to then simulate 
                    human gameplay. The first working commit to the repository was in 2018 and it is still 
                    being actively maintained. It gets thousands of views and hundreds of downloads 
                    per week. Maniac is written in C++ with CMake as the build tool, using GitHub Actions 
                    to generate public debu g builds for each commit and to automate releases.
                </p>

                <p>
                    I am available from the 1st of July to the 30th of September 2023.
                </p>
            </div>
        </section>
    </>);
};

export default App;
